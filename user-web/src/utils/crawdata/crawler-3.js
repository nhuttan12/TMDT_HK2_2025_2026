import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const DOMAIN = 'https://terrariumxanhzone.vn';

// --- HÀM 1: CÀO THÔNG TIN CHI TIẾT ---
async function crawlProductDetail(page, detailUrl) {
	try {
		await page.goto(detailUrl, { waitUntil: 'networkidle2', timeout: 60000 });
		const data = await page.content();
		const $ = cheerio.load(data);

		// 1. Lấy danh sách ảnh
		const images = [];
		$('#sliderproduct .product-thumb a').each((i, el) => {
			let imgHref = $(el).attr('data-image') || $(el).attr('href');
			if (imgHref && !images.includes(imgHref)) {
				if (imgHref.startsWith('//')) imgHref = 'https:' + imgHref;
				images.push(imgHref);
			}
		});

		if (images.length === 0) {
			let mainImg = $('.box-image-featured img').attr('src');
			if (mainImg) images.push(mainImg);
		}

		// 2. Lấy Description HTML & Xử lý Text
		const descriptionHTML = $('#tab_content_product_introduction').html()?.trim() || '';
		let summaryText = '';
		let extractedSize = null;

		if (descriptionHTML) {
			const fullText = $('#tab_content_product_introduction').text();
			const sizeRegex = /(\d+\s*[xX]\s*\d+(?:\s*[xX]\s*\d+)?\s*(?:cm|mm|drc)?)/i;
			const match = fullText.match(sizeRegex);
			if (match) {
				extractedSize = match[1].replace(/\s+/g, '').toLowerCase();
				if (!extractedSize.match(/[a-z]+/)) extractedSize += 'cm';
			}

			summaryText = fullText.replace(/\s+/g, ' ').trim();
			if (summaryText.length > 250) summaryText = summaryText.substring(0, 250) + '...';
		}

		// 3. Vét ảnh sâu
		if (descriptionHTML) {
			$('#tab_content_product_introduction img').each((i, el) => {
				let deepImg = $(el).attr('data-src') || $(el).attr('src');
				if (deepImg && !deepImg.includes('noimage') && !deepImg.startsWith('data:image')) {
					if (deepImg.startsWith('//')) deepImg = 'https:' + deepImg;
					if (!deepImg.startsWith('http'))
						deepImg = `${DOMAIN}${deepImg.startsWith('/') ? '' : '/'}${deepImg}`;
					if (!images.includes(deepImg)) images.push(deepImg);
				}
			});
		}

		// ==============================================================
		// 4. BÓC TÁCH BIẾN THỂ & BÙ ẢNH TỰ ĐỘNG
		// ==============================================================
		const variants = [];
		let imageFallbackIndex = 0; // Bộ đếm theo dõi ảnh dùng để bù đắp

		$('a[selid][price]').each((i, el) => {
			const name = $(el).text().trim();
			if (!name) return;

			const variantPrice = parseInt($(el).attr('price')) || 0;

			let image = $(el).attr('data-image') || '';
			if (image && image.startsWith('//')) image = 'https:' + image;

			// 🎯 LOGIC: NẾU BIẾN THỂ KHÔNG CÓ ẢNH TRƯỚC ĐÓ, LẤY ẢNH TỪ MẢNG SẢN PHẨM BÙ VÀO
			if (!image || image === '') {
				if (images.length > 0) {
					// Dùng phép chia lấy dư để vòng lại ảnh đầu tiên nếu biến thể nhiều hơn số ảnh
					image = images[imageFallbackIndex % images.length];
					imageFallbackIndex++;
				}
			}

			if (!variants.find((v) => v.name === name)) {
				variants.push({
					name: name,
					price: variantPrice,
					image: image, // Đảm bảo luôn có ảnh (hoặc ảnh gốc, hoặc ảnh lấy bù)
				});
			}
		});

		return {
			images,
			descriptionHTML,
			summary: summaryText,
			extractedSize,
			variants,
		};
	} catch (error) {
		console.error(`❌ Lỗi khi vào trang chi tiết ${detailUrl}:`, error.message);
		return null;
	}
}

// --- HÀM 2: CÀO DANH SÁCH & CHUẨN HÓA DỮ LIỆU ---
async function crawlXanhzoneData() {
	console.log('🚀 Khởi động trình duyệt ảo Puppeteer...');
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	// Tối ưu tốc độ: Không tải CSS và Font
	await page.setRequestInterception(true);
	page.on('request', (req) => {
		if (['stylesheet', 'font'].includes(req.resourceType())) {
			req.abort();
		} else {
			req.continue();
		}
	});

	const allProducts = [];
	const targetCategories = [
		{
			category: 'Quà tặng sinh nhật',
			baseUrl: `${DOMAIN}/size-de-ban-qua-tang-sinh-nhat-pc31.html`,
			totalPages: 2,
		},
		{
			category: 'Quà tặng sếp - đối tác',
			baseUrl: `${DOMAIN}qua-tang-sep-doi-tac-decor-pc32.html`,
			totalPages: 1,
		},
		{
			category: 'Quà tặng tân gia',
			baseUrl: `${DOMAIN}/thiet-ke-dac-biet-qua-tang-doc-dao-qua-tang-tan-gia-pc33.html`,
			totalPages: 1,
		},
		{
			category: 'Tiểu cảnh Phật giáo',
			baseUrl: `${DOMAIN}/tieu-canh-terrarium-phat-giao-pc34.html`,
			totalPages: 1,
		},
		{
			category: 'Quà tặng độc đáo',
			baseUrl: `${DOMAIN}/san-pham-dac-biet-qua-tang-doc-dao-pc36.html`,
			totalPages: 1,
		},
		{
			category: 'Hồ chuyên nuôi bò sát',
			baseUrl: `${DOMAIN}/ho-chuyen-bo-sat-pc40.html`,
			totalPages: 1,
		},
		{
			category: 'Đất nền - giá thể',
			baseUrl: `${DOMAIN}/dat-nen-gia-the-pc42.html`,
			totalPages: 1,
		},
		{
			category: 'Đá lụa tạo bố cục',
			baseUrl: `${DOMAIN}/da-lua-tao-bo-cuc-pc43.html`,
			totalPages: 1,
		},
		{
			category: 'Đèn quang hợp',
			baseUrl: `${DOMAIN}/dong-den-quang-hop-pc44.html`,
			totalPages: 1,
		},
		{
			category: 'Mô hình',
			baseUrl: `${DOMAIN}/tuong-trang-tri-mo-hinh-pc45.html`,
			totalPages: 1,
		},
		{
			category: 'Rêu',
			baseUrl: `${DOMAIN}/tong-hop-reu-terrarum-reu-lam-tieu-canh-pc47.html`,
			totalPages: 1,
		},
	];

	for (const target of targetCategories) {
		console.log(
			`\n========== BẮT ĐẦU CÀO DANH MỤC: ${target.category.toUpperCase()} ==========`,
		);

		for (let pageNum = 1; pageNum <= target.totalPages; pageNum++) {
			const url = `${target.baseUrl}?page=${pageNum}`;
			console.log(`\n--- Đang quét danh sách trang ${pageNum} ---`);

			try {
				await page.goto(url, { waitUntil: 'domcontentloaded' });
				const listHTML = await page.content();
				const $ = cheerio.load(listHTML);

				const productElements = $('.product-grid-item');
				const productsToProcess = [];

				productElements.each((i, element) => {
					productsToProcess.push(element);
				});

				for (let i = 0; i < productsToProcess.length; i++) {
					const element = productsToProcess[i];
					const productId = $(element).attr('data-id') || `temp_${Date.now()}_${i}`;
					const name = $(element).find('h3.product-title a').text().trim();

					if (!name) continue;

					let relativeUrl = $(element).find('a.product-img').attr('href');
					let detailUrl = '';
					if (relativeUrl) {
						detailUrl = relativeUrl.startsWith('http')
							? relativeUrl
							: `${DOMAIN}${relativeUrl.startsWith('/') ? '' : '/'}${relativeUrl}`;
					}

					const rawPrice = $(element).find('.tp_product_price').text().trim();
					const rawOldPrice = $(element)
						.find('.tp_product_detail_price_old')
						.text()
						.trim();
					let oldPrice = parseInt(rawOldPrice.replace(/[^\d]/g, '')) || 0;
					let price = 0;

					if (
						rawPrice.toLowerCase().includes('liên hệ') ||
						rawPrice.toLowerCase().includes('contact')
					) {
						price = oldPrice > 0 ? oldPrice : -1;
					} else {
						price = parseInt(rawPrice.replace(/[^\d]/g, '')) || 0;
					}

					const sizesArray = [];
					const sizeRegex = /(\d+\s*[xX]\s*\d+(?:\s*[xX]\s*\d+)?\s*(?:cm)?)/i;
					const sizeMatch = name.match(sizeRegex);
					if (sizeMatch) {
						let cleanSize = sizeMatch[1].replace(/\s+/g, '').toLowerCase();
						if (!cleanSize.includes('cm')) cleanSize += 'cm';
						sizesArray.push(cleanSize);
					}

					// 🎯 ĐÃ BỎ TRƯỜNG "oldPrice" THEO YÊU CẦU
					let product = {
						id: productId,
						category: target.category,
						name,
						price,
						priceText: rawPrice,
						detailUrl,
						brand: 'Xanhzone',
						sku: `XZ-${productId}`,
						type: 'Terrarium',
						sizes: sizesArray,
						variants: [],
					};

					// Đi vào chi tiết sản phẩm
					if (detailUrl) {
						console.log(`> Đang lấy chi tiết: ${name}`);
						const extraData = await crawlProductDetail(page, detailUrl);

						if (extraData) {
							if (
								extraData.extractedSize &&
								!sizesArray.includes(extraData.extractedSize)
							) {
								sizesArray.push(extraData.extractedSize);
							}
							delete extraData.extractedSize;

							product = { ...product, ...extraData };
							product.sizes = sizesArray;
						}

						await sleep(1500);
					}

					allProducts.push(product);
				}
			} catch (error) {
				console.error(`❌ Lỗi quét danh sách trang ${pageNum}:`, error.message);
			}
		}
	}

	await browser.close();

	fs.writeFileSync('xanhzone_terrarium_data.json', JSON.stringify(allProducts, null, 2), 'utf-8');
	console.log(
		`\n✅ HOÀN THÀNH! Mảng Variants nay đã được xử lý ảnh bù đắp, loại bỏ oldPrice gọn gàng!`,
	);
}

crawlXanhzoneData();

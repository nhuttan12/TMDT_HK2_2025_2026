import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- HÀM 1: VÀO TRANG CHI TIẾT ĐỂ LẤY DỮ LIỆU SÂU (Giữ nguyên) ---
async function crawlProductDetail(detailUrl) {
	try {
		const { data } = await axios.get(detailUrl);
		const $ = cheerio.load(data);

		const images = [];
		$('.product-main-slide .swiper-slide').each((i, el) => {
			let imgUrl = $(el).attr('data-src');
			if (imgUrl && !images.includes(imgUrl)) {
				if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
				images.push(imgUrl);
			}
		});

		let brand = '';
		let sku = '';
		let type = '';
		$('ul.product-info li.in_1').each((i, el) => {
			const textContent = $(el).text();
			if (textContent.includes('Thương hiệu:')) {
				brand = $(el).find('span').text().trim();
			} else if (textContent.includes('SKU:')) {
				sku = $(el).find('span').text().trim();
			} else if (textContent.includes('Loại:')) {
				type = $(el).find('span').text().trim();
			}
		});

		const summary = $('.summary').text().trim().replace(/\s+/g, ' ');

		const sizes = [];
		$('.swatch-element input[type="radio"]').each((i, el) => {
			const sizeValue = $(el).val();
			if (sizeValue) sizes.push(sizeValue);
		});

		const descriptionHTML = $('#tab-1 .expandable-content').html()?.trim();

		return {
			brand,
			sku,
			type,
			summary,
			sizes,
			images,
			descriptionHTML,
		};
	} catch (error) {
		console.error(`Lỗi khi vào trang chi tiết ${detailUrl}:`, error.message);
		return null;
	}
}

// --- HÀM 2: CÀO DANH SÁCH & GỘP DỮ LIỆU THEO TỪNG CATEGORY ---
async function crawlFullProductData() {
	const allProducts = [];
	const domain = 'https://terrafulness.com';

	// 1. ĐỊNH NGHĨA DANH SÁCH URL VÀ CATEGORY MUỐN CÀO
	// Bạn chỉ cần thêm/bớt các object trong mảng này để thu thập dữ liệu
	const targetCategories = [
		{
			category: 'zen terrarium',
			baseUrl: 'https://terrafulness.com/collections/zen-terrarium-terrafulness',
			totalPages: 3,
		},
		{
			category: 'moss terrarium',
			baseUrl: 'https://terrafulness.com/collections/moss-terrarium-terrafulness',
			totalPages: 7,
		},
		{
			category: 'tropical terrarium',
			baseUrl: 'https://terrafulness.com/collecti ons/tropical-terrarium',
			totalPages: 1,
		},
		{
			category: 'rain forest terrarium',
			baseUrl: 'https://terrafulness.com/collections/rain-forest-terrarium',
			totalPages: 1,
		},
	];

	// 2. VÒNG LẶP QUA TỪNG DANH MỤC
	for (const target of targetCategories) {
		console.log(
			`\n========== BẮT ĐẦU CÀO DANH MỤC: ${target.category.toUpperCase()} ==========`,
		);

		// Lặp qua từng trang của danh mục hiện tại
		for (let page = 1; page <= target.totalPages; page++) {
			const url = `${target.baseUrl}?page=${page}`;
			console.log(`\n--- Quét danh sách trang ${page} của [${target.category}] ---`);

			try {
				const { data } = await axios.get(url);
				const $ = cheerio.load(data);
				const productElements = $('.product-item');

				for (let i = 0; i < productElements.length; i++) {
					const element = productElements[i];
					const name =
						$(element).find('h3.item-title a').text().trim() ||
						$(element).find('.line_1').text().trim();

					if (!name) continue;

					const rawPrice =
						$(element).find('.special-price').text() ||
						$(element).find('span.regular-price').text();
					const price = parseInt(rawPrice.replace(/[^\d]/g, '')) || 0;

					const relativeUrl =
						$(element).find('h3.item-title a').attr('href') ||
						$(element).find('a.thumb').attr('href');
					const detailUrl = relativeUrl ? domain + relativeUrl : '';
					const productId = $(element).find('input[name="id"]').val();

					// Khởi tạo object với trường "category" được lấy từ config
					let product = {
						id: productId,
						category: target.category, // Gán category vào sản phẩm
						name,
						price,
						detailUrl,
					};

					// ĐI VÀO TRANG CHI TIẾT
					if (detailUrl) {
						console.log(`> Lấy chi tiết: ${name}`);
						const extraData = await crawlProductDetail(detailUrl);

						if (extraData) {
							product = { ...product, ...extraData };
						}
						// Bắt buộc phải nghỉ để tránh bị block IP
						await sleep(2000);
					}

					allProducts.push(product);
				}
			} catch (error) {
				console.error(
					`Lỗi ở danh mục [${target.category}] - trang ${page}:`,
					error.message,
				);
			}
		}
	}

	// 3. LƯU KẾT QUẢ VÀO FILE JSON
	fs.writeFileSync(
		'du_lieu_san_pham_chi_tiet.json',
		JSON.stringify(allProducts, null, 2),
		'utf-8',
	);
	console.log(`\n✅ HOÀN THÀNH! Đã lưu chi tiết ${allProducts.length} sản phẩm.`);
}

crawlFullProductData();

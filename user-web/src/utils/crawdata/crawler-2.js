import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const DOMAIN = 'https://terrariumlejardin.com';

// --- HÀM 1: CÀO THÔNG TIN CHI TIẾT SẢN PHẨM ---
async function crawlProductDetail(detailUrl) {
	try {
		const { data } = await axios.get(detailUrl);
		const $ = cheerio.load(data);

		const images = [];
		$('.gallery-thumb-pro .owl-item a.thumb-pro-detail').each((i, el) => {
			let imgHref = $(el).attr('href');
			if (imgHref) {
				if (!imgHref.startsWith('http')) {
					imgHref = `${DOMAIN}/${imgHref.replace(/^\//, '')}`;
				}
				if (!images.includes(imgHref)) images.push(imgHref);
			}
		});

		const shortDescriptionHTML = $('.desc-pro-detail').html()?.trim() || '';
		const fullDescriptionHTML =
			$('.content-tabs-pro-detail.info-pro-detail').html()?.trim() || '';

		return {
			images,
			shortDescriptionHTML,
			fullDescriptionHTML,
		};
	} catch (error) {
		console.error(`❌ Lỗi khi vào trang chi tiết ${detailUrl}:`, error.message);
		return null;
	}
}

// --- HÀM 2: CÀO DANH SÁCH & GỘP DỮ LIỆU ---
async function crawlTerrariumLeJardin() {
	const allProducts = [];

	const targetCategories = [
		{
			category: 'trang rêu',
			baseUrl: `${DOMAIN}/tranh-reu`,
			totalPages: 1,
		},
		{
			category: 'binh-terrarium',
			baseUrl: `${DOMAIN}/binh-terrarium`,
			totalPages: 3,
		},
	];

	for (const target of targetCategories) {
		console.log(
			`\n========== BẮT ĐẦU CÀO DANH MỤC: ${target.category.toUpperCase()} ==========`,
		);

		for (let page = 1; page <= target.totalPages; page++) {
			const url = `${target.baseUrl}?p=${page}`;
			console.log(`\n--- Đang quét danh sách trang ${page} ---`);

			try {
				const { data } = await axios.get(url);
				const $ = cheerio.load(data);

				const productElements = $('.group');

				for (let i = 0; i < productElements.length; i++) {
					const element = productElements[i];

					const name = $(element).find('h3.pd-name a').text().trim();
					if (!name) continue;

					let relativeUrl = $(element).find('a').first().attr('href');
					let detailUrl = '';
					if (relativeUrl) {
						detailUrl = relativeUrl.startsWith('http')
							? relativeUrl
							: `${DOMAIN}/${relativeUrl.replace(/^\//, '')}`;
					}

					// --- LOGIC XỬ LÝ GIÁ ĐƯỢC CẬP NHẬT ---
					const rawPrice = $(element).find('.fix-price').text().trim();
					const rawOldPrice = $(element).find('.line-through').text().trim();

					// 1. Phân tích giá cũ (Old Price) trước tiên
					let oldPrice = parseInt(rawOldPrice.replace(/[^\d]/g, '')) || 0;
					let price = 0;

					// 2. Nếu giá hiển thị là Contact us -> Lấy Old Price làm giá gốc
					if (rawPrice.toLowerCase().includes('contact') || rawPrice === '') {
						price = oldPrice;
					} else {
						// Ngược lại thì ép kiểu bình thường
						price = parseInt(rawPrice.replace(/[^\d]/g, '')) || 0;
					}
					// ------------------------------------

					const productId =
						$(element).find('button.addcart').attr('data-id') ||
						`temp_${Date.now()}_${i}`;

					let product = {
						id: productId,
						category: target.category,
						name,
						price, // Lúc này price sẽ mang giá trị của oldPrice nếu ghi "Contact us"
						oldPrice,
						priceText: rawPrice,
						detailUrl,
					};

					if (detailUrl) {
						console.log(`> Lấy chi tiết: ${name}`);
						const extraData = await crawlProductDetail(detailUrl);

						if (extraData) {
							product = { ...product, ...extraData };
						}

						await sleep(1500);
					}

					allProducts.push(product);
				}
			} catch (error) {
				console.error(`Lỗi quét danh sách trang ${page}:`, error.message);
			}
		}
	}

	fs.writeFileSync('terrarium_lejardin_data.json', JSON.stringify(allProducts, null, 2), 'utf-8');
	console.log(`\n✅ HOÀN THÀNH! Đã thu thập và lưu chi tiết ${allProducts.length} sản phẩm.`);
}

crawlTerrariumLeJardin();

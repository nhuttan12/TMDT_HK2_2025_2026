import * as fs from 'fs';
import * as cheerio from 'cheerio';

const DOMAIN = 'https://terrariumlejardin.com';

function transformDataToTargetSchema() {
	console.log('⏳ Đang đọc và xử lý dữ liệu...');

	const rawData = fs.readFileSync('terrarium_lejardin_data.json', 'utf-8');
	const products = JSON.parse(rawData);

	const transformedProducts = products.map((product) => {
		// --- XỬ LÝ SUMMARY ---
		let summaryText = '';
		const htmlToParse = product.shortDescriptionHTML || product.fullDescriptionHTML || '';
		if (htmlToParse) {
			const $ = cheerio.load(htmlToParse);
			summaryText = $.text().replace(/\s+/g, ' ').trim();
			if (summaryText.length > 250) {
				summaryText = summaryText.substring(0, 250) + '...';
			}
		}

		// --- XỬ LÝ KÍCH THƯỚC (SIZES) ---
		const sizesArray = [];
		const sizeRegex = /(\d+\s*[xX]\s*\d+(?:\s*[xX]\s*\d+)?\s*(?:cm)?)/i;
		const sizeMatch = product.name.match(sizeRegex);
		if (sizeMatch) {
			let cleanSize = sizeMatch[1].replace(/\s+/g, '').toLowerCase();
			if (!cleanSize.includes('cm')) cleanSize += 'cm';
			sizesArray.push(cleanSize);
		}

		// --- XỬ LÝ DESCRIPTION HTML ---
		let finalDescriptionHTML = '';
		if (product.shortDescriptionHTML && product.fullDescriptionHTML) {
			finalDescriptionHTML = `${product.shortDescriptionHTML}<br>${product.fullDescriptionHTML}`;
		} else {
			finalDescriptionHTML =
				product.fullDescriptionHTML || product.shortDescriptionHTML || '';
		}

		// ======================================================
		// 🎯 THUẬT TOÁN VÉT ẢNH TỐI ĐA (DEEP IMAGE EXTRACTION)
		// ======================================================
		// Lấy danh sách ảnh hiện có (từ mảng cào ngoài danh sách)
		const finalImages = product.images ? [...product.images] : [];

		if (finalDescriptionHTML) {
			const $html = cheerio.load(finalDescriptionHTML);

			$html('img').each((i, el) => {
				// 1. Ưu tiên lấy ảnh thật từ các thuộc tính Lazy-load trước khi lấy src
				let imgSrc =
					$html(el).attr('data-src') ||
					$html(el).attr('data-lazy-src') ||
					$html(el).attr('src');

				if (imgSrc) {
					// 2. Lọc bỏ rác: Bỏ qua các ảnh icon, placeholder, hoặc ảnh mã hóa Base64
					const isGarbage =
						imgSrc.includes('noimage') ||
						imgSrc.includes('placeholder') ||
						imgSrc.startsWith('data:image');

					if (!isGarbage) {
						// 3. Chuẩn hóa đường dẫn tuyệt đối
						if (!imgSrc.startsWith('http')) {
							if (imgSrc.startsWith('//')) {
								imgSrc = 'https:' + imgSrc;
							} else {
								imgSrc = `${DOMAIN}/${imgSrc.replace(/^\//, '')}`;
							}
						}

						// 4. Đẩy vào mảng nếu chưa trùng lặp
						if (!finalImages.includes(imgSrc)) {
							finalImages.push(imgSrc);
						}
					}
				}
			});
		}

		// --- RÁP VÀO OBJECT ---
		return {
			id: product.id,
			category: product.category,
			name: product.name,
			price: product.price,
			detailUrl: product.detailUrl,
			brand: 'Le Jardin',
			sku: `LJ-${product.id}`,
			type: 'Terrarium',
			summary: summaryText,
			sizes: sizesArray,
			images: finalImages, // Mảng ảnh giờ đã chứa toàn bộ ảnh sạch
			descriptionHTML: finalDescriptionHTML,
		};
	});

	fs.writeFileSync(
		'formatted_lejardin_data.json',
		JSON.stringify(transformedProducts, null, 2),
		'utf-8',
	);
	console.log(
		`✅ CHUẨN HÓA THÀNH CÔNG! Đã gom sạch ảnh của ${transformedProducts.length} sản phẩm.`,
	);
}

transformDataToTargetSchema();

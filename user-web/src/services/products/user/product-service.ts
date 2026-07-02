import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductDetailRawUser } from '@/types/products/user/ProductDetailRawUser';
import { ProductShop } from '@/types/products/user/ProductShop';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { Review } from '@/types/products/user/Review';
import { PaginationRequest } from '@/types/shared/PaginationRequest';
import { PaginationResponse } from '@/types/shared/PaginationResponse';
import {
	convertRawUserToProductDetail,
	mapBackendPaginationToFrontend,
	mapProductDetailBeToFe,
} from '@/utils/products/product-adapter';
import { calculateDiscount } from '@/utils/shared/calculateDiscount';

import apiClient from '@/lib/api-client';
import { mapBackendToFrontendPagination } from '@/services/products/user/product-utill';
import { PaginationParams } from '@/types/common/Pagination';
import { ResponseApi } from '@/types/common/ResponseApi';
import {
	BackendPagedResult,
	BackEndProductDetail,
	BackendProductItem,
} from '@/types/products/user/productBE';
import { ProductFilterPayload } from '@/types/products/user/ProductFilterPayload';
import { CategoryOption } from '@/types/products/user/CategoryOption';
import { ShopOption } from '@/types/products/user/ShopOption';
import { ListShopName } from '@/types/products/user/ListShopName';
import { ListCategoryName } from '@/types/products/user/ListCategoryName';

// craw data

export const getProductDetailByIdCraw = async (productId: string): Promise<ProductDetail> => {
	const reviews: Review[] = [
		{
			id: 'cmt-001',
			userName: 'Nguyễn Minh Anh',
			createdAt: '2026-02-10T08:15:00Z',
			rating: 5,
			content:
				'Bể setup rất đẹp, rêu xanh mướt và bố cục đá lũa rất tự nhiên. Đóng gói lớp chống sốc dày đặc nên bình thủy tinh không hề xước vỡ.',
			shopReply: {
				content:
					'Cảm ơn anh/chị đã tin tưởng và ủng hộ GreenSpace ❤️ Chúc anh/chị có những phút giây thư giãn bên bình Terrarium ạ.',
				createdAt: '2026-02-10T09:00:00Z',
			},
		},
		{
			id: 'cmt-002',
			userName: 'Trần Quốc Bảo',
			createdAt: '2026-02-09T14:20:00Z',
			rating: 4,
			content:
				'Hệ sinh thái ổn định, nắp đậy khít giữ ẩm tốt. Giao hàng hơi chậm do đợi shop setup mới.',
		},
		{
			id: 'cmt-003',
			userName: 'Lê Thu Trang',
			createdAt: '2026-02-08T11:05:00Z',
			rating: 4.5,
			content:
				'Bể giống hình 100%, nhìn bên ngoài sống động hơn nhiều. Cây cẩm nhung lên màu rất đẹp.',
			shopReply: {
				content:
					'Shop rất vui khi chị hài lòng ạ! Nhớ bật đèn quang hợp 6-8 tiếng mỗi ngày chị nhé.',
				createdAt: '2026-02-08T12:00:00Z',
			},
		},
		{
			id: 'cmt-004',
			userName: 'Phạm Gia Hưng',
			createdAt: '2026-02-07T18:40:00Z',
			rating: 3,
			content:
				'Bể đẹp nhưng size S hơi nhỏ so với mình tưởng tượng, nên mua size M sẽ hợp để bàn làm việc hơn.',
		},
		{
			id: 'cmt-005',
			userName: 'Hoàng Mỹ Linh',
			createdAt: '2026-02-07T09:22:00Z',
			rating: 5,
			content:
				'Quá ưng ý, mình mua làm quà tặng sinh nhật bạn, bạn mình thích mê. Sẽ mua thêm một bình đa giác cho bản thân.',
			shopReply: {
				content: 'Cảm ơn chị đã chọn sản phẩm của shop làm quà tặng 🥰',
				createdAt: '2026-02-07T10:00:00Z',
			},
		},
		{
			id: 'cmt-006',
			userName: 'Đặng Thanh Tùng',
			createdAt: '2026-02-06T15:30:00Z',
			rating: 2,
			content:
				'Trong lúc vận chuyển bị xô lệch đất, làm rêu dính lên kính khá nhiều, phải ngồi vệ sinh lại.',
			shopReply: {
				content:
					'Shop vô cùng xin lỗi về sự cố xô lệch do vận chuyển. Anh vui lòng check inbox để shop hướng dẫn cách vệ sinh và định hình lại bố cục nhé!',
				createdAt: '2026-02-06T16:00:00Z',
			},
		},
		{
			id: 'cmt-007',
			userName: 'Võ Thảo Nhi',
			createdAt: '2026-02-05T20:10:00Z',
			rating: 5,
			content:
				'Đèn LED rất sáng và sang, rêu đầu đinh mọc dày. Tư vấn viên rất nhiệt tình chỉ cách chăm sóc.',
		},
		{
			id: 'cmt-008',
			userName: 'Bùi Quang Huy',
			createdAt: '2026-02-04T13:55:00Z',
			rating: 4,
			content:
				'Kiểu dáng bình trụ tròn dễ nhìn ngắm từ mọi góc độ. Giá hơi cao xíu nhưng xứng đáng.',
		},
		{
			id: 'cmt-009',
			userName: 'Phan Ngọc Mai',
			createdAt: '2026-02-03T10:12:00Z',
			rating: 4.5,
			content: 'Chất lượng kính trong suốt, không bị bọt khí. Layout hài hòa.',
		},
		{
			id: 'cmt-010',
			userName: 'Lý Đức Anh',
			createdAt: '2026-02-02T16:45:00Z',
			rating: 1,
			content: 'Giao nhầm mẫu bình đa giác thành bình bầu dục, cần shop hỗ trợ đổi lại.',
			shopReply: {
				content:
					'Shop thành thật xin lỗi về sự nhầm lẫn này. Anh vui lòng kiểm tra tin nhắn, shipper bên shop sẽ qua đổi lại đúng mẫu ngay trong ngày ạ.',
				createdAt: '2026-02-02T17:30:00Z',
			},
		},
	];

	const shop: ProductShop = {
		id: '88',
		shopName: 'GreenSpace Official',
		shopSlug: 'greenspace-official',
	};

	const rawData: ProductDetailRawUser = {
		id: '1',
		name: 'Bonsai Tree Ecosystem',

		supplierName: 'Terrafulness',

		description:
			'<p>\n' +
			'  Terrarium Hệ Sinh Thái Nhiệt Đới Kín là sự kết hợp hoàn hảo giữa nghệ thuật sắp đặt\n' +
			'  và thiên nhiên thu nhỏ. Môi trường bên trong bình thủy tinh hoàn toàn khép kín,\n' +
			'  tạo ra một chu trình quang hợp và bay hơi nước tự nhiên, giúp cây cối tự duy trì\n' +
			'  sự sống mà bạn hầu như không cần phải tốn công chăm sóc.\n' +
			'</p>\n' +
			'\n' +
			'<h3>Thành phần bố cục</h3>\n' +
			'<ul>\n' +
			'  <li>\n' +
			'    <strong>Thảm rêu xanh:</strong>\n' +
			'    Sử dụng rêu đầu đinh và rêu nhung ( Cushion Moss ) giữ ẩm cực tốt, tạo cảm giác\n' +
			'    như một thảm cỏ xanh mướt giữa khu rừng.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Cây điểm xuyết:</strong>\n' +
			'    Các loại cây họ dương xỉ, cẩm nhung (Fittonia), la hán đỏ... có sức sống dẻo dai\n' +
			'    và ưa môi trường độ ẩm cao.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Đá và Lũa:</strong>\n' +
			'    Đá trầm tích và lũa tự nhiên được xử lý sạch sẽ để không sinh nấm mốc, tạo\n' +
			'    chiều sâu và vẻ đẹp hoang sơ cho bố cục.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Chất nền:</strong>\n' +
			'    Gồm 4 lớp tiêu chuẩn (Đá sỏi lọc nước, than hoạt tính khử mùi, màng lọc, và đất Akadama cao cấp).\n' +
			'  </li>\n' +
			'</ul>\n' +
			'\n' +
			'<h3>Hướng dẫn chăm sóc Terrarium Khép Kín</h3>\n' +
			'<ul>\n' +
			'  <li>\n' +
			'    <strong>Ánh sáng:</strong>\n' +
			'    Sử dụng đèn LED quang hợp (được tặng kèm) chiếu sáng từ 6 - 8 tiếng mỗi ngày.\n' +
			'    Tuyệt đối không để bình dưới ánh nắng mặt trời trực tiếp vì hiệu ứng nhà kính\n' +
			'    sẽ làm chết rêu.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Tưới nước:</strong>\n' +
			'    Vì là hệ sinh thái kín, bạn chỉ cần xịt phum sương nhẹ 1-2 lần mỗi THÁNG nếu thấy\n' +
			'    lớp thành kính thiếu đọng nước. Nếu nước đọng thành giọt lớn trên kính, hãy mở nắp\n' +
			'    khoảng 2 tiếng để bay bớt hơi ẩm.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Vệ sinh:</strong>\n' +
			'    Dùng khăn mềm lau nhẹ bên ngoài mặt kính. Cắt tỉa những lá úa vàng (nếu có)\n' +
			'    bằng nhíp chuyên dụng để tránh lây nấm.\n' +
			'  </li>\n' +
			'</ul>\n' +
			'\n' +
			'<p>\n' +
			'  <em>Lưu ý: Bể sẽ được đóng gói bằng hệ thống chèn xốp chuyên dụng, đảm bảo\n' +
			'  nguyên vẹn bố cục 100% khi vận chuyển đi xa.</em>\n' +
			'</p>\n',

		discount: calculateDiscount(1500000, 1250000),

		category: 'bonsai',

		images: [
			{
				localId: crypto.randomUUID(),
				imageUrl:
					'https://cdn.hstatic.net/products/200000968796/hh_2_665d74d1905d47a09301ec753244dc0c.png',
				order: 0,
				isPrimary: true,
				status: 'done',
				progress: 100,
			},
			{
				localId: crypto.randomUUID(),
				imageUrl: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&q=80',
				order: 1,
				isPrimary: false,
				status: 'done',
				progress: 100,
			},
		],

		createdAt: '2024-01-10T10:00:00Z',
		updatedAt: '2024-02-01T15:30:00Z',

		// Các phân loại dựa trên: Kích thước bình (Size) & Loại nắp (Lid)
		productVariants: [
			{
				id: 'c8e1467a-1234-4f01-a12b-d32109876543', // Đổi thành GUID
				productId: '550e8400-e29b-41d4-a716-446655440000', // Đã ánh xạ đúng GUID của 'Bonsai Tree Ecosystem'
				name: 'Size S - Nắp Bần',
				sku: 'BON-S-CORK',
				quantity: 12,
				costPrice: 550000,
				salePrice: 850000,
				image: 'https://cdn.hstatic.net/products/200000968796/hh_1_37e2ef90ce974747b6e5157dfdbc9621.png',
			},
			{
				id: 'a9b2345c-6789-4e21-b34c-f98765432109',
				productId: '550e8400-e29b-41d4-a716-446655440000',
				name: 'Size S - Đế Đèn LED',
				sku: 'BON-S-LED',
				quantity: 8,
				costPrice: 750000,
				salePrice: 1150000,
				image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
			},
			{
				id: '7b233a01-5242-4f3b-8531-180a3a7800ab',
				productId: '550e8400-e29b-41d4-a716-446655440000',
				name: 'Size M - Nắp Bần',
				sku: 'BON-M-CORK',
				quantity: 10,
				costPrice: 850000,
				salePrice: 1250000,
				image: 'https://cdn.hstatic.net/products/200000968796/hh_2_665d74d1905d47a09301ec753244dc0c.png',
			},
			{
				id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
				productId: '550e8400-e29b-41d4-a716-446655440000',
				name: 'Size M - Đế Đèn LED',
				sku: 'BON-M-LED',
				quantity: 15,
				costPrice: 1050000,
				salePrice: 1550000,
				image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
			},
			{
				id: 'e58ed763-928c-4155-bee9-fdbaaadc15f3',
				productId: '550e8400-e29b-41d4-a716-446655440000',
				name: 'Size L - Nắp Bần',
				sku: 'BON-L-CORK',
				quantity: 6,
				costPrice: 1200000,
				salePrice: 1850000,
				image: 'https://cdn.hstatic.net/products/200000968796/hh_2_665d74d1905d47a09301ec753244dc0c.png',
			},
			{
				id: 'bc7b2671-5085-40b9-a9a2-944a86f7df21',
				productId: '550e8400-e29b-41d4-a716-446655440000',
				name: 'Size L - Đế Đèn LED',
				sku: 'BON-L-LED',
				quantity: 9,
				costPrice: 1400000,
				salePrice: 2150000,
				image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=300&q=80',
			},
		],
		shop: shop,
		reviews: reviews,
		rating: 4.8,
	};

	return convertRawUserToProductDetail(rawData);
};

export const getRelatedProductsCraw = async (categoryName: string): Promise<ProductUserCard[]> => {
	const relatedProducts: ProductUserCard[] = [
		{
			id: 2,
			name: 'Rêu Đầu Đinh (Pin Cushion Moss) Hộp 15x15cm',
			price: 45000,
			discount: 10,
			rating: 4.8,
			image: 'https://cdn.hstatic.net/products/200000968796/cao_2_b0773e2fca4a47888df3165ae33ba42c.png',
			isInWishlist: false,
		},
		{
			id: 3,
			name: 'Bình Thủy Tinh Đa Giác Viền Đồng Size L',
			price: 250000,
			discount: 0,
			rating: 4.9,
			image: 'https://cdn.hstatic.net/products/200000968796/cao_3_d40a99a57d74431dade36456338e91d7.png',
			isInWishlist: false,
		},
		{
			id: 4,
			name: 'Đèn LED Quang Hợp Mini Đế Gỗ (Full Spectrum)',
			price: 180000,
			discount: 5,
			rating: 4.6,
			image: 'https://cdn.hstatic.net/products/200000968796/cao_4_c19ce15b3a044fe59c2adf07cddc4d31.png',
			isInWishlist: false,
		},
		{
			id: 5,
			name: 'Đất Nền Akadama Nhật Bản Chuyên Terrarium (Túi 1KG)',
			price: 65000,
			discount: 0,
			rating: 4.7,
			image: 'https://cdn.hstatic.net/products/200000968796/cao_5_477bfdf38cd04929afc984c0b73c0ee2.png',
			isInWishlist: true,
		},
		{
			id: 6,
			name: 'Bộ Dụng Cụ Trồng Terrarium Cao Cấp (Nhíp, Kéo, Xẻng Mini)',
			price: 120000,
			discount: 15,
			rating: 4.5,
			image: 'https://cdn.hstatic.net/products/200000968796/cao_6_665a02b1d3ef464494d118525b2e3dc6.png',
			isInWishlist: false,
		},
	];

	return relatedProducts;
};

export const getProductsHomeCraw = async (): Promise<ProductUserCard[]> => {
	const products: ProductUserCard[] = [
		{
			id: 7,
			name: 'Bể Terrarium Trụ Tròn Size M (Kèm Đèn)',
			image: 'https://cdn.hstatic.net/products/200000968796/cao_7_acd749099ceb4f6aa01a3fe1aca37890.png',
			price: 550000,
			isInWishlist: true,
			rating: 4.9,
			discount: 10,
		},
		{
			id: 8,
			name: 'Cây Cẩm Nhung Fittonia Đỏ Chậu Nhỏ',
			image: 'https://product.hstatic.net/200000968796/product/tf-015__1__9a93238e4b604c918e65941527286733.png',
			price: 35000,
			isInWishlist: false,
			rating: 4.7,
			discount: 0,
		},
		{
			id: 9,
			name: 'Combo Rêu Nhung, Dương Xỉ, Đất Nền Tự Setup',
			image: 'https://product.hstatic.net/200000968796/product/tf-015__2__297a7cdae0e7481c8a82971aad9a7750.png',
			price: 150000,
			isInWishlist: false,
			rating: 4.8,
			discount: 5,
		},
		{
			id: 10,
			name: 'Bình Xịt Phun Sương Mini Bằng Đồng Cao Cấp',
			image: 'https://product.hstatic.net/200000968796/product/tf-015__6__7f6dcd819fcc4c99b2beed47477926e1.png',
			price: 85000,
			isInWishlist: false,
			rating: 4.6,
			discount: 0,
		},
		{
			id: 11,
			name: 'Đá Trầm Tích Vụn Rải Đường Mòn Terrarium (500g)',
			image: 'https://product.hstatic.net/200000968796/product/tf-015__3__eb5511ad6edf4a279b55a95220ec179d.png',
			price: 25000,
			isInWishlist: true,
			rating: 4.5,
			discount: 0,
		},
		{
			id: 12,
			name: 'Paludarium - Bể Thủy Sinh Bán Cạn Độc Bản',
			image: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?q=80&w=800',
			price: 1250000,
			isInWishlist: false,
			rating: 5.0,
			discount: 15,
		},
		{
			id: 13,
			name: 'Lọc Thác Bể Thủy Sinh Mini SoBo',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 110000,
			isInWishlist: true,
			rating: 4.4,
			discount: 0,
		},
		{
			id: 14,
			name: 'Đèn Chiếu Điểm Spotlight Hồ Thủy Sinh Rọi Cây',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___4__8de9057e82334ecb84a81d2f45452153.png',
			price: 220000,
			isInWishlist: false,
			rating: 4.8,
			discount: 10,
		},
		{
			id: 15,
			name: 'Bể Kính Đa Giác Geometric Khung Đồng Vàng',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 320000,
			isInWishlist: false,
			rating: 4.9,
			discount: 15,
		},
		{
			id: 16,
			name: 'Rêu Sừng Hươu Xanh Mướt (Hộp 15x15cm)',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 55000,
			isInWishlist: true,
			rating: 4.8,
			discount: 0,
		},
		{
			id: 17,
			name: 'Tiểu Cảnh Bonsai Mini Gỗ Lũa Tự Nhiên',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 850000,
			isInWishlist: false,
			rating: 5.0,
			discount: 20,
		},
		{
			id: 18,
			name: 'Combo Cây Cắt Cắm Thủy Sinh Dễ Trồng',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 120000,
			isInWishlist: false,
			rating: 4.6,
			discount: 0,
		},
		{
			id: 19,
			name: 'Bình Cầu Thủy Tinh Trồng Sen Đá Trong Suốt',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 185000,
			isInWishlist: true,
			rating: 4.7,
			discount: 10,
		},
		{
			id: 20,
			name: 'Bộ Kéo Cắt Nhíp Gắp Aquascape Chuyên Dụng',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 250000,
			isInWishlist: false,
			rating: 4.9,
			discount: 5,
		},
		{
			id: 21,
			name: 'Bóng Đèn LED Quang Phổ Trồng Cây Trong Nhà',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 190000,
			isInWishlist: true,
			rating: 4.8,
			discount: 0,
		},
		{
			id: 22,
			name: 'Đất Nền Trộn Sẵn Phù Hợp Mọi Loại Terrarium',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 65000,
			isInWishlist: false,
			rating: 4.5,
			discount: 0,
		},
		{
			id: 23,
			name: 'Cây Dương Xỉ Lá Me Rủ Xanh Tốt',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 45000,
			isInWishlist: false,
			rating: 4.7,
			discount: 10,
		},
		{
			id: 24,
			name: 'Bình Lọ Thủy Tinh Nắp Bần Làm Terrarium Kín',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 155000,
			isInWishlist: true,
			rating: 4.9,
			discount: 0,
		},
		{
			id: 25,
			name: 'Sỏi Cuội Trắng Tự Nhiên Trang Trí (Túi 1kg)',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 30000,
			isInWishlist: false,
			rating: 4.6,
			discount: 0,
		},
		{
			id: 26,
			name: 'Combo 3 Chậu Sen Đá Size Mini Dễ Thương',
			image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
			price: 99000,
			isInWishlist: false,
			rating: 4.8,
			discount: 12,
		},
	];

	return products;
};

export const getTopSellingProductsCraw = async (): Promise<ProductUserCard[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 101,
					name: 'Bể Kính Đa Giác Basic 20x20',
					image: 'https://pos.nvncdn.com/524fc3-178700/ps/20240723_NI9uWMWxTX.jpeg?v=1721710205',
					price: 350000,
					discount: 22,
					rating: 4.9,
					isInWishlist: false,
				},
				{
					id: 102,
					name: 'Rêu Đầu Rìu (Hộp Nhỏ)',
					image: 'https://bizweb.dktcdn.net/thumb/grande/100/519/158/files/reu-mini-taiwan-thuy-sinh.jpg?v=1718441622291',
					price: 65000,
					discount: 0,
					rating: 4.8,
					isInWishlist: true,
				},
				{
					id: 103,
					name: 'Combo Đất Nền Terrarium 3 Lớp',
					image: 'https://pos.nvncdn.com/524fc3-178700/ps/20250423_dd4liBuXnx.jpeg?v=1745413756',
					price: 120000,
					discount: 10,
					rating: 5.0,
					isInWishlist: false,
				},
				{
					id: 104,
					name: 'Cây Fittonia Xanh Gân Trắng',
					image: 'https://dalat.flowers/ShowTopicSubImage.aspx?id=38057',
					price: 45000,
					discount: 0,
					rating: 4.7,
					isInWishlist: true,
				},
				{
					id: 105,
					name: 'Đèn LED Chiếu Sáng Kẹp Thành Bể',
					image: 'https://cacanhkimgiang.com/wp-content/uploads/2020/09/den-roxin-k400.jpg',
					price: 220000,
					discount: 21,
					rating: 4.6,
					isInWishlist: false,
				},
				{
					id: 106,
					name: 'Đá Tai Mèo Mini Set 500g',
					image: 'https://terrariumvibe.com/wp-content/uploads/2025/05/da-tai-meo-1.jpg',
					price: 35000,
					discount: 0,
					rating: 4.9,
					isInWishlist: false,
				},
				{
					id: 107,
					name: 'Bộ Dụng Cụ Chăm Sóc 3 Món Inox',
					image: 'https://www.dtcworld.com.vn/storage/product-images/4140/Cutlery%20Set_20230329151347.jpg',
					price: 180000,
					discount: 15,
					rating: 4.8,
					isInWishlist: false,
				},
				{
					id: 108,
					name: 'Bình Xịt Phun Sương Cấp Ẩm Cao Cấp',
					image: 'https://bizweb.dktcdn.net/100/460/752/products/binh-xit-650ml.jpg?v=1723690487857',
					price: 85000,
					discount: 22,
					rating: 4.9,
					isInWishlist: true,
				},
			]);
		}, 600);
	});
};
// craw data
export const getProductListPagingCraw = async ({
	page = 1,
	limit = 10,
}: PaginationRequest = {}): Promise<PaginationResponse<ProductUserCard>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const products: ProductUserCard[] = [
				{
					id: 7,
					name: 'Bể Terrarium Trụ Tròn Size M (Kèm Đèn)',
					image: 'https://cdn.hstatic.net/products/200000968796/cao_7_acd749099ceb4f6aa01a3fe1aca37890.png',
					price: 550000,
					isInWishlist: true,
					rating: 4.9,
					discount: 10,
				},
				{
					id: 8,
					name: 'Cây Cẩm Nhung Fittonia Đỏ Chậu Nhỏ',
					image: 'https://product.hstatic.net/200000968796/product/tf-015__1__9a93238e4b604c918e65941527286733.png',
					price: 35000,
					isInWishlist: false,
					rating: 4.7,
					discount: 0,
				},
				{
					id: 9,
					name: 'Combo Rêu Nhung, Dương Xỉ, Đất Nền Tự Setup',
					image: 'https://product.hstatic.net/200000968796/product/tf-015__2__297a7cdae0e7481c8a82971aad9a7750.png',
					price: 150000,
					isInWishlist: false,
					rating: 4.8,
					discount: 5,
				},
				{
					id: 10,
					name: 'Bình Xịt Phun Sương Mini Bằng Đồng Cao Cấp',
					image: 'https://product.hstatic.net/200000968796/product/tf-015__6__7f6dcd819fcc4c99b2beed47477926e1.png',
					price: 85000,
					isInWishlist: false,
					rating: 4.6,
					discount: 0,
				},
				{
					id: 11,
					name: 'Đá Trầm Tích Vụn Rải Đường Mòn Terrarium (500g)',
					image: 'https://product.hstatic.net/200000968796/product/tf-015__3__eb5511ad6edf4a279b55a95220ec179d.png',
					price: 25000,
					isInWishlist: true,
					rating: 4.5,
					discount: 0,
				},
				{
					id: 12,
					name: 'Paludarium - Bể Thủy Sinh Bán Cạn Độc Bản',
					image: 'https://images.unsplash.com/photo-1524704796725-9fc3044a58b2?q=80&w=800',
					price: 1250000,
					isInWishlist: false,
					rating: 5.0,
					discount: 15,
				},
				{
					id: 13,
					name: 'Lọc Thác Bể Thủy Sinh Mini SoBo',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 110000,
					isInWishlist: true,
					rating: 4.4,
					discount: 0,
				},
				{
					id: 14,
					name: 'Đèn Chiếu Điểm Spotlight Hồ Thủy Sinh Rọi Cây',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___4__8de9057e82334ecb84a81d2f45452153.png',
					price: 220000,
					isInWishlist: false,
					rating: 4.8,
					discount: 10,
				},
				{
					id: 15,
					name: 'Bể Kính Đa Giác Geometric Khung Đồng Vàng',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 320000,
					isInWishlist: false,
					rating: 4.9,
					discount: 15,
				},
				{
					id: 16,
					name: 'Rêu Sừng Hươu Xanh Mướt (Hộp 15x15cm)',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 55000,
					isInWishlist: true,
					rating: 4.8,
					discount: 0,
				},
				{
					id: 17,
					name: 'Tiểu Cảnh Bonsai Mini Gỗ Lũa Tự Nhiên',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 850000,
					isInWishlist: false,
					rating: 5.0,
					discount: 20,
				},
				{
					id: 18,
					name: 'Combo Cây Cắt Cắm Thủy Sinh Dễ Trồng',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 120000,
					isInWishlist: false,
					rating: 4.6,
					discount: 0,
				},
				{
					id: 19,
					name: 'Bình Cầu Thủy Tinh Trồng Sen Đá Trong Suốt',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 185000,
					isInWishlist: true,
					rating: 4.7,
					discount: 10,
				},
				{
					id: 20,
					name: 'Bộ Kéo Cắt Nhíp Gắp Aquascape Chuyên Dụng',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 250000,
					isInWishlist: false,
					rating: 4.9,
					discount: 5,
				},
				{
					id: 21,
					name: 'Bóng Đèn LED Quang Phổ Trồng Cây Trong Nhà',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 190000,
					isInWishlist: true,
					rating: 4.8,
					discount: 0,
				},
				{
					id: 22,
					name: 'Đất Nền Trộn Sẵn Phù Hợp Mọi Loại Terrarium',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 65000,
					isInWishlist: false,
					rating: 4.5,
					discount: 0,
				},
				{
					id: 23,
					name: 'Cây Dương Xỉ Lá Me Rủ Xanh Tốt',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 45000,
					isInWishlist: false,
					rating: 4.7,
					discount: 10,
				},
				{
					id: 24,
					name: 'Bình Lọ Thủy Tinh Nắp Bần Làm Terrarium Kín',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 155000,
					isInWishlist: true,
					rating: 4.9,
					discount: 0,
				},
				{
					id: 25,
					name: 'Sỏi Cuội Trắng Tự Nhiên Trang Trí (Túi 1kg)',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 30000,
					isInWishlist: false,
					rating: 4.6,
					discount: 0,
				},
				{
					id: 26,
					name: 'Combo 3 Chậu Sen Đá Size Mini Dễ Thương',
					image: 'https://product.hstatic.net/200000968796/product/tf-039__1800_x_1800_px___2__3d78652d979b451298fc085ccb4e12d3.png',
					price: 99000,
					isInWishlist: false,
					rating: 4.8,
					discount: 12,
				},
			];

			// Cắt mảng dữ liệu dựa theo page và limit (Giả lập phân trang thực tế)
			const startIndex = (page - 1) * limit;
			const endIndex = startIndex + limit;
			const paginatedProducts = products.slice(startIndex, endIndex);

			// Bọc lại trong cấu trúc PaginationResponse
			resolve({
				data: paginatedProducts,
				meta: {
					totalItems: products.length, // 20 sản phẩm
					totalPages: Math.ceil(products.length / limit), // Ví dụ limit=10 thì ra 2 trang
					currentPage: page,
					itemsPerPage: limit,
				},
			});
		}, 500); // Thêm setTimeout 500ms giả lập độ trễ mạng
	});
};

export const getCategoryListNameForSelectionMocking = async (): Promise<CategoryOption[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 'cat_1', name: 'Terrarium Kín' },
				{ id: 'cat_2', name: 'Terrarium Hở' },
				{ id: 'cat_3', name: 'Phụ Kiện Terrarium' },
				{ id: 'cat_4', name: 'Cây Cảnh Mini' },
				{ id: 'cat_5', name: 'Đất & Rêu' },
			]);
		}, 500);
	});
};

export const getShopListNameForSelectionMocking = async (): Promise<ShopOption[]> => {
	// Giả lập thời gian chờ tải dữ liệu từ server (ví dụ: 500ms)
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{ id: 'shop_1', name: 'Shop Terra HCM' },
				{ id: 'shop_2', name: 'Tiệm Cây Xanh' },
				{ id: 'shop_3', name: 'Green Life Studio' },
				{ id: 'shop_4', name: 'Khu Vườn Mini' },
			]);
		}, 500);
	});
};

// get data

/**
 * Hàm lấy danh sách sản phẩm phân trang dành cho Server Component
 * @param params
 */
export const getPageProducts = async (
	params: PaginationParams,
): Promise<PaginationResponse<ProductUserCard>> => {
	try {
		// 1. Dùng apiServer gọi thẳng đến backend .NET
		const response = await apiClient.get<ResponseApi<BackendPagedResult<BackendProductItem>>>(
			`/products`,
			{
				params: params,
			},
		);

		// 2. Kiểm tra dữ liệu an toàn
		if (!response.data || !response.data.isSuccess || !response.data.data) {
			// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
			return await getProductListPagingCraw();
		}

		// 3. Đưa qua hàm map để bóc tách vỏ .NET và gọt giũa lại thành ProductUserCard
		// (Sử dụng hàm mapBackendToFrontendPagination bạn đã tạo ở lượt trước)
		return mapBackendToFrontendPagination(response.data.data);
	} catch (error: unknown) {
		console.error('[SERVICE-ERROR] Lỗi gọi danh sách sản phẩm:', error);
		return await getProductListPagingCraw();
	}
};

export const getProductDetailById = async (productId: string): Promise<ProductDetail> => {
	try {
		const response = await apiClient.get<ResponseApi<BackEndProductDetail>>(
			`/products/${productId}`,
		);
		if (!response.data || !response.data.isSuccess || !response.data.data) {
			return getProductDetailByIdCraw(productId);
		}
		return  mapProductDetailBeToFe(response.data.data);
	} catch (error: unknown) {
		return getProductDetailByIdCraw(productId);
	}
};

export const getRelatedProducts = async (
	productId: string,
	paginationRequest?: PaginationRequest,
): Promise<ProductUserCard[]> => {
	try {
		const response = await apiClient.get<ResponseApi<BackendPagedResult<BackendProductItem>>>(
			`/products/${productId}/related`,
			{
				params: paginationRequest,
			},
		);
		if (
			response === null ||
			!response.data ||
			!response.data.isSuccess ||
			!response.data.data
		) {
			return [];
		}
		return mapBackendPaginationToFrontend(response.data.data).data;
	} catch (error: unknown) {
		console.log('error getRelated product');
		return getRelatedProductsCraw(productId);
	}
};

export const getTopSellingProducts = async (): Promise<ProductUserCard[]> => {
	try {
		// 1. Dùng apiServer gọi thẳng đến backend .NET
		const response = await apiClient.get<ResponseApi<BackendPagedResult<BackendProductItem>>>(
			`/products`,
			{
				params: {
					pageSize: 8,
					pageNumber: 1,
				},
			},
		);
		// 2. Kiểm tra dữ liệu an toàn
		if (!response.data || !response.data.isSuccess || !response.data.data) {
			// Trả về dữ liệu rỗng an toàn thay vì làm sập trang
			return getTopSellingProductsCraw();
		}
		const res: PaginationResponse<ProductUserCard> = mapBackendPaginationToFrontend(
			response.data.data,
		);
		// 3. Đưa qua hàm map để bóc tách vỏ .NET và gọt giũa lại thành ProductUserCard
		// (Sử dụng hàm mapBackendToFrontendPagination bạn đã tạo ở lượt trước)
		return res.data;
	} catch (error: unknown) {
		console.log('error getTopSellingProducts');
		return getTopSellingProductsCraw();
	}
};

export const getProductsHome = async (): Promise<ProductUserCard[]> => {
	try {
		const params: PaginationParams = {
			pageNumber: 3,
			pageSize: 24,
		};
		const response = await apiClient.get(`/products`, {
			params: params,
		});
		if (!response.data || !response.data.isSuccess || !response.data.data) {
			return [];
		}
		console.log(response.data.data);
		return mapBackendToFrontendPagination(response.data.data).data;
	} catch {
		return getProductsHomeCraw();
	}
};

export const getProductFilter = async (
	request?: ProductFilterPayload,
	pageParams?: PaginationParams,
): Promise<PaginationResponse<ProductUserCard>> => {
	try {
		const flatParams = {
			...request,
			...pageParams,
		};

		const response = await apiClient.get(`/products`, {
			params: flatParams,
		});

		if (!response.data || !response.data.isSuccess || !response.data.data) {
			return getProductListPagingCraw();
		}

		console.log(response.data.data);

		return mapBackendToFrontendPagination(response.data.data);
	} catch {
		return getProductListPagingCraw();
	}
};

export const getCategoryListNameForSelection = async (): Promise<CategoryOption[]> => {
	try {
		const response = await apiClient.get<ResponseApi<ListCategoryName>>(`categories/list-name`);

		if (!response.data || !response.data.isSuccess || !response.data.data) {
			return getCategoryListNameForSelectionMocking();
		}

		console.log(response.data.data);

		return response.data.data.listNames;
	} catch {
		return getCategoryListNameForSelectionMocking();
	}
};

export const getShopListNameForSelection = async (): Promise<ShopOption[]> => {
	try {
		const response = await apiClient.get<ResponseApi<ListShopName>>(`/shop/list-name`);

		console.log('shop for selection', response.data.data);
		if (!response.data || !response.data.isSuccess || !response.data.data) {
			return getShopListNameForSelectionMocking();
		}

		console.log(response.data.data);

		return response.data.data.listNames;
	} catch {
		return getShopListNameForSelectionMocking();
	}
};

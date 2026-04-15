import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductUserCard } from '@/types/products/user/ProductUserCard';
import { Review } from '@/types/products/user/Review';

export const getProductDetailById = async (productId: number): Promise<ProductDetail> => {
	const reviews: Review[] = [
		{
			id: 'cmt-001',
			userName: 'Nguyễn Minh Anh',
			createdAt: '2026-02-10T08:15:00Z',
			rating: 5,
			content: 'Sản phẩm rất tốt, đóng gói kỹ, giao hàng nhanh. Sẽ ủng hộ shop dài dài.',
			shopReply: {
				content: 'Cảm ơn anh/chị đã tin tưởng và ủng hộ shop ❤️',
				createdAt: '2026-02-10T09:00:00Z',
			},
		},
		{
			id: 'cmt-002',
			userName: 'Trần Quốc Bảo',
			createdAt: '2026-02-09T14:20:00Z',
			rating: 4,
			content: 'Chất lượng ổn trong tầm giá, nhưng giao hàng hơi chậm.',
		},
		{
			id: 'cmt-003',
			userName: 'Lê Thu Trang',
			createdAt: '2026-02-08T11:05:00Z',
			rating: 4.5,
			content: 'Sản phẩm giống mô tả, dùng khá hài lòng. Đáng tiền.',
			shopReply: {
				content: 'Shop rất vui khi chị hài lòng ạ!',
				createdAt: '2026-02-08T12:00:00Z',
			},
		},
		{
			id: 'cmt-004',
			userName: 'Phạm Gia Hưng',
			createdAt: '2026-02-07T18:40:00Z',
			rating: 3,
			content: 'Dùng tạm ổn, chưa thật sự xuất sắc như mong đợi.',
		},
		{
			id: 'cmt-005',
			userName: 'Hoàng Mỹ Linh',
			createdAt: '2026-02-07T09:22:00Z',
			rating: 5,
			content: 'Mình rất thích sản phẩm này, sẽ giới thiệu bạn bè.',
			shopReply: {
				content: 'Cảm ơn chị đã giới thiệu shop đến bạn bè 🥰',
				createdAt: '2026-02-07T10:00:00Z',
			},
		},
		{
			id: 'cmt-006',
			userName: 'Đặng Thanh Tùng',
			createdAt: '2026-02-06T15:30:00Z',
			rating: 2,
			content: 'Sản phẩm không đúng kỳ vọng, hơi thất vọng.',
			shopReply: {
				content:
					'Shop xin lỗi về trải nghiệm chưa tốt. Anh vui lòng inbox để shop hỗ trợ nhé!',
				createdAt: '2026-02-06T16:00:00Z',
			},
		},
		{
			id: 'cmt-007',
			userName: 'Võ Thảo Nhi',
			createdAt: '2026-02-05T20:10:00Z',
			rating: 5,
			content: 'Quá tuyệt vời, không có gì để chê.',
		},
		{
			id: 'cmt-008',
			userName: 'Bùi Quang Huy',
			createdAt: '2026-02-04T13:55:00Z',
			rating: 4,
			content: 'Mọi thứ đều ổn, đóng gói chắc chắn.',
		},
		{
			id: 'cmt-009',
			userName: 'Phan Ngọc Mai',
			createdAt: '2026-02-03T10:12:00Z',
			rating: 4.5,
			content: 'Chất lượng tốt, giá hợp lý.',
		},
		{
			id: 'cmt-010',
			userName: 'Lý Đức Anh',
			createdAt: '2026-02-02T16:45:00Z',
			rating: 1,
			content: 'Giao nhầm màu, cần shop hỗ trợ đổi trả.',
			shopReply: {
				content:
					'Shop xin lỗi về sự cố này. Anh vui lòng kiểm tra tin nhắn để shop hỗ trợ đổi trả ạ.',
				createdAt: '2026-02-02T17:30:00Z',
			},
		},
	];

	const productDetail: ProductDetail = {
		id: productId,
		name: 'Khoai Tây Hồng VietGAP 500G (Túi)',
		brand: 'Trường Phát',
		price: 33000,
		image: 'https://cdn.hstatic.net/products/1000141988/x__l_ch_romaine_vietgap_tr__ng_ph_t_200_g___g_i____1__3fc777e3da9141469eb15bc5d28c62b1_master.png',
		rating: 4.5,
		discount: 0.5,
		description:
			'<p>\n' +
			'  Khô mực Song Phương là sản phẩm hải sản khô chất lượng cao, được tuyển chọn từ\n' +
			'  những con mực tươi sống đánh bắt trực tiếp từ các vùng biển nổi tiếng của Việt Nam.\n' +
			'  Với kích thước size S (nhỏ vừa), mực có độ mềm, ngọt thanh và rất dễ chế biến,\n' +
			'  phù hợp cho các bữa ăn gia đình hoặc làm món nhắm tinh tế.\n' +
			'</p>\n' +
			'\n' +
			'<h3>Đặc điểm nổi bật</h3>\n' +
			'<ul>\n' +
			'  <li>\n' +
			'    <strong>Kích thước phù hợp (Size S):</strong>\n' +
			'    Với mật độ khoảng 70 - 80 con/kg, những con mực này có kích thước vừa vặn,\n' +
			'    không quá dày nhưng thịt rất dai và ngọt. Đây là size mực lý tưởng để nướng\n' +
			'    ăn liền hoặc làm mực ngào.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Độ tươi và khô chuẩn:</strong>\n' +
			'    Mực được phơi dưới nắng tự nhiên giúp thân mực khô đều, có màu hồng nhạt đẹp mắt,\n' +
			'    lớp phấn trắng mỏng bao phủ bên ngoài (dấu hiệu của mực tươi được phơi ngay).\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Vị ngọt tự nhiên:</strong>\n' +
			'    Khi nướng hoặc chế biến, mực tỏa mùi thơm đặc trưng của biển, thịt mực càng nhai\n' +
			'    càng ngọt, không bị đắng hay mặn gắt.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Đóng hộp sang trọng:</strong>\n' +
			'    Hộp 150g được đóng gói kỹ lưỡng, sạch sẽ, không chỉ giúp bảo quản tốt chất lượng\n' +
			'    mực mà còn rất lịch sự khi dùng làm quà biếu tặng.\n' +
			'  </li>\n' +
			'</ul>\n' +
			'\n' +
			'<h3>Gợi ý món ngon</h3>\n' +
			'<ul>\n' +
			'  <li>\n' +
			'    <strong>Mực nướng truyền thống:</strong>\n' +
			'    Nướng bằng cồn, than hoặc nồi chiên không dầu. Sau khi chín, đập dập và xé tơi\n' +
			'    từng sợi, chấm cùng tương ớt hoặc Sốt kim quất Vina V&amp;T.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Mực khô chiên nước mắm:</strong>\n' +
			'    Cắt mực thành miếng vừa ăn, chiên vàng rồi sốt cùng nước mắm tỏi ớt đường.\n' +
			'    Đây là món "bắt mồi" cực đỉnh.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Gỏi xoài mực khô:</strong>\n' +
			'    Mực nướng xé nhỏ trộn cùng xoài xanh bào sợi, rau thơm (ngò rí, húng quế)\n' +
			'    và nước mắm chua ngọt.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Nấu nước dùng:</strong>\n' +
			'    Cho 1-2 con mực khô vào nồi nước lèo (hủ tiếu, phở) sẽ giúp nước dùng có\n' +
			'    vị ngọt thanh và hương thơm đậm đà hơn hẳn.\n' +
			'  </li>\n' +
			'</ul>\n' +
			'\n' +
			'<h3>Hướng dẫn bảo quản</h3>\n' +
			'<p>Để giữ mực luôn ngon, không bị mốc hay cứng:</p>\n' +
			'<ul>\n' +
			'  <li>\n' +
			'    <strong>Bảo quản lạnh (Ưu tiên):</strong>\n' +
			'    Gói kín mực bằng giấy báo hoặc túi nilon, sau đó cho vào ngăn mát (nếu dùng ngay)\n' +
			'    hoặc ngăn đá (nếu muốn để lâu trên 3 tháng).\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Tránh độ ẩm:</strong>\n' +
			'    Không để mực ở nơi ẩm ướt vì mực khô rất dễ hút ẩm và sinh nấm mốc.\n' +
			'  </li>\n' +
			'  <li>\n' +
			'    <strong>Cách xử lý mực bị cứng:</strong>\n' +
			'    Nếu mực để tủ đông quá lâu bị khô cứng, bạn có thể ngâm nước ấm khoảng\n' +
			'    5 phút trước khi chế biến để mực mềm trở lại.\n' +
			'  </li>\n' +
			'</ul>\n' +
			'\n' +
			'<h4>Mua hải sản khô ở đâu?</h4>\n' +
			'<p>\n' +
			'  Nếu bạn chưa biết mua hải sản khô ở đâu tại TP.HCM, bạn có thể tham khảo\n' +
			'  hệ thống cửa hàng Farmers Market để lựa chọn sản phẩm đạt chuẩn chất lượng,\n' +
			'  an tâm về nguồn gốc với giá thành tốt nhất.\n' +
			'</p>\n' +
			'\n' +
			'<h4>Hệ thống cửa hàng</h4>\n' +
			'<ul>\n' +
			'  <li>Farmers Market Hai Bà Trưng (104 Hai Bà Trưng, Phường Đa Kao, Quận 1)</li>\n' +
			'  <li>Farmers Market Nguyễn Thị Minh Khai (496 Nguyễn Thị Minh Khai, Phường 2, Quận 3)</li>\n' +
			'  <li>Farmers Market Phan Xích Long (218 Phan Xích Long, Phường 2, Phú Nhuận)</li>\n' +
			'  <li>Farmers Market Nguyễn Thị Thập (486 Nguyễn Thị Thập, Tân Quy, Quận 7)</li>\n' +
			'  <li>Farmers Market Hoàng Hoa Thám (99 Hoàng Hoa Thám, Phường 6, Bình Thạnh)</li>\n' +
			'  <li>Farmers Market Tân Bình (43 Võ Thành Trang, Phường 11, Tân Bình)</li>\n' +
			'  <li>Farmers Market Gò Vấp (16 Quang Trung, Phường 10, Gò Vấp)</li>\n' +
			'</ul>\n' +
			'\n' +
			'<p><strong>Thời gian mở cửa:</strong> 6h30 - 22h30 (Tất cả các ngày trong tuần)</p>\n' +
			'\n' +
			'<p>\n' +
			'  Tư vấn viên của Farmers Market rất vinh hạnh được giải đáp mọi thắc mắc của Quý Khách.\n' +
			'</p>\n',
		reviews: reviews,
	};

	return productDetail;
};

export const getRelatedProducts = async (categoryName: string): Promise<ProductUserCard[]> => {
	const relatedProducts: ProductUserCard[] = [
		{
			id: 2,
			name: 'Xà lách Romaine VietGAP 200G',
			price: 25000,
			discount: 10,
			rating: 4.5,
			image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?q=80&w=800',
			isInWishlist: false,
		},
		{
			id: 3,
			name: 'Cà chua bi Đà Lạt 500G',
			price: 32000,
			discount: 0,
			rating: 4.8,
			image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=800',
			isInWishlist: false,
		},
		{
			id: 4,
			name: 'Khoai tây Đà Lạt 1KG',
			price: 40000,
			discount: 5,
			rating: 4.6,
			image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRLhT2Ikxp2a-v-AqVFxWZZFMtT6_m602j8zdlMUuGelpUwuFRp',
			isInWishlist: false,
		},
		{
			id: 5,
			name: '[Đông lạnh] Pizza Ristorante Piccola Margherita Dr. Oetker 270G',
			price: 169000,
			discount: 5,
			rating: 4.6,
			image: 'https://product.hstatic.net/1000141988/product/pizza_ristorante_piccola_margherita_dr._oetker_270_g_bd46821fd58b4ae48d55375ca25590e6_master.jpg',
			isInWishlist: false,
		},
		{
			id: 6,
			name: 'Khô mực size S 70 - 80 Song Phương 150 g (hộp)',
			price: 235000,
			discount: 5,
			rating: 4.6,
			image: 'https://cdn.hstatic.net/products/1000141988/kh__m_c_size_s_70_-_80_song_ph__ng_150_g___h_p___878c79ee628a476f8e32807009fa9289_master.jpg',
			isInWishlist: false,
		},
	];

	return relatedProducts;
};

export const getProductsHome = async (): Promise<ProductUserCard[]> => {
	const products: ProductUserCard[] = [
		{
			id: 1,
			name: 'Orange',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZbB_doR9LVg_xVbDXOOZc3TNbgNCEIzLLKw&s',
			price: 5.5,
			isInWishlist: true,
			rating: 4.6,
			discount: 0,
		},
		{
			id: 2,
			name: 'Tangerine',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-fSVx2LYnvTgOi1oiw2lONk1EkZf3ZOJTGQ&s',
			price: 3.0,
			isInWishlist: false,
			rating: 4.7,
			discount: 0,
		},
		{
			id: 3,
			name: 'Raspberry',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-k_lv6L0dU7km1VpLN0IQV-Nr8jVNS69vw&s',
			price: 10.0,
			isInWishlist: false,
			rating: 4.5,
			discount: 0,
		},
		{
			id: 4,
			name: 'Lemon',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQg7t4ogMfd_ii5A99O4xakAhyFqnjYecZAw&s',
			price: 5.3,
			isInWishlist: false,
			rating: 4.7,
			discount: 0.5,
		},
		{
			id: 5,
			name: 'Avocado',
			image: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/16762/gettyimages-961101662.jpg',
			price: 15.7,
			isInWishlist: true,
			rating: 4.5,
			discount: 0,
		},
		{
			id: 6,
			name: 'Lemon 2',
			image: 'https://media.istockphoto.com/id/1130558991/photo/whole-lemon-isolated-on-white-background-clipping-path-full-depth-of-field.jpg?s=612x612&w=0&k=20&c=un9FPAWPWX5VDdWrV_FIv1-M5sPD6z_isJZA6HFyy_I=',
			price: 8.0,
			isInWishlist: false,
			rating: 4.7,
			discount: 0.5,
		},
		{
			id: 7,
			name: 'Banana',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMZw3NVvQB7ew-0I7zWlJw5b6iaU9TrcGY4Q&s',
			price: 7.5,
			isInWishlist: true,
			rating: 4.7,
			discount: 0,
		},
		{
			id: 8,
			name: 'Watermelon',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR2eBUKsjuLAl0oqz7YvkZJFU1C3znejG4g&s',
			price: 12.2,
			isInWishlist: false,
			rating: 5.0,
			discount: 0.3,
		},
	];

	return products;
};
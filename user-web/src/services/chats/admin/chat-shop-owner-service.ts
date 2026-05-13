import { ChatConversation } from '@/types/chats/user/ChatConversation';
import { ChatMessage } from '@/types/chats/user/ChatMessage';

// Giả lập API lấy danh sách hội thoại
export async function getConversationsShopOwner(): Promise<ChatConversation[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 'conv-1',
					name: 'Nguyễn Minh Tuấn', // Tên khách hàng
					avatarUrl:
						'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150',
					lastMessage: 'Ok shop, lấy mình 1 bể kèm set đèn nhé.',
					unreadCount: 1, // Khách vừa nhắn lại, shop chưa đọc
				},
				{
					id: 'conv-2',
					name: 'Lê Ngọc Hân', // Tên khách hàng
					avatarUrl:
						'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
					lastMessage: 'Cảm ơn bạn đã đặt hàng. Shop sẽ đóng gói cẩn thận bằng xốp nổ ạ!',
					unreadCount: 0, // Shop là người nhắn cuối cùng
				},
				{
					id: 'conv-3',
					name: 'Admin Hệ Thống', // Thông báo từ sàn
					avatarUrl: undefined, // Fallback chữ 'A'
					lastMessage: 'Sản phẩm "Bể Kính Đa Giác" của bạn đã được phê duyệt.',
					unreadCount: 1,
				},
			]);
		}, 600); // Giả lập mạng chậm 0.6s
	});
}

// Giả lập API lấy tin nhắn theo ID hội thoại
export async function getMessagesShopOwnerByConversationId(
	conversationId: string,
): Promise<ChatMessage[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (conversationId === 'conv-1') {
				resolve([
					{
						id: 'msg-1',
						text: 'Chào shop, cho mình hỏi bể Terrarium trụ tròn size M còn hàng không ạ?',
						isMe: false, // isMe = false -> Khách hàng hỏi
						createdAt: new Date(Date.now() - 3600000).toISOString(),
					},
					{
						id: 'msg-2',
						text: 'Chào bạn, cảm ơn bạn đã quan tâm đến sản phẩm của TerraCraft.',
						isMe: true, // isMe = true -> Chủ shop trả lời
						createdAt: new Date(Date.now() - 3500000).toISOString(),
					},
					{
						id: 'msg-3',
						text: 'Dạ, bể tròn size M bên mình hiện đang còn hàng ạ. Bạn có muốn đặt kèm set đèn LED rọi không?',
						isMe: true, // Chủ shop trả lời
						createdAt: new Date(Date.now() - 3400000).toISOString(),
					},
					{
						id: 'msg-4',
						text: 'Ok shop, lấy mình 1 bể kèm set đèn nhé.',
						isMe: false, // Khách chốt đơn
						createdAt: new Date(Date.now() - 100000).toISOString(),
					},
				]);
			} else if (conversationId === 'conv-2') {
				resolve([
					{
						id: 'msg-5',
						text: 'Mình vừa đặt 1 đơn Hỏa tốc, shop bọc kỹ chống sốc giúp mình nhé vì có bể kính.',
						isMe: false, // Khách hàng dặn dò
						createdAt: new Date(Date.now() - 86400000).toISOString(),
					},
					{
						id: 'msg-6',
						text: 'Cảm ơn bạn đã đặt hàng. Shop sẽ đóng gói cẩn thận bằng xốp nổ ạ!',
						isMe: true, // Chủ shop xác nhận
						createdAt: new Date(Date.now() - 86000000).toISOString(),
					},
				]);
			} else {
				resolve([
					{
						id: 'msg-7',
						text: 'Sản phẩm "Bể Kính Đa Giác" của bạn đã được phê duyệt và đang hiển thị trên sàn.',
						isMe: false, // Admin hệ thống thông báo
						createdAt: new Date().toISOString(),
					},
				]);
			}
		}, 400);
	});
}

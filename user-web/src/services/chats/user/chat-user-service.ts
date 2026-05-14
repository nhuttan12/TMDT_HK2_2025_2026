import { ChatConversation } from "@/types/chats/user/ChatConversation";
import { ChatMessage } from "@/types/chats/user/ChatMessage";

// Hàm lấy danh sách cuộc hội thoại
export const getConversations = async (): Promise<ChatConversation[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 'conv-1',
					name: 'GreenSpace Official',
					lastMessage: 'Shop còn hàng không?',
					unreadCount: 0,
				},
				{
					id: 'conv-2',
					name: 'AquaFlora VN',
					lastMessage: 'Đơn hàng của bạn đã được giao.',
					unreadCount: 2,
				},
				{
					id: 'conv-3',
					name: 'Hỗ trợ khách hàng',
					lastMessage: 'Chào bạn, mình có thể giúp gì cho bạn?',
					unreadCount: 1,
				},
			]);
		}, 500);
	});
};

// Hàm lấy chi tiết tin nhắn của 1 cuộc hội thoại
export const getMessagesByConversationId = async (
	conversationId: string,
): Promise<ChatMessage[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 'msg-1',
					text: 'Chào bạn 👋',
					isMe: false,
					createdAt: '2026-05-06T10:00:00Z',
				},
				{
					id: 'msg-2',
					text: 'Sản phẩm Bể Terrarium size M còn hàng không shop?',
					isMe: true,
					createdAt: '2026-05-06T10:05:00Z',
				},
				{
					id: 'msg-3',
					text: 'Dạ sản phẩm này bên em đang sẵn hàng ạ. Anh/chị có thể đặt trực tiếp trên gian hàng nhé!',
					isMe: false,
					createdAt: '2026-05-06T10:06:00Z',
				},
			]);
		}, 500);
	});
};

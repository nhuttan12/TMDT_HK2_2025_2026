import { JSX } from 'react';
import { Metadata } from 'next';
import ChatPageContainer from './_components/chat-page-container';
import { getConversationsShopOwner } from '@/services/chats/admin/chat-shop-owner-service';

export const metadata: Metadata = {
	title: 'Tin nhắn - Quản lý cửa hàng',
};

export default async function ChatPage(): Promise<JSX.Element> {
	// Gọi API lấy danh sách hội thoại từ Server
	const initialConversations = await getConversationsShopOwner();

	return <ChatPageContainer initialConversations={initialConversations} />;
}

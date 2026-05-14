'use client';

import { JSX, useEffect, useState } from 'react';
import { ChatBoxUi } from './chat-box-ui';
import { ChatConversation } from '@/types/chats/user/ChatConversation';
import { ChatMessage } from '@/types/chats/user/ChatMessage';
import { useChatLogic } from '@/hooks/chats/user/use-chat-user-logic';
import { getConversations, getMessagesByConversationId } from '@/services/chats/user/chat-user-service';

interface Props {
	chatboxWidth?: string;
	chatboxHeight?: string;
}

export default function ChatBoxContainer({
	chatboxWidth = '550px',
	chatboxHeight = '600px',
}: Props): JSX.Element {
	// 1. Quản lý việc gọi Service Data (Trong thực tế, nên dùng useQuery của Tanstack Query)
	const [conversations, setConversations] = useState<ChatConversation[]>([]);
	const [serverMessages, setServerMessages] = useState<ChatMessage[]>([]);
	const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);

	// 2. Kích hoạt Custom Hook quản lý Event / UI State
	const logic = useChatLogic(serverMessages);

	// Tải danh sách hội thoại lúc khởi tạo
	useEffect((): void => {
		const fetchConversations = async (): Promise<void> => {
			const data = await getConversations();
			setConversations(data);
		};
		fetchConversations();
	}, []);

	// Tải tin nhắn khi người dùng chọn hội thoại khác
	useEffect((): void => {
		const fetchMessages = async (): Promise<void> => {
			if (!logic.selectedConversationId) return;

			setIsLoadingMessages(true);
			const data = await getMessagesByConversationId(logic.selectedConversationId);
			setServerMessages(data);

			// Đồng bộ lại tin nhắn vào logic hook (để nó kết hợp với tin nhắn mới gõ ở client)
			logic.optimisticMessages.splice(0, logic.optimisticMessages.length, ...data);
			setIsLoadingMessages(false);
		};
		fetchMessages();
	}, [logic.selectedConversationId]);

	// 3. Render giao diện với data đã được chuẩn hóa
	return (
		<ChatBoxUi
			chatboxWidth={chatboxWidth}
			chatboxHeight={chatboxHeight}
			conversations={conversations}
			// Ưu tiên hiển thị mảng optimistic từ hook vì nó chứa cả tin nhắn mới gõ chưa kịp lưu database
			messages={logic.optimisticMessages}
			isLoading={isLoadingMessages}
			{...logic}
		/>
	);
}

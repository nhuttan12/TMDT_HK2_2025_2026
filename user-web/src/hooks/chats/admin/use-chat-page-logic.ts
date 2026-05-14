'use client';

import { getMessagesShopOwnerByConversationId } from '@/services/chats/admin/chat-shop-owner-service';
import { ChatConversation } from '@/types/chats/user/ChatConversation';
import { ChatMessage } from '@/types/chats/user/ChatMessage';
import { ChangeEvent, useEffect, useState } from 'react';

export interface ChatPageLogicReturn {
	conversations: ChatConversation[];
	messages: ChatMessage[];
	isLoading: boolean;

	selectedConversationId: string | null;
	handleSelectConversation: (id: string) => void;

	inputText: string;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSendMessage: () => void;
}

export function useChatPageLogic(initialConversations: ChatConversation[]): ChatPageLogicReturn {
	// 1. Quản lý dữ liệu danh sách và loading
	const [conversations, setConversations] = useState<ChatConversation[]>(initialConversations);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	// Tự động chọn cuộc hội thoại đầu tiên nếu có
	const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
		initialConversations.length > 0 ? initialConversations[0].id : null,
	);
	const [inputText, setInputText] = useState<string>('');

	// 2. Fetch data khi đổi người chat (Đem từ Container qua)
	useEffect(() => {
		const fetchMessages = async (): Promise<void> => {
			if (!selectedConversationId) return;

			setIsLoading(true);
			try {
				const data = await getMessagesShopOwnerByConversationId(selectedConversationId);
				setMessages(data);
			} catch (error) {
				console.error('Lỗi khi tải tin nhắn:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchMessages();
	}, [selectedConversationId]);

	// 3. Các hàm xử lý sự kiện
	const handleSelectConversation = (id: string): void => {
		setSelectedConversationId(id);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setInputText(e.target.value);
	};

	const handleSendMessage = (): void => {
		if (!inputText.trim()) return;

		const newMessage: ChatMessage = {
			id: crypto.randomUUID(),
			text: inputText,
			isMe: true,
			createdAt: new Date().toISOString(),
		};

		// Thêm tin nhắn vào màn hình ngay lập tức (Optimistic UI)
		setMessages((prev: ChatMessage[]) => [...prev, newMessage]);
		setInputText('');

		// TODO: Gọi Mutation của Tanstack Query để đẩy data lên Server
	};

	return {
		conversations,
		messages,
		isLoading,
		selectedConversationId,
		handleSelectConversation,
		inputText,
		handleInputChange,
		handleSendMessage,
	};
}

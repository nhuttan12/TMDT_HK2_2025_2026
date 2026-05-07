'use client';

import { ChatMessage } from '@/types/chats/user/ChatMessage';
import { ChangeEvent, useState } from 'react';

export interface ChatLogicReturn {
	isOpen: boolean;
	handleToggleOpen: (state: boolean) => void;

	selectedConversationId: string | null;
	handleSelectConversation: (id: string) => void;

	inputText: string;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSendMessage: () => void;

	// State tạm để render UI mượt mà khi người dùng vừa gửi tin nhắn xong (chưa kịp lưu server)
	optimisticMessages: ChatMessage[];
}

export function useChatLogic(initialMessages: ChatMessage[] = []): ChatLogicReturn {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedConversationId, setSelectedConversationId] = useState<string | null>('conv-1');
	const [inputText, setInputText] = useState<string>('');
	const [optimisticMessages, setOptimisticMessages] = useState<ChatMessage[]>(initialMessages);

	const handleToggleOpen = (state: boolean): void => {
		setIsOpen(state);
	};

	const handleSelectConversation = (id: string): void => {
		setSelectedConversationId(id);
		// Logic thực tế: Gọi Tanstack Query để refetch tin nhắn dựa theo ID mới
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

		// Thêm tin nhắn vào mảng tạm để hiển thị ngay lập tức (Optimistic UI)
		setOptimisticMessages((prev: ChatMessage[]) => [...prev, newMessage]);
		setInputText('');

		// Logic thực tế: Chỗ này sẽ gọi Mutation của Tanstack Query để POST lên Backend hoặc emit qua Socket.io
	};

	return {
		isOpen,
		handleToggleOpen,
		selectedConversationId,
		handleSelectConversation,
		inputText,
		handleInputChange,
		handleSendMessage,
		optimisticMessages,
	};
}

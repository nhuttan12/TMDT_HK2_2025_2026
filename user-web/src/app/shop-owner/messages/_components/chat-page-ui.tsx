'use client';

import { JSX } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { ChatConversation } from '@/types/chats/user/ChatConversation';
import { ChatMessage } from '@/types/chats/user/ChatMessage';
import { ChatPageLogicReturn } from '@/hooks/chats/admin/use-chat-page-logic';

interface ChatPageUiProps extends ChatPageLogicReturn {
	conversations: ChatConversation[];
	messages: ChatMessage[];
	isLoading: boolean;
}

export function ChatPageUi({
	conversations,
	messages,
	isLoading,
	selectedConversationId,
	handleSelectConversation,
	inputText,
	handleInputChange,
	handleSendMessage,
}: ChatPageUiProps): JSX.Element {
	const safeConversations = conversations || [];
	const safeMessages = messages || [];
	const activeConversation = safeConversations.find((c) => c.id === selectedConversationId);

	return (
		// Container chính: Chiều cao chiếm gần trọn màn hình, bọc border chuẩn giao diện Desktop
		<div className='flex w-full bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-[calc(100vh-120px)] min-h-[665px]'>
			{/* CỘT TRÁI: Danh sách hội thoại (Rộng 320px) */}
			<div className='w-90 flex flex-col border-r border-slate-200 bg-slate-50/30'>
				<div className='p-5 border-b border-slate-200'>
					<h2 className='text-xl font-bold text-slate-800'>Tin nhắn</h2>
					{/* TODO: Bạn có thể thêm ô Search Input ở đây */}
				</div>

				<ScrollArea className='flex-1'>
					<div className='p-3 space-y-1'>
						{safeConversations.map((conv: ChatConversation): JSX.Element => {
							const isSelected = conv.id === selectedConversationId;
							return (
								<div
									key={conv.id}
									onClick={(): void => handleSelectConversation(conv.id)}
									className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all ${
										isSelected
											? 'bg-orange-100/80 text-orange-950 shadow-sm'
											: 'hover:bg-slate-100 text-slate-700'
									}`}
								>
									<Avatar className='h-12 w-12 border border-white shadow-sm'>
										<AvatarImage src={conv.avatarUrl} />
										<AvatarFallback className='bg-orange-200 text-orange-700 font-bold'>
											{conv.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className='flex-1 min-w-0'>
										<div className='flex justify-between items-center mb-1'>
											<span className='text-sm font-semibold truncate'>
												{conv.name}
											</span>
											{/* Hiển thị giờ (Giả định) */}
											<span className='text-[10px] text-slate-400'>
												12:30
											</span>
										</div>
										<div className='w-50 text-xs text-slate-500 truncate'>
											{conv.lastMessage}
										</div>
									</div>
									{conv.unreadCount > 0 && (
										<span className='flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full'>
											{conv.unreadCount}
										</span>
									)}
								</div>
							);
						})}
					</div>
				</ScrollArea>
			</div>

			{/* CỘT PHẢI: Khung Chat Chi tiết */}
			<div className='flex-1 flex flex-col bg-[#F8FAFC] relative'>
				{/* Header của Khung Chat */}
				<div className='flex items-center justify-between p-4 bg-white border-b border-slate-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] z-10'>
					<div className='flex items-center gap-4'>
						<Avatar className='h-10 w-10'>
							<AvatarImage src={activeConversation?.avatarUrl} />
							<AvatarFallback>
								{activeConversation?.name.charAt(0) || '?'}
							</AvatarFallback>
						</Avatar>
						<div>
							<h3 className='text-base font-bold text-slate-800'>
								{activeConversation?.name || 'Chọn hội thoại'}
							</h3>
							<p className='text-xs text-emerald-600 font-medium'>Đang hoạt động</p>
						</div>
					</div>
				</div>

				{/* Khu vực hiển thị tin nhắn */}
				<ScrollArea className='flex-1 p-6'>
					<div className='space-y-4 max-w-4xl mx-auto'>
						{isLoading ? (
							<div className='flex justify-center py-10 text-sm text-slate-400'>
								Đang tải tin nhắn...
							</div>
						) : safeMessages.length === 0 ? (
							<div className='flex justify-center py-10 text-sm text-slate-400'>
								Chưa có tin nhắn nào. Bắt đầu cuộc trò chuyện!
							</div>
						) : (
							safeMessages.map(
								(msg: ChatMessage): JSX.Element => (
									<div
										key={msg.id}
										className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
									>
										<div
											className={`px-4 py-2.5 rounded-2xl text-sm max-w-[70%] shadow-sm ${
												msg.isMe
													? 'bg-orange-500 text-white rounded-br-sm'
													: 'bg-white text-slate-800 rounded-bl-sm border border-slate-100'
											}`}
										>
											{msg.text}
										</div>
									</div>
								),
							)
						)}
					</div>
				</ScrollArea>

				{/* Khung Nhập tin nhắn */}
				<div className='p-4 bg-white border-t border-slate-200'>
					<div className='flex gap-3 max-w-4xl mx-auto items-center'>
						<Input
							placeholder='Nhập tin nhắn...'
							className='h-12 rounded-full px-6 bg-slate-50 border-slate-200 focus-visible:ring-orange-500'
							value={inputText}
							onChange={handleInputChange}
							onKeyDown={(e): void => {
								if (e.key === 'Enter') handleSendMessage();
							}}
						/>
						<Button
							size='icon'
							onClick={handleSendMessage}
							className='h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600 cursor-pointer shadow-md'
						>
							<Send size={18} />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

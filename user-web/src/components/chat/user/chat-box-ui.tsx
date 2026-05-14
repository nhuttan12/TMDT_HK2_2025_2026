'use client';

import { JSX } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircleMore, Send, X } from 'lucide-react';
import { ChatLogicReturn } from '@/hooks/chats/user/use-chat-user-logic';
import { ChatConversation } from '@/types/chats/user/ChatConversation';
import { ChatMessage } from '@/types/chats/user/ChatMessage';

interface ChatBoxUiProps extends ChatLogicReturn {
	chatboxWidth: string;
	chatboxHeight: string;
	conversations: ChatConversation[];
	messages: ChatMessage[];
	isLoading: boolean;
}

export function ChatBoxUi({
	chatboxWidth,
	chatboxHeight,
	conversations,
	messages,
	isLoading,

	// Props từ Logic Hook
	isOpen,
	handleToggleOpen,
	selectedConversationId,
	handleSelectConversation,
	inputText,
	handleInputChange,
	handleSendMessage,
}: ChatBoxUiProps): JSX.Element {
	// Fallback an toàn dữ liệu
	const safeConversations = conversations || [];
	const safeMessages = messages || [];

	return (
		<div className='fixed bottom-6 right-6 z-50 flex flex-col items-end'>
			<AnimatePresence mode='wait'>
				{isOpen ? (
					<motion.div
						key='chatbox'
						initial={{ opacity: 0, y: 40, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 40, scale: 0.95 }}
						transition={{ type: 'spring', stiffness: 260, damping: 20 }}
						style={{ width: chatboxWidth, height: chatboxHeight }}
						className='relative origin-bottom-right'
					>
						<Card className='relative w-full h-full flex overflow-hidden shadow-2xl'>
							<Button
								variant='ghost'
								size='icon'
								className='absolute top-2 right-2 z-10 cursor-pointer'
								onClick={(): void => handleToggleOpen(false)}
							>
								<X size={16} />
							</Button>

							{/* LEFT SIDEBAR - Danh sách hội thoại */}
							<div className='w-48 flex flex-col shadow-sm border-r bg-gray-50/50'>
								<div className='p-3 font-semibold text-sm'>Trò chuyện</div>
								<Separator />
								<ScrollArea className='flex-1'>
									<div className='space-y-1 p-2'>
										{safeConversations.map(
											(conv: ChatConversation): JSX.Element => {
												const isSelected =
													conv.id === selectedConversationId;
												return (
													<div
														key={conv.id}
														onClick={(): void =>
															handleSelectConversation(conv.id)
														}
														className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
															isSelected
																? 'bg-orange-100 text-orange-900'
																: 'hover:bg-slate-100'
														}`}
													>
														<Avatar className='h-8 w-8'>
															<AvatarImage src={conv.avatarUrl} />
															<AvatarFallback>
																{conv.name.charAt(0)}
															</AvatarFallback>
														</Avatar>
														<div className='flex-1 min-w-0'>
															<div className='text-xs font-semibold truncate'>
																{conv.name}
															</div>
															<div className='text-[10px] text-gray-500 truncate'>
																{conv.lastMessage}
															</div>
														</div>
														{conv.unreadCount > 0 && (
															<span className='flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-medium'>
																{conv.unreadCount}
															</span>
														)}
													</div>
												);
											},
										)}
									</div>
								</ScrollArea>
							</div>

							{/* RIGHT CONTENT - Chi tiết tin nhắn */}
							<div className='flex-1 flex flex-col'>
								<div className='p-3 border-b font-medium text-sm shadow-[0_2px_3px_-2px_rgba(0,0,0,0.2)]'>
									{safeConversations.find((c) => c.id === selectedConversationId)
										?.name || 'Chọn hội thoại'}
								</div>

								<ScrollArea className='flex-1 p-4 bg-gray-50/30'>
									<div className='space-y-3'>
										{isLoading ? (
											<div className='text-center text-xs text-gray-400 mt-4'>
												Đang tải tin nhắn...
											</div>
										) : safeMessages.length === 0 ? (
											<div className='text-center text-xs text-gray-400 mt-4'>
												Chưa có tin nhắn nào. Bắt đầu trò chuyện!
											</div>
										) : (
											safeMessages.map(
												(msg: ChatMessage): JSX.Element => (
													<div
														key={msg.id}
														className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
													>
														<div
															className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${
																msg.isMe
																	? 'bg-orange-500 text-white rounded-br-none'
																	: 'bg-slate-100 text-gray-800 rounded-bl-none border border-gray-200'
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

								<div className='p-3 border-t flex gap-2 bg-white'>
									<Input
										placeholder='Nhập tin nhắn...'
										value={inputText}
										onChange={handleInputChange}
										onKeyDown={(e): void => {
											if (e.key === 'Enter') handleSendMessage();
										}}
									/>
									<Button
										size='icon'
										onClick={handleSendMessage}
										className='cursor-pointer'
									>
										<Send size={16} />
									</Button>
								</div>
							</div>
						</Card>
					</motion.div>
				) : (
					<motion.div
						key='button'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.2 }}
						className='absolute bottom-0 right-0 pointer-events-auto'
					>
						<Button
							onClick={(): void => handleToggleOpen(true)}
							className='h-14 w-14 rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200'
						>
							<MessageCircleMore size={24} />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

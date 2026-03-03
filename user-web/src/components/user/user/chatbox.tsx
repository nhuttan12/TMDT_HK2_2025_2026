'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, Send, X } from 'lucide-react';
import { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
	chatboxWidth?: string;
	chatboxHeight?: string;
}

export default function ChatBox({
	chatboxWidth = '500px',
	chatboxHeight = '600px',
}: Props): JSX.Element {
	const [open, setOpen] = useState(false);

	return (
		<div className={`fixed bottom-6 right-6 z-50 w-[${chatboxWidth}] h-[${chatboxHeight}]`}>
			{/* CHAT BOX */}
			<AnimatePresence>
				{open ? (
					<motion.div
						key='chatbox'
						initial={{ opacity: 0, y: 40, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 40, scale: 0.95 }}
						transition={{
							type: 'spring',
							stiffness: 260,
							damping: 20,
						}}
						className='absolute bottom-0 right-0 pointer-events-auto'
					>
						<Card
							className={`relative w-[${chatboxWidth}] h-[${chatboxHeight}] flex overflow-hidden shadow-2xl`}
						>
							{/* CLOSE BUTTON */}
							<Button
								variant='ghost'
								size='icon'
								className='absolute top-2 right-2 z-10 cursor-pointer'
								onClick={() => setOpen(false)}
							>
								<X size={16} />
							</Button>

							{/* LEFT SIDEBAR */}
							<div className='w-[180px] flex flex-col shadow-sm border-r'>
								<div className='p-3 font-semibold text-sm'>Chat</div>
								<Separator />

								<ScrollArea className='flex-1'>
									<div className='space-y-1 p-2'>
										{[1, 2, 3, 4, 5].map((item: number) => (
											<div
												key={item}
												className='flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer'
											>
												<Avatar className='h-8 w-8'>
													<AvatarFallback>U</AvatarFallback>
												</Avatar>
												<div className='text-xs truncate'>user_{item}</div>
											</div>
										))}
									</div>
								</ScrollArea>
							</div>

							{/* RIGHT CONTENT */}
							<div className='flex-1 flex flex-col'>
								<div className='p-3 border-b font-medium text-sm shadow-[0_2px_3px_-2px_rgba(0,0,0,0.2)]'>
									user_1
								</div>

								<ScrollArea className='flex-1 p-4'>
									<div className='space-y-3'>
										<div className='flex'>
											<div className='bg-slate-100 px-3 py-2 rounded-xl text-sm max-w-[70%]'>
												Chào bạn 👋
											</div>
										</div>

										<div className='flex justify-end'>
											<div className='bg-orange-500 text-white px-3 py-2 rounded-xl text-sm max-w-[70%]'>
												Shop còn hàng không?
											</div>
										</div>
									</div>
								</ScrollArea>

								<div className='p-3 border-t flex gap-2'>
									<Input placeholder='Nhập tin nhắn...' />
									<Button size='icon'>
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
							onClick={() => setOpen(true)}
							className='h-14 w-14 rounded-full shadow-lg'
						>
							<MessageCircle size={22} />
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

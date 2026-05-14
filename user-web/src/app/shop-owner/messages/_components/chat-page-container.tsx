'use client';

import { useChatPageLogic } from '@/hooks/chats/admin/use-chat-page-logic';
import { ChatConversation } from '@/types/chats/user/ChatConversation';
import { JSX } from 'react';
import { ChatPageUi } from './chat-page-ui';

interface ChatPageContainerProps {
	initialConversations: ChatConversation[];
}

export default function ChatPageContainer({
	initialConversations,
}: ChatPageContainerProps): JSX.Element {
	const logic = useChatPageLogic(initialConversations);

	return (
		<div className='max-w-7xl mx-auto'>
			<div className='w-full max-w-7xl mx-auto'>
				<ChatPageUi {...logic} />
			</div>
		</div>
	);
}

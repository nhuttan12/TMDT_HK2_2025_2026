export interface ChatConversation {
	id: string;
	name: string;
	avatarUrl?: string;
	lastMessage: string;
	unreadCount: number;
}

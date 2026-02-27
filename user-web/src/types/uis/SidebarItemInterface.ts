import React from 'react';

export interface SidebarItemInterface {
	title: string;
	href?: string;
	icon: React.ReactNode;
	children?: SidebarItemInterface[];
}

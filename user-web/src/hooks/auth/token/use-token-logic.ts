'use client';
import { useEffect } from 'react';
import {useAuthRefreshQuery} from "@/queries/auth/use-auth-refresh-query";
import { useRouter } from 'next/navigation';

export const useTokenLogic = () => {
	const { data, isLoading, isError } = useAuthRefreshQuery();
	const route = useRouter();
	useEffect((): void => {
		if (!data?.token) {
			console.log(data)
			//TODO: add logic refresh token
		}
		if(isError){
			route.push('/login');
		}


	}, [data, isError, route]);


	return {
		isLoading,
	};
};

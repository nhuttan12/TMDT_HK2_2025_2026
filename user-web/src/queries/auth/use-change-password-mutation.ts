'use client';

// src/queries/auth/use-profile-query.ts
import { authService } from '@/services/auth/authService';
import { ChangePasswordDTO } from '@/types/users/user/ChangePasswordDTO';
import { useMutation } from '@tanstack/react-query';
// giải
export const useChangePasswordMutation = () => {
	return useMutation({
		mutationFn: (payload: ChangePasswordDTO) => {
            return authService.changePassword(payload); 
        },
	});
};

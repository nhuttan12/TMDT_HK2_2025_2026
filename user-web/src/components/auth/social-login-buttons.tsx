'use client';

import { JSX } from 'react';
import { Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialLoginButtonsProps {
    onLoginClick?: (provider: 'google' | 'facebook') => void;
}

export default function SocialLoginButtons({
    onLoginClick,
}: SocialLoginButtonsProps): JSX.Element {
    const handleClick = (provider: 'google' | 'facebook') => {
        onLoginClick?.(provider);
        if (provider === 'google') {
           const googleAuthUrl = '/api/auth/google';
		   // TODO: add _login
        } else if (provider === 'facebook') {
            // window.location.href = '/api/auth/facebook';
            alert(`Login with ${provider} clicked!`);
        }
    };

    return (
        <div className='pt-2'>
            <div className='relative mb-4'>
                <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-slate-200'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                    <span className='bg-white px-2 text-slate-500'>hoặc</span>
                </div>
            </div>

            <div className='space-y-2'>
                <Button
                    type='button'
                    variant='outline'
                    className='
                        w-full gap-2 border-slate-200 text-slate-700
                        hover:bg-slate-50 active:scale-[0.98]
                        focus-visible:ring-2 focus-visible:ring-black/30
                    '
                    onClick={() => handleClick('google')}
                >
                    <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                            fill='#4285F4'
                        />
                        <path
                            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                            fill='#34A853'
                        />
                        <path
                            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                            fill='#FBBC05'
                        />
                        <path
                            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                            fill='#EA4335'
                        />
                    </svg>
                    Đăng nhập với Google
                </Button>

                <Button
                    type='button'
                    variant='outline'
                    className='
                        w-full gap-2 border-slate-200 text-slate-700
                        hover:bg-slate-50 active:scale-[0.98]
                        focus-visible:ring-2 focus-visible:ring-black/30
                    '
                    onClick={() => handleClick('facebook')}
                >
                    <Facebook
                        size={18}
                        fill='#1877F2'
                        color='#1877F2'
                    />
                    Đăng nhập với Facebook
                </Button>
            </div>
        </div>
    );
}
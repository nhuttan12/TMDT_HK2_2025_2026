'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation'; // Sử dụng hook điều hướng chuẩn của App Router
import { Button } from '@/components/ui/button';

export default function NotFound(): JSX.Element {
    const router = useRouter();

    const handleGoHome = (): void => {
        router.push('/');
    };

    const handleGoBack = (): void => {
        // Thay thế window.history.back() bằng hàm back của Next.js để tận dụng Router Cache
        router.back(); 
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center text-center px-4'>
            <h1 className='text-7xl font-bold mb-4'>404</h1>

            <p className='text-xl text-muted-foreground mb-2'>Trang bạn tìm không tồn tại</p>

            <p className='text-muted-foreground/70 mb-8'>
                Có thể link sai hoặc nội dung đã bị xoá.
            </p>

            <div className='flex gap-4 pt-6'>
                {/* Bỏ asChild và <Link>, thay bằng onClick gọi trực tiếp router 
                */}
                <Button
                    className='text-white!'
                    onClick={handleGoHome}
                >
                    Về trang chủ
                </Button>

                <Button
                    variant='outline'
                    onClick={handleGoBack}
                >
                    Quay lại
                </Button>
            </div>
        </div>
    );
}
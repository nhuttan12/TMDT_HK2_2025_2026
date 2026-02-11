'use client';

import {JSX} from 'react';
import {Spinner} from '@/components/ui/spinner';

export default function GlobalLoading(): JSX.Element {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
                <Spinner className="size-8 text-black"/>
                <p className="text-sm text-slate-500">Đang tải dữ liệu...</p>
            </div>
        </div>
    );
}
import { Loader2 } from "lucide-react";
import React from 'react';

export function AuthHandlerUi(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground font-medium">
        Đang xử lý xác thực...
      </p>
    </div>
  );
}
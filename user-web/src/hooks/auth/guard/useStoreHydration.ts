import { useState, useEffect } from 'react';

export function useStoreHydration(): boolean {
    const [hydrated, setHydrated] = useState<boolean>(false);

    useEffect((): void => {
        setHydrated(true);
    }, []);

    return hydrated;
}
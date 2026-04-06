import {useState} from "react";

interface UseConfirmDeleteReturn<T> {
    selectedItem: T | null;
    isOpen: boolean;
    openConfirm: (item: T) => void;
    closeConfirm: () => void;
}

export default function useConfirmDelete<T>(): UseConfirmDeleteReturn<T> {
    const [selectedItem, setSelectedItem] = useState<T | null>(null);

    function openConfirm(item: T): void {
        setSelectedItem(item);
    }

    function closeConfirm(): void {
        setSelectedItem(null);
    }

    const isOpen: boolean = selectedItem !== null;

    return {
        selectedItem,
        isOpen,
        openConfirm,
        closeConfirm,
    };
}
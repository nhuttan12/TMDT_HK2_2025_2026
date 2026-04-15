import { create } from "zustand";

interface UserInfo{
    username: string,
    setInfo:(name: string)  => void;
}

export const userUserInfoStore  = create<UserInfo>((set)=>({
    username: "",
    setInfo: (name: string) => {
        set({ username: name });
    },
}))
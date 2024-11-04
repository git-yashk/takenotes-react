import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';

export interface TokenType {
    token: string;
    setToken: (data: string) => void;
}

const useTokenStore = create<TokenType>()(
    devtools(
        persist((set) => ({
            token: "",
            setToken: (token: string) => set({ token }),
        }), { name: "accessToken" })
    )
);

export default useTokenStore;
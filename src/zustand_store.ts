import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware';

const useTokenStore = create(
    devtools(
        persist((set) => ({
            token: "",
            setToken: (token: string) => set({ token }),
        }), { name: "accessToken" })
    )
);

export default useTokenStore;
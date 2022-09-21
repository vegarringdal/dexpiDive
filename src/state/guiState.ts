import create from "zustand";

type State = {
    isLoading: boolean;
    setLoading: (status: boolean) => void;
    setSelected: (selected: any | null) => void;
    selected: any | null;
    darktheme: boolean;
};

export const guiState = create<State>((set) => ({
    darktheme: true,
    isLoading: false,
    selected: null,
    setLoading: (status: boolean) => {
        set(() => {
            return { isLoading: status };
        });
    },
    setSelected: (selected: any | null) => {
        set(() => {
            return { selected };
        });
    }
}));

import { atom } from "jotai";

export const menuAtom = atom<boolean>(false);
export const deviceAtom = atom<"mobile" | "tablet" | "pc">("pc")

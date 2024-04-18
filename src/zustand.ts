import { create } from "zustand";
import { Message } from "./App";

interface MessageState {
  messages: Message[];
  receiverId: string;
  senderId: string;
  setSenderId(senderId: string): void;
  setReceiverId(receiverId: string): void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
}

export const useMessageStore = create<MessageState>()((set) => ({
  messages: [] as Message[],
  receiverId: "",
  senderId: "",
  setSenderId: (senderId: string) => set({ senderId }),
  setReceiverId: (receiverId: string) => set({ receiverId }),

  addMessage: (message: Message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setMessages: (messages: Message[]) => set(() => ({ messages })),
}));

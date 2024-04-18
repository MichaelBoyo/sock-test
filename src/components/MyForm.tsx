import { useState } from "react";
import { socket } from "../socket";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMessageStore } from "@/zustand";
import { Message } from "@/App";

export function MyForm() {
  const [content, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage, senderId, receiverId } = useMessageStore();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const data: Message = { content, senderId, receiverId };
    addMessage(data);

    socket.timeout(100).emit("message", data, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <Input onChange={(e) => setValue(e.target.value)} />
      <Button type="submit" disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
}

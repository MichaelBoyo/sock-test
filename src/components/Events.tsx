import { useMessageStore } from "@/zustand";

export function Events() {
  const { messages } = useMessageStore();
  return (
    <div>
      {messages?.map((event, index) => (
        <pre key={index}>{JSON.stringify(event, null, 2)}</pre>
      ))}
    </div>
  );
}

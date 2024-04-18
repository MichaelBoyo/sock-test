import { useState, useEffect } from "react";
import { baseUrl, socket } from "./socket";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";
import { ProfileForm } from "./components/Form";
import { Button } from "./components/ui/button";
import { useMessageStore } from "./zustand";
export type Message = {
  receiverId: string;
  senderId: string;
  content: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
};

export default function App() {
  const { addMessage, receiverId, senderId, setMessages, setReceiverId } =
    useMessageStore();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const initData = async () => {
      const res = await fetch(`${baseUrl}/api/v1/user/chat/users-details`);
      if (res.ok) {
        const data = await res.json();
        console.log("data", data);
        setUsers(data);
      }

      const res2 = await fetch(
        `${baseUrl}/api/v1/chat/messages?receiverId=${receiverId}&senderId=${senderId}`
      );
      if (res2.ok) {
        const data2 = await res2.json();
        console.log("data2", data2);
        setMessages(data2.data);
      }
    };

    initData();
  }, [receiverId, senderId, setMessages]);

  // });

  useEffect(() => {
    function onFooEvent(message: Message) {
      addMessage(message);
    }

    socket.on(`message:${senderId}`, onFooEvent);

    return () => {
      socket.off(`message:${senderId}`, onFooEvent);
    };
  }, [senderId, addMessage]);

  return (
    <div className="p-20">
      <ProfileForm />
      <div className="border flex">
        <div>
          {users &&
            users.map((user, index) => (
              <pre className="border rounded p-2 m-2" key={index}>
                {JSON.stringify(user, null, 2)}
                <Button onClick={() => setReceiverId(user.id)}>use</Button>
              </pre>
            ))}
        </div>
        <div className="border-2 p-2 m-2 rounded.lg">
          <p>Chat</p>
          <MyForm />
          <Events />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { IMessage } from "../models";
import ChatMessage from "./ChatMessage";
import {
  getAuth,
} from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../App";


const ChatRoom = () => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(25));
    const [messages] = useCollectionData(q, { idField: "id" } as DocumentData);
    const [value, setValue] = useState("");
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const user = getAuth().currentUser;
      if (user !== null) {
        const { uid, photoURL } = user;
  
        await addDoc(messagesRef, {
          text: value,
          uid,
          photoURL,
          createdAt: serverTimestamp(),
        });
  
        setValue("");
      }
    };
    return (
      <>
        {messages && messages?.map((m) => <ChatMessage msg={m as IMessage} key={m.id} />)}
        <form onSubmit={handleSubmit} className="fixed bottom-0 flex w-2/4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="type your message..."
            className="bg-[#3a3a3a] text-white outline-none w-full py-4 px-2"
          />
  
          <button type="submit" className="bg-[#38388f] text-white px-2">
            Submit
          </button>
        </form>
      </>
    );
  };
export default ChatRoom  
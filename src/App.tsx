import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import React, { useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
const db = getFirestore(initializeApp(firebaseConfig));

const ChatRoom = () => {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" } as any);
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
      {messages && messages?.map((m) => <ChatMessage msg={m} key={m.id} />)}
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

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={signInWithGoogle}
        className="bg-white text-[#282c34] p-3"
      >
        Sign In with Google
      </button>
    </div>
  );
};

const SignOut = () => {
  return (
    getAuth().currentUser && (
      <button
        onClick={() => signOut(auth)}
        className="bg-[#282c34] text-white p-3"
      >
        Sign Out
      </button>
    )
  );
};

const ChatMessage = ({ msg }: any) => {
  const { text, photoURL } = msg;
  return (
    <div className="px-2 flex mb-6 items-center gap-3">
      <img src={photoURL} className="rounded-full w-16 h-16" />
      <p className="text-white">{text}</p>
    </div>
  );
};

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="bg-[#282c34]">
      <div className="w-2/4 mx-auto">
        <header className="py-3 px-2 h-16 bg-black fixed top-0 w-2/4 text-white flex justify-between items-center">
          <h1 className="text-2xl">🚀👾🗯️</h1>
          <SignOut />
        </header>
        <section className="bg-[#282533] min-h-screen pt-20 pb-10">
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </div>
    </div>
  );
}

export default App;

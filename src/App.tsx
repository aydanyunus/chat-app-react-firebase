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
  const messageRef = collection(db, "messages");
  const q = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages] = useCollectionData(q, { idField: "id" } as any);
  const [value, setValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getAuth().currentUser;
    if (user !== null) {
      const { uid, photoURL } = user;

      await addDoc(messageRef, {
        text: value,
        uid,
        photoURL,
        createdAt: serverTimestamp()
      });

      setValue('')
    }
  };
  return (
    <>
      {messages && messages?.map((m) => <ChatMessage msg={m} key={m.id} />)}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type here..."
        />

        <button type="submit">submit</button>
      </form>
    </>
  );
};

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Sign In with Google</button>;
};

const SignOut = () => {
  return (
    getAuth().currentUser && (
      <button onClick={() => signOut(auth)}>sign out</button>
    )
  );
};

const ChatMessage = ({msg}: any) => {
  const { text, photoURL } = msg;
  return (
    <div>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
};

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <header>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </>
  );
}

export default App;

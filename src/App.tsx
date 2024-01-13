import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import SignOut from "./components/SignOut";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";

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
export const db = getFirestore(initializeApp(firebaseConfig));

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

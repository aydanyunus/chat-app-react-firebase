import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase.config";


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

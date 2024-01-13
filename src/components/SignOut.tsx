import {
  getAuth,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase.config";

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

export default SignOut;

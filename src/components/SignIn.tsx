import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase.config";

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

export default SignIn;

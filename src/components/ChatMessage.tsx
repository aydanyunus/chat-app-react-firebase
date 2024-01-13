import { IMessage } from "../models";

const ChatMessage = ({ msg }: { msg: IMessage }) => {
  const { text, photoURL } = msg;
  return (
    <div className="px-2 flex mb-6 items-center gap-3">
      <img src={photoURL} className="rounded-full w-16 h-16" />
      <p className="text-white">{text}</p>
    </div>
  );
};

export default ChatMessage;
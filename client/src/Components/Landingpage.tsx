import { useState } from "react";
import { useSocketContext } from "../Context/Socketcontext";
import Labelledinput from "./Labelledinput";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Landing = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState<string>("");
  const [roomId, setroomId] = useState<string>("");
  const [username, setusername] = useState<string>("");

  const { socket } = useSocketContext();

  const handleclick = () => {
    if (email.trim()=="" || roomId.trim()=="" || username.trim()==""){
      toast.error("Credentials cannot be empty.")
      return 
    }
    socket?.emit("join-room", {
      emailId: email,
      roomId: roomId,
      username: username,
    });
   
      socket?.on("approved-joining",({roomId})=>{
         toast.success(`Joined room ${roomId}`)
        navigate(`/room?room=${roomId}`);
      })
     
  };
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Labelledinput
          label="Email"
          placeholder="Enter Email"
          setvalue={setemail}
        ></Labelledinput>
        <Labelledinput
          label="RoomId"
          placeholder="Enter roomId"
          setvalue={setroomId}
        ></Labelledinput>
        <Labelledinput
          label="Username"
          placeholder="Enter username"
          setvalue={setusername}
        ></Labelledinput>
        <button
          onClick={handleclick}
          className="bg-cyan-500 py-2 px-4 text-white rounded-xl"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Landing;

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import ChatCard from "./ChatCard";
import { db } from "../../firebase";
import { addDoc, collection, query, serverTimestamp, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const Sidebar = ({
   user, setProfileBar
}) => {
  const [createChatPopup, setCreateChatPopup] = useState(false);
  const [email, setEmail] = useState("");
  const chatsRef = collection(db, "chats");
  const q = query( chatsRef, where("users", "array-contains", user.email) );
  const [chatSnapshots] = useCollection(q);
  const createChat = async () => {
    
    if ( email !== user.email && !checkChat() ) {
       const docRef = await addDoc(collection(db, "chats"), {
         users: [user?.email, email],
         createdAt: serverTimestamp(),
       });
    }
  };
  const checkChat = () =>( !!chatSnapshots?.docs?.find((chat) => chat?.data()?.users?.find((u) => u === email)?.length > 0) );


  return (
    <div className="lg:w-[600px] w-screen h-screen fixed lg:sticky top-0 left-0 bg-[#fff] lg:z-[999] -z-[1]">
      <div className="flex items-center w-full justify-between py-5 px-10">
        <Link href={"/"}>
          <button className="text-2xl font-bold">Whatsapp Clone</button>
        </Link>
        <button className="text-3xl" onClick={()=>{setCreateChatPopup(true)}}>
          <RiEditBoxLine />
        </button>
      </div>
      <div className="flex items-center px-10 space-x-2 text-gray-400">
        <AiOutlineSearch className="text-3xl" />
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full text-lg text-gray-600"
        />
        {/* <AiOutlineClose /> */}
        <p className="bg-[#ff96ee] text-black text-xs px-3 py-1 rounded-md cursor-pointer" onClick={()=>{setProfileBar(true)}}>
          profile
        </p>
      </div>
      <div className="w-full h-[83vh] overflow-y-auto space-y-5 px-10 mt-5">
        {
          chatSnapshots?.docs?.map((chat)=>{
            return (
              <ChatCard key={chat?.id} chat={chat} user={user} />
            )
          })
        }
      </div>
      <div className={createChatPopup ? "absolute top-0 w-screen bg-[#45454541] backdrop-blur-md h-screen left-0 flex justify-center items-center" : "absolute top-0 w-screen hidden overflow-hidden bg-[#45454541] backdrop-blur-md h-screen left-0 justify-center items-center"}>
        <div className="text-center space-y-3 bg-white p-10 rounded-md shadow-md">
          <h1 className="text-3xl font-bold">Enter Your Friends <span className="text-[#ff78e8]">Email</span></h1>
          <input type="email" placeholder="example@example.com" className=" border outline-none rounded-md w-[340px] mx-auto px-4 py-2" onChange={(e)=>{setEmail(e.target.value)}}
          value={email} required />
          <div>
            <button type="submit" className="px-4 py-2 border hover:bg-[#78ffa5] w-[340px] block  border-[#78ffa5] rounded-md m-3 uppercase font-semibold" onClick={createChat}>Create Chat</button>
            <button className="px-4 py-2 border hover:bg-[#ff6565] w-[340px] block  border-[#ff6565] rounded-md m-3 uppercase font-semibold" onClick={()=>{setCreateChatPopup(false)}}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

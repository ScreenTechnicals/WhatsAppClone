"use client";

import React, { useState } from "react";
// import { FaRegUser } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSend, IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, provider } from "../../../firebase";
import Image from "next/image";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  useCollection,
} from "react-firebase-hooks/firestore";
import { ImSpinner2 } from "react-icons/im";

const Page = ({ params }) => {
  const cid = params.id;
  const [user, loading] = useAuthState(auth, provider);
  console.log(cid);
  const chatsRef = collection(db, "chats");
  const q = query(chatsRef, where("users", "array-contains", user.email));
  const [chatSnapshots, loadingChat] = useCollection(q);
  const chat = chatSnapshots?.docs
    ?.filter((chat) => chat?.id === cid)?.[0]
    ?.data();
  const reciversEmail = chat?.users?.filter((usr) => usr !== user?.email)?.[0];

  const usersRef = collection(db, "users");
  const [userSnapshots] = useCollection(usersRef);
  console.log();
  console.log(reciversEmail);
  const reciver = userSnapshots?.docs
    ?.filter((usr) => usr?.data()?.email === reciversEmail)?.[0]
    ?.data();

  const newDate = new Date(reciver?.lastSeen?.seconds * 1000);
  const date = newDate?.toDateString();
  const time = newDate?.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const [message, setMessage] = useState("");

  const createMessage = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "messages"), {
      cid: cid,
      email: user?.email,
      message: message,
      createdAt: serverTimestamp(),
    });
    setMessage("");
  };

  const messagesRef = collection(db, "messages");
  const q3 = query(messagesRef, orderBy("createdAt"));
  const [messageSnapshots, loading2] = useCollection(q3);
  const allMessages = messageSnapshots?.docs?.filter(
    (msg) => msg?.data()?.cid === cid
  );

  return (
    <div className="w-full">
        {
          !loadingChat ? (
            <div className="lg:w-full w-screen lg:bg-transparent bg-white">
      <div className="w-full flex items-center bg-white space-x-4 justify-between p-7">
        <div className="flex items-center space-x-5">
          <Link href={"/"}>
            <button className="text-3xl">
              <IoMdArrowRoundBack />
            </button>
          </Link>
          {/* <FaRegUser className="text-3xl" /> */}
          <Image
            src={reciver?.photoURL}
            alt="profile"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">{reciver?.name}</h1>
            <div className="flex items-center space-x-1 relative left-1">
              {reciver?.online ? (
                <div className="w-2 h-2 rounded-full bg-green-600 relative top-[2px]"></div>
              ) : (
                ""
              )}
              <span className="text-sm">
                {reciver?.online ? "online" : `${time} on ${date}`}
              </span>
            </div>
          </div>
        </div>
        <div>
          <button className="text-3xl">
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>
      <div className="py-5 lg:px-16 px-4 h-[75vh] overflow-y-auto">
        {!loading2
          ? allMessages?.map((msg) => {
              console.log(msg?.data()?.email == user?.email);
              const time = new Date(
                msg?.data()?.createdAt * 1000
              )?.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });
              return (
                <div key={msg?.id} className={msg?.data()?.email === user?.email ? "w-full flex justify-end" : "w-full flex"}>
                  <div className="max-w-[400px] border bg-[#ffffff] rounded-xl shadow-md p-5 m-5">
                    <p>{msg?.data()?.message}</p>
                    <p className="text-end text-gray-400">{time}</p>
                  </div>
                </div>
              );
            })
          : 
          (
            <div className="w-full h-[70vh] flex justify-center items-center">
              <ImSpinner2 className="text-6xl animate-spin text-[#000000]" />
            </div>
          )
          }
      </div>
      <div className="w-full lg:px-20 px-5">
        <form
          onSubmit={createMessage}
          className="w-full relative flex  items-center"
        >
          <input
            type="text"
            placeholder="Message"
            className="border outline-none  w-full px-4 py-3 rounded-xl"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            required
          />
          <button className="absolute right-3 text-2xl">
            <IoMdSend />
          </button>
        </form>
      </div>
    </div>
          ):
          (
            <div className="w-full h-screen overflow-hidden bg-[#f1f1f1] flex justify-center items-center">
              <ImSpinner2 className="text-6xl animate-spin text-[#000000]" />
            </div>
          )
        }
    </div>
  );
};

export default Page;

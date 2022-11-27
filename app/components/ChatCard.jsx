import { collection, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { db } from "../../firebase";

const ChatCard = ({ chat, user }) => {
  console.log();
  const reciversEmail = chat
    ?.data()
    ?.users?.filter((u) => u !== user?.email)?.[0];
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", reciversEmail));
  const [userSnapshots] = useCollection(q);
  console.log();
  return (
    <Link href={`/chats/${chat?.id}`}>
    <div className="w-full flex rounded-xl justify-between border shadow-md px-5 py-3 items-center space-x-7 relative cursor-pointer hover:scale-95 transition-transform">
      <div className="mr-5">
        {/* <FaRegUser className="text-2xl" /> */}
        <Image
          src={userSnapshots?.docs?.[0]?.data()?.photoURL}
          alt="profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        {/* <div className=""></div> */}
      </div>
      <div className="relative right-14">
        <span>{userSnapshots?.docs?.[0]?.data()?.name}</span>
      </div>
      <div className="">
        {userSnapshots?.docs?.[0]?.data()?.online && <HiOutlineStatusOnline className="text-[#00c303] text-3xl animate-pulse" />}
        
      </div>
    </div>
    </Link>
  );
};

export default ChatCard;

"use client";

import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../firebase";

const Login = () => {
  const createUser = async () => {
    await signInWithPopup(auth, provider);
  };
  return (
    <html lang="en">
      <head />
      <body>
        <div className="w-screen h-screen flex justify-center items-center">
          <div>
            <div className="flex items-center p-5">
              <Image
                src={"/images/logo.png"}
                width={120}
                height={120}
                quality={100}
                priority={true}
                alt="logo"
              />
              <p className="text-6xl font-bold">Whatsapp Clone</p>
            </div>
            <div className="mx-auto text-center">
              <button
                className="px-5 py-2 bg-[#fff] rounded-md border shadow-md flex text-2xl mx-auto items-center uppercase font-semibold space-x-2"
                onClick={createUser}
              >
                <FcGoogle className="text-3xl" />
                <span>Sign In With Google</span>
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Login;

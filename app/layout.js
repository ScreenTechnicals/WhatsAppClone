"use client";

import "./globals.css";
import Sidebar from "./components/Sidebar";
import { auth, db, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Login";
import Preloader from "./components/Preloader";
import Profilebar from "./components/Profilebar";
import { useState, useEffect } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function RootLayout({ children }) {
  const [user, loading] = useAuthState(auth, provider);
  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "Do you want to leave?";
      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      if (user) {
        setDoc(
          doc(db, "users", user.uid),
          {
            email: user.email,
            photoURL: user.photoURL,
            name: user.providerData[0].displayName,
            lastSeen: serverTimestamp(),
            online: false,
          },
          { merge: true }
        );
      }
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          photoURL: user.photoURL,
          name: user.providerData[0].displayName,
          lastSeen: serverTimestamp(),
          online: true,
        },
        { merge: true }
      );
    }
  });
  const [profileBar, setProfileBar] = useState(false);
  if (loading) return <Preloader />;
  if (!user) return <Login />;

  return (
    <html lang="en">
      <head />
      <body className="w-screen overflow-hidden flex">
        <Sidebar user={user} setProfileBar={setProfileBar} />
        <div className="w-full">{children}</div>
        <Profilebar profileBar={profileBar} setProfileBar={setProfileBar} />
      </body>
    </html>
  );
}

"use client";

import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Preloader = () => {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="w-screen h-screen flex justify-center items-center">
            <ImSpinner2 className="text-6xl animate-spin text-[#e44eff]" />
        </div>
      </body>
    </html>
  );
};

export default Preloader;

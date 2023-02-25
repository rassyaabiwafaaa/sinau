import Image from "next/image";
import React from "react";
import { TransparentLogo } from "public/images";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

function Navigation() {
  const router = useRouter();

  function logoutHandler() {
    deleteCookie("token");
    deleteCookie("username");
    router.push("/");
    alert("Logout Successfully");
  }

  return (
    <div className="flex justify-between items-center px-20 py-3 bg-primary text-[#1DAFAF]">
      <div className="flex items-center gap-2">
        <Image src={TransparentLogo} alt="logo" className="w-[150px]"></Image>
      </div>

      <div className="text-xl font-normal">
        <h2 onClick={logoutHandler} className="font-medium cursor-pointer">
          Logout
        </h2>
      </div>
    </div>
  );
}

export default Navigation;

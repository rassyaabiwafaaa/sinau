import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { TransparentLogo } from "public/images";
import { useState } from "react";
import { setCookie } from "cookies-next";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();

  const router = useRouter();

  function gotoRegister() {
    router.push("/register");
  }

  function onLoginHandler(e) {
    e.preventDefault();
    axios
      .post("http://159.223.57.121:8090/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setToken(res.data);
        console.log(res.data.data.token);
        setCookie("token", res.data.data.token);
        setCookie("username", res.data.data.username);

        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Head>
        <title>Sinau</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-center items-center flex-wrap">
        <div className="mt-[50px] lg:mt-0 w-[250px] lg:w-[500px]">
          <Image src={TransparentLogo} className="w-[400px] block" alt="Logo on register page" />
        </div>

        <div>
          <div className="w- max-w-xs my-10 md:my-[200px]">
            <div>
              <h1 className="font-medium text-[32px] md:text-[48px] text-primary text-center">Login</h1>
            </div>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-black transition-all ease-in-out" type="button" onClick={onLoginHandler}>
                  Login
                </button>
                <button className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-black transition-all ease-in-out" type="button" onClick={gotoRegister}>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

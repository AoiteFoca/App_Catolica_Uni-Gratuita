// pages/login.js

import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-[70%] flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <img
            src="https://www.catolicasc.org.br/wp-content/uploads/importacao/sites/3/2019/10/LOGOS-FINAL-16-308x176.jpg"
            alt="Illustration"
          />
        </div>
      </div>
      <div className="w-[30%] flex justify-center items-center bg-white">
        <div className="flex flex-col items-center p-10 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-black">Bem Vindo!</h2>
          <p className="text-sm text-black text-left  ">
            Por favor insira seus credencias!
          </p>
          <form className="w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  className="h-5 text-gray-700"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12H9m2 2h2m1-10h-4m4 6h2m4 2h-4m4 6H3m0-6h4m2 2h2m4-2H7m2-2H7m0-4h10"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825a10.05 10.05 0 0 1-3.75 0m-4.794-1.391a10.017 10.017 0 0 1-1.805-1.196M6.24 12a10.05 10.05 0 0 1 0-3.751m2.378-2.372a10.05 10.05 0 0 1 2.377-1.805M12 4.675a10.05 10.05 0 0 1 3.75 0m4.793 1.392a10.017 10.017 0 0 1 1.805 1.195M17.76 12a10.05 10.05 0 0 1 0 3.75m-2.378 2.373a10.05 10.05 0 0 1-2.376 1.805M12 19.325a10.05 10.05 0 0 1-3.75 0"
                    />
                  )}
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => router.push("/home")}
              >
                Entrar
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Esqueceu a senha?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

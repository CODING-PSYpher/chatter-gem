"use client";

import { signIn } from "next-auth/react";
import GoogleLogo from "../icons/googleIcon";

export default function SignInPage() {
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/chat" }); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Sign in to Your Account
        </h1>
        <p className="text-gray-500">Use your Google account to continue</p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          <GoogleLogo/>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

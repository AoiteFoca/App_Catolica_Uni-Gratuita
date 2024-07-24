// pages/index.js

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-3xl font-bold">Home Page</h1>
        <Link href="/login">
          <a className="text-blue-500">Go to Login</a>
        </Link>
      </div>
    </div>
  );
}

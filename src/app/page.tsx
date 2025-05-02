'use client';
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <h1>Login with Google</h1>
      <button onClick={() => signIn("google")}>Login</button>
    </div>
  );
}

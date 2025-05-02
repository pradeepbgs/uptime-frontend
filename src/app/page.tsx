'use client';

import { Button } from "@/components/ui/button";
import { authCheck } from "@/service/api";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.idToken && session?.googleId) {
      axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/google`,
        {
          access_token: session.idToken,
          google_id: session.googleId,
        },
        {
          withCredentials: true,
        }
      ).catch(err => {
        console.error("Backend error:", err);
      });
    }
  }, [session]);

  useEffect(() => {
    authCheck()
  }, [])
  return (
    <>
      <div className="bg-[#131a26] text-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            {/* The world’s leading <br /> */}
            <span className="text-indigo-500">uptime monitoring</span> service
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-8">
            Monitor your websites, APIs, and services with real-time alerts, analytics, and 24/7 uptime tracking.
          </p>
          <Button
          onClick={() => router.push('/dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-xl cursor-pointer">
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
}

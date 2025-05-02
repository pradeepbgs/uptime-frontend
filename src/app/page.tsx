'use client';

import { Button } from "@/components/ui/button";
import { useAuthStatus } from "@/service/api";
// import { useEffect } from "react";

export default function Home() {
  useAuthStatus()

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
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-6 py-3 rounded-xl cursor-pointer">
          Get Started
        </Button>
      </div>
    </div>
    </>
  );
}

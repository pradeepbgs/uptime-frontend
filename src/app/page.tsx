'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const handlePushToDashBoard = () => {
    if (!session) return router.push("/login")
    router.push("/dashboard")
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">

          <div className="inline-block border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50 mb-8 tracking-widest uppercase">
            Uptime Monitoring
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
            Keep your services{" "}
            <span className="text-white">online.</span>
          </h1>

          <p className="text-lg text-white/50 mb-10 max-w-md mx-auto leading-relaxed">
            Monitor websites, APIs, and services with real-time alerts. Know before your users do.
          </p>

          <Button
            onClick={handlePushToDashBoard}
            className="bg-white text-black hover:bg-white/90 text-base px-8 py-3 rounded-lg font-medium cursor-pointer transition-all duration-200"
          >
            Get Started
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

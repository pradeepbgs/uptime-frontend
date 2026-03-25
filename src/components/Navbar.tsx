'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session }: any = useSession()
  const accessToken = useMemo(() => session?.accessToken as string, [session])

  const handleLogin = () => {
    signIn('google');
  };

  return (
    <nav className="px-6 py-4 bg-black border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-bold text-white tracking-tight">
            uptime-bot
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
            onClick={() => {
              if (!accessToken) {
                window.location.href = '/login'
              }
            }}
          >
            Dashboard
          </Link>
        </div>

        <div>
          {accessToken ? (
            <Button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg text-sm cursor-pointer transition-all duration-200"
            >
              Logout
            </Button>
          ) : (
            <Button
              className="bg-white text-black hover:bg-white/90 cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              variant="outline"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

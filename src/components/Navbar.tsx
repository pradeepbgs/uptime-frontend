'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const {data: session} :any = useSession()
  const accessToken = useMemo(() => session?.accessToken as string, [session])
  const handleLogin = () => {
    signIn('google');
  };

  return (
    <div>
      <nav className="p-4 md:p-5 bg-[#131a26] text-white shadow-lg">
        <div className="mx-auto flex flex-row md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-2xl font-bold text-indigo-500 hover:text-indigo-300 transition-all duration-200">
              uptime-bot
            </Link>
            <Link href="/dashboard" className="text-xl text-white hover:text-indigo-300 transition-all duration-200">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">

            {accessToken ? (
              <>
                <Button
                  onClick={() => signOut({callbackUrl:'/'})}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200 cursor-pointer px-4 py-2 rounded-xl transition duration-300"
                  variant="outline"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

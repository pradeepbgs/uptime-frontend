'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

const Navbar = () => {
  const handleLogin = () => {
    signIn('google');
  };

  const signOut = () => {
    localStorage.removeItem('session');
    window.location.href = '/sign-in';
  };

  const session = ''

  return (
    <div>
      <nav className="p-4 md:p-5 bg-[#131a26] text-white shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-2xl font-bold text-indigo-500 hover:text-indigo-300 transition-all duration-200">
              uptime-bot
            </Link>
            <Link href="/dashboard" className="text-xl text-white hover:text-indigo-300 transition-all duration-200">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {session ? (
              <>
                <Button
                  onClick={signOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition duration-300"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full md:w-auto bg-slate-100 text-black hover:bg-slate-200 cursor-pointer px-5 py-2 rounded-xl transition duration-300"
                  variant="outline"
                  onClick={handleLogin}
                >
                  Login with Google
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

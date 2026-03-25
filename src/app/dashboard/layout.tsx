'use client';

import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';
import { IoMdMenu, IoMdClose } from 'react-icons/io';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white relative">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-4 focus:outline-none z-50 absolute top-2 left-2 text-white/60 hover:text-white transition-colors"
      >
        {sidebarOpen ? <IoMdClose size={22} /> : <IoMdMenu size={22} />}
      </button>

      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0
        `}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}

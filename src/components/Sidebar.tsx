'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `block px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
      pathname === href
        ? 'bg-white text-black font-medium'
        : 'text-white/50 hover:text-white hover:bg-white/10'
    }`;

  return (
    <aside className="w-64 h-full bg-[#0a0a0a] border-r border-white/10 p-5 flex flex-col">
      <Link href="/" className="text-base font-bold text-white tracking-tight mb-8 block">
        uptime-bot
      </Link>
      <nav className="space-y-1">
        <p className="text-xs text-white/25 uppercase tracking-widest px-3 mb-2">Navigation</p>
        <Link href="/dashboard" className={linkClass('/dashboard')}>
          Dashboard
        </Link>
        <Link href="/dashboard/create" className={linkClass('/dashboard/create')}>
          Create Task
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

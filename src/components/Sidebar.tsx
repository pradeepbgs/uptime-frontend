'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `block px-4 py-2 rounded hover:bg-indigo-700 ${pathname === href ? 'bg-indigo-600' : ''}`;

  return (
    <aside className="w-64 bg-[#1e293b] p-4">
      <Link href='/' className="text-xl font-bold">Uptime</Link>
      <nav className="space-y-2 mt-5">
        <Link href="/dashboard" className={linkClass('/dashboard')}>
          Home
        </Link>
        <Link href="/dashboard/create" className={linkClass('/dashboard/create')}>
          Create Task
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;

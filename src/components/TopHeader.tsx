import { FC } from "react";


export const Header: FC = () => (
  <header className="flex items-center justify-between px-8 py-4 border-b bg-white sticky top-0 z-50 shadow-sm">
    <h1 className="text-2xl font-bold text-blue-800"><a href="/">BreakBroker</a></h1>
    <nav className="flex gap-6 text-gray-700">
      <a href="/about" className="hover:text-blue-600">About</a>
      <a href="/login" className="hover:text-blue-600">Sign In</a>
    </nav>
  </header>
);

// app/components/Header.tsx
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void; // Function to toggle sidebar
  toggleMenu: () => void; // Function to toggle mobile menu
}

export default function Header({ toggleSidebar, toggleMenu }: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-green-800 p-4 text-white md:px-6">
      <div className="flex items-center">
        {/* Desktop Menu Button */}
        <button className="mr-4 hidden md:block" onClick={toggleSidebar}>
          <Menu />
        </button>
        <div className="text-xl font-bold">a Board</div>
      </div>
      <div className="md:hidden">
        {/* Mobile Menu Icon */}
        <button className="text-white" onClick={toggleMenu}>
          <Menu />
        </button>
      </div>
      <div className="hidden md:block">
        {/* Desktop Sign In Button */}
        <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
          Sign In
        </button>
      </div>
    </header>
  );
}

import { Menu } from "lucide-react";
import { useSidebarState } from "@/components/blog/useSidebarState";

export default function Header() {
  const { toggleSidebar } = useSidebarState(); // Access toggleSidebar function

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between bg-green-800 p-4 text-white md:px-6">
      <div className="flex items-center">
        {/* Desktop Menu Button */}
        <button className="mr-4 hidden md:block" onClick={toggleSidebar}>
          <Menu />
        </button>
        <div className="text-xl font-bold">a Board</div>
      </div>
    </header>
  );
}

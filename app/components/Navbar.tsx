import Link from "next/link";
import { DesktopNav } from "./DesktopNav";
import MobileNav from "./MobileNav";
import JobBoardLogo from "./Logo";

function Navbar() {
  return (
    <nav className="flex justify-between items-center max-w-7xl mx-auto shadow-sm p-4">
      <Link
        href="/"
        className="text-2xl font-bold text-indigo-600 cursor-pointer"
      >
        <JobBoardLogo />
      </Link>
      <div className="justify-between items-center hidden sm:flex">
        <DesktopNav />
      </div>
      <div className="sm:hidden">
        <MobileNav />
      </div>
    </nav>
  );
}

export default Navbar;

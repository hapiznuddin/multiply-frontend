import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-10">
      <div className="w-full max-w-7xl mx-auto py-4 flex px-8 justify-between items-center">
        <Image src="/logo.png" alt="logo" width={120} height={100} />
        <div className="flex gap-4">
          <Link href="/login">
            <Button
              size="lg"
              variant="ghost"
              className="font-bold text-lg text-white hover:text-white hover:bg-accent/30"
            >
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="defaultHome" className="font-bold text-lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

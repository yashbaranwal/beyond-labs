"use client";

import Link from "next/link";
import Image from "next/image";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { id: 1, name: "Marketplace", href: "/marketplace" },
  { id: 2, name: "My websites", href: "/my-websites" },
  { id: 3, name: "My Orders", href: "/my-orders" },
  { id: 4, name: "My projects", href: "/my-projects" },
  { id: 5, name: "Received orders", href: "/recieved-orders" }
];

interface NavLinkProps{
  href: string;
  name: string;
}

const NavLink = ({ href, name }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`font-medium whitespace-nowrap border-b-2 p-4 ${
        isActive
          ? "border-primary bg-primary/7 text-primary"
          : "border-transparent text-foreground hover:text-primary"
      }`}
    >
      {name}
    </Link>
  );
};

// Desktop Navigation
const DesktopNav = () => (
  <nav className="hidden lg:inline-flex items-center">
    {navLinks.map((link) => (
      <NavLink key={link.id} href={link.href} name={link.name} />
    ))}
  </nav>
);

// Mobile Navigation
const MobileNav = () => (
  <Sheet>
    <SheetTrigger className="ml-auto">
      <MenuIcon className="lg:hidden" />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetDescription>
          <nav className="flex flex-col mt-8">
            {navLinks.map((link) => (
              <NavLink key={link.id} href={link.href} name={link.name} />
            ))}
          </nav>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);

const RightIcons = () => (
  <div className="hidden lg:inline-flex w-4/12 items-center justify-end gap-6">
    <Image src="/wallet.svg" alt="Wallet" width={20} height={20} />
    <Image src="/box.svg" alt="Box" width={20} height={20} />
    <Image src="/user.svg" alt="User" width={20} height={20} />
    <Image src="/pentagon.svg" alt="Pentagon" width={20} height={20} />
  </div>
);

const Header = () => {
  return (
    <header className="flex items-center px-6 border-b bg-secondary sticky top-0 z-20">
      <div className="flex items-center justify-between w-8/12">
        <Image
          src="/logo.svg"
          alt="Kraken"
          width={151}
          height={58}
          className="-ml-4 xl:ml-2"
          priority
        />
        <DesktopNav />
      </div>

      <RightIcons />
      <MobileNav />
    </header>
  );
};

export default Header;
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { MenuIcon, X } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { id: 1, name: "Marketplace", href: "/marketplace" },
  { id: 2, name: "My websites", href: "/my-websites" },
  { id: 3, name: "My Orders", href: "/my-orders" },
  { id: 4, name: "My projects", href: "/my-projects" },
  { id: 5, name: "Recieved orders", href: "/recieved-orders" },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center px-6 border-b bg-secondary sticky top-0 z-[999]">
      <div className="flex items-center justify-between w-8/12">
        <Image
          src="/logo.svg"
          alt="Kraken"
          width={151}
          height={58}
          className="-ml-4 xl:ml-2"
          priority
        />

        <nav className="hidden lg:inline-flex items-center">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`font-medium whitespace-nowrap border-b-2 p-4 ${
                  isActive
                    ? "border-primary bg-primary/7 text-primary"
                    : "border-transparent text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="hidden lg:inline-flex w-4/12 items-center justify-end gap-6">
        <Image src="/wallet.svg" alt="Wallet" width={20} height={20} />
        <Image src="/box.svg" alt="Box" width={20} height={20} />
        <Image src="/user.svg" alt="User" width={20} height={20} />
        <Image src="/pentagon.svg" alt="Pentagon" width={20} height={20} />
      </div>
      <Button
        size={"icon"}
        className="lg:hidden ml-auto"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X /> : <MenuIcon />}
      </Button>
    </header>
  );
};

export default Header;

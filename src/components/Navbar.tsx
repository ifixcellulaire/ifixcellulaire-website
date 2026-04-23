import { useState } from "react";
import { Menu, X } from "lucide-react";
import StripeBar from "./StripeBar";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo-lfix.png";

const links = [
  { label: "SERVICES", href: "#services" },
  { label: "GALLERY", href: "#gallery" },
  { label: "REVIEWS", href: "#reviews" },

  { label: "CONTACT", href: "#booking" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top stripe accent */}
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <StripeBar />
      </div>
      <header className="fixed top-[6px] left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-20">
          <a href="/" className="flex items-center">
            <img
              src={logoImg}
              alt="L-FIX Cellulaire"
              className="h-[70px] w-auto object-cover"
            />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors tracking-widest"
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="bg-destructive hover:bg-destructive/90 text-destructive-foreground uppercase font-bold tracking-wider text-xs px-6">
              <a href="#booking">BOOK A REPAIR</a>
            </Button>
          </nav>
          <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <nav className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block text-xs font-bold text-muted-foreground uppercase tracking-widest"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <Button asChild className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground uppercase font-bold tracking-wider text-xs">
              <a href="#booking" onClick={() => setOpen(false)}>BOOK A REPAIR</a>
            </Button>
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;

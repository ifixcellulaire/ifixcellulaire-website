import { Smartphone } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => (
  <a href="/" className={`flex items-center gap-2 ${className}`}>
    <Smartphone className="h-7 w-7 text-primary" strokeWidth={1.5} />
    <span className="text-xl tracking-tight">
      <span className="font-light text-foreground">i</span>
      <span className="font-bold text-primary">Fix</span>
      <span className="font-light text-foreground">Cellulaire</span>
    </span>
  </a>
);

export default Logo;

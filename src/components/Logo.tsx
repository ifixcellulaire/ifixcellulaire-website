const Logo = ({ className = "" }: { className?: string }) => (
  <a href="/" className={`flex items-center ${className}`} style={{ mixBlendMode: 'screen' }}>
    <span className="text-xl tracking-tight">
      <span className="font-light text-foreground">i</span>
      <span className="font-bold text-primary">Fix</span>
      <span className="font-light text-foreground">Cellulaire</span>
    </span>
  </a>
);

export default Logo;

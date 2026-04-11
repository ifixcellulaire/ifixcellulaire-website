import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-[hsl(0,0%,2%)] text-foreground pt-0">
    {/* Top stripe */}
    <div className="h-[3px] stripe-bar" />
    <div className="container py-16">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <a href="/" className="flex items-center">
            <span className="text-xl tracking-tight">
              <span className="font-light text-foreground">i</span>
              <span className="font-bold text-primary">Fix</span>
              <span className="font-light text-foreground">Cellulaire</span>
            </span>
          </a>
          <p className="text-sm text-muted-foreground font-body">
            Montreal's trusted phone and tablet repair experts. Quality repairs, fair prices, and fast turnaround.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-black text-xs uppercase tracking-[0.2em]">CONTACT</h3>
          <div className="space-y-3 text-sm text-muted-foreground font-body">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              <span>1234 Rue Sainte-Catherine O, Montreal, QC H3G 1P1</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+15145550123" className="hover:text-primary transition-colors">(514) 555-0123</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:info@ifixcellulaire.ca" className="hover:text-primary transition-colors">info@ifixcellulaire.ca</a>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-black text-xs uppercase tracking-[0.2em]">HOURS</h3>
          <div className="space-y-2 text-sm text-muted-foreground font-body">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <div>
                <p>Mon–Fri: 9:00 AM – 6:00 PM</p>
                <p>Saturday: 10:00 AM – 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-12 pt-8 text-center text-[10px] text-muted-foreground uppercase tracking-widest">
        © {new Date().getFullYear()} iFixCellulaire. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

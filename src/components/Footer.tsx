import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoImg from "@/assets/logo-lfix.png";

const Footer = () => (
  <footer className="relative section-alt text-foreground pt-0">
    <div id="contact" className="absolute -top-24" />
    {/* Top stripe */}
    <div className="h-[3px] stripe-bar" />
    <div className="container py-16">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <a href="/" className="flex items-center">
            <img src={logoImg} alt="L-FIX Cellulaire" className="h-12 w-auto" />
          </a>
          <p className="text-sm text-muted-foreground font-body">
            Montreal's trusted phone and tablet repair experts. Quality repairs, fair prices, and fast turnaround.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-xs uppercase tracking-[0.2em]">CONTACT</h3>
          <div className="space-y-3 text-sm text-muted-foreground font-body">

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+15149844178" className="hover:text-primary transition-colors">514 984 4178</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:ifixcellulaire@gmail.com" className="hover:text-primary transition-colors">ifixcellulaire@gmail.com</a>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-xs uppercase tracking-[0.2em]">HOURS</h3>
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

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-background py-16">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <Logo className="[&_span]:text-background [&_svg]:text-primary" />
          <p className="text-sm opacity-70">
            Montreal's trusted phone and tablet repair experts. Quality repairs, fair prices, and fast turnaround.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Contact</h3>
          <div className="space-y-3 text-sm opacity-70">
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
          <h3 className="font-semibold text-lg">Hours</h3>
          <div className="space-y-2 text-sm opacity-70">
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
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-xs opacity-50">
        © {new Date().getFullYear()} iFixCellulaire. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

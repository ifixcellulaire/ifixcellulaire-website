import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";

const products = [
  { name: "iPhone 13 — Refurbished", condition: "Grade A", price: "$499", category: "Phone" },
  { name: "Samsung S22 — Refurbished", condition: "Grade A+", price: "$449", category: "Phone" },
  { name: "iPad Air 4 — Refurbished", condition: "Grade B+", price: "$379", category: "Tablet" },
  { name: "Tempered Glass Screen Protector", condition: "New", price: "$15", category: "Accessory" },
  { name: "MagSafe Wireless Charger", condition: "New", price: "$29", category: "Accessory" },
  { name: "iPhone 14 Battery Case", condition: "New", price: "$39", category: "Accessory" },
];

const MarketplaceSection = () => (
  <section id="marketplace" className="py-20">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">SHOP</p>
        <h2 className="text-3xl md:text-4xl font-black uppercase">MARKETPLACE</h2>
        <p className="text-muted-foreground mt-2 font-body">Quality refurbished devices and accessories</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.name} className="bg-card rounded-lg border border-border overflow-hidden group hover:border-primary/30 transition-all">
            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="text-[10px] uppercase tracking-wider font-bold bg-secondary text-secondary-foreground border-0">{p.category}</Badge>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">{p.condition}</Badge>
              </div>
              <h3 className="font-black text-sm uppercase mb-1">{p.name}</h3>
              <p className="text-lg font-black text-primary">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MarketplaceSection;

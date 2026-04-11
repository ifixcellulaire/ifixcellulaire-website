import { Star } from "lucide-react";

const reviews = [
  { name: "SOPHIE L.", source: "Google", text: "Amazing service! My iPhone screen was replaced in 30 minutes. Looks brand new. Highly recommend!", rating: 5 },
  { name: "MARC D.", source: "Facebook", text: "Best repair shop in Montreal. Fair prices and they really know what they're doing. My phone works perfectly now.", rating: 5 },
  { name: "AISHA K.", source: "Google", text: "They saved my water-damaged phone when two other shops said it was dead. Incredible work!", rating: 5 },
  { name: "JEAN-PIERRE B.", source: "Google", text: "Fast, professional, and affordable. The corporate plan is a game-changer for our office.", rating: 5 },
  { name: "EMMA R.", source: "Facebook", text: "Friendly staff, clean shop, and my battery lasts all day now. Will definitely come back!", rating: 5 },
  { name: "DAVID T.", source: "Google", text: "Dropped my tablet and they had it fixed same day. Great communication throughout. 10/10.", rating: 5 },
];

const ReviewsSection = () => (
  <section id="reviews" className="py-20 section-alt">
    <div className="container">
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">TRUSTED BY THOUSANDS</p>
        <h2 className="text-3xl md:text-4xl font-black uppercase">CUSTOMER REVIEWS</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground font-body">
            <Star className="h-4 w-4 fill-primary text-primary" /> 4.9/5 on Google (320+ reviews)
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground font-body">
            <Star className="h-4 w-4 fill-primary text-primary" /> 4.8/5 on Facebook
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="bg-card rounded-lg p-6 border border-border border-t-2 border-t-destructive">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-4 font-body">"{r.text}"</p>
            <div className="flex items-center justify-between">
              <p className="text-xs font-black tracking-wider">{r.name}</p>
              <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">{r.source}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;

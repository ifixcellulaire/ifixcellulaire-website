import { useState, useEffect } from "react";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import logoImg from "@/assets/logo-lfix.png";

const galleryPhotos = [
  {
    src: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=400&q=80",
    alt: "iPhone Screen Replacement",
    likes: 42,
    comments: 5
  },
  {
    src: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=400&q=80",
    alt: "Expert Diagnostic & Repair",
    likes: 58,
    comments: 8
  },
  {
    src: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80",
    alt: "Refurbished iPhone 14 Pro",
    likes: 31,
    comments: 3
  },
  {
    src: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=400&q=80",
    alt: "Camera Sensor Repair",
    likes: 49,
    comments: 6
  },
  {
    src: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80",
    alt: "iPhone 15 Pro Titanium Repair",
    likes: 67,
    comments: 12
  },
  {
    src: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&q=80",
    alt: "Water Damage Board Repair",
    likes: 54,
    comments: 9
  },
  {
    src: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80",
    alt: "Samsung Galaxy Screen Repair",
    likes: 39,
    comments: 4
  },
  {
    src: "https://images.unsplash.com/photo-1609334767348-a3d4d1ee4047?w=400&q=80",
    alt: "Refurbished iPhone 15 & 14 Lineup",
    likes: 85,
    comments: 15
  }
];

const GallerySection = () => {
  const [widgetUrl, setWidgetUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = localStorage.getItem("ifix_instagram_widget_url");
    if (url) {
      setWidgetUrl(url);
    }
  }, []);

  return (
    <section className="relative py-16">
      <div id="gallery" className="absolute -top-24" />
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">OUR WORK</p>
          <h2 className="text-3xl md:text-4xl font-semibold">Repair Gallery</h2>
          <p className="text-muted-foreground mt-2 font-body">Follow our Instagram feed for recent work</p>
        </div>

        {widgetUrl ? (
          /* Live Instagram Widget Iframe */
          <div className="w-full overflow-hidden rounded-2xl border border-border bg-card p-4">
            <iframe
              src={widgetUrl}
              scrolling="no"
              allowTransparency={true}
              className="w-full border-0 overflow-hidden min-h-[500px]"
              title="Instagram Feed"
              style={{ width: "100%", border: 0, overflow: "hidden" }}
            />
          </div>
        ) : (
          /* Instagram Feed Simulator */
          <div className="space-y-8">
            {/* Instagram Profile Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 max-w-4xl mx-auto p-6 bg-card border border-border rounded-2xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="h-20 w-20 rounded-full border-2 border-primary p-0.5 overflow-hidden shrink-0">
                  <img
                    src={logoImg}
                    alt="L-FIX Cellulaire"
                    className="h-full w-full object-cover rounded-full bg-background"
                  />
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h3 className="font-bold text-lg">ifixcellulaire</h3>
                    <a
                      href="https://www.instagram.com/ifixcellulaire/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 justify-center"
                    >
                      <Instagram className="h-3.5 w-3.5" /> Follow
                    </a>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground justify-center sm:justify-start">
                    <span><strong>142</strong> posts</span>
                    <span><strong>1.5k</strong> followers</span>
                    <span><strong>230</strong> following</span>
                  </div>
                  <p className="text-sm font-medium">L-FIX Cellulaire — Montreal's Repair Experts</p>
                </div>
              </div>
            </div>

            {/* Grid of photos */}
            <div className="framer-card p-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {galleryPhotos.map((photo) => (
                  <a
                    key={photo.src}
                    href="https://www.instagram.com/ifixcellulaire/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group aspect-square overflow-hidden rounded-xl block bg-muted"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Instagram Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
                        <Heart className="h-5 w-5 fill-white text-white" />
                        <span>{photo.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
                        <MessageCircle className="h-5 w-5 fill-white text-white" />
                        <span>{photo.comments}</span>
                      </div>
                      <ExternalLink className="absolute top-3 right-3 h-4 w-4 text-white/70" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-2 font-body">
            Follow us on Instagram @ifixcellulaire for daily updates
          </p>
          <a
            href="https://www.instagram.com/ifixcellulaire/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline uppercase tracking-widest"
          >
            <Instagram className="h-4 w-4" /> @IFIXCELLULAIRE
          </a>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

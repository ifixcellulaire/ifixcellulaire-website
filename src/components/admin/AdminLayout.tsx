import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, CalendarCheck, Wrench, Users, Package, ShoppingBag } from "lucide-react";
import AdminDashboard from "./AdminDashboard";
import AdminBookings from "./AdminBookings";
import AdminRepairs from "./AdminRepairs";
import AdminClients from "./AdminClients";
import AdminInventory from "./AdminInventory";
import AdminMarketplace from "./AdminMarketplace";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "bookings", label: "Bookings", icon: CalendarCheck },
  { key: "repairs", label: "Repairs", icon: Wrench },
  { key: "clients", label: "Clients", icon: Users },
  { key: "inventory", label: "Inventory", icon: Package },
  { key: "marketplace", label: "Marketplace", icon: ShoppingBag },
];

const AdminLayout = ({ onLogout }: { onLogout: () => void }) => {
  const [active, setActive] = useState("dashboard");

  const renderPage = () => {
    switch (active) {
      case "bookings": return <AdminBookings />;
      case "repairs": return <AdminRepairs />;
      case "clients": return <AdminClients />;
      case "inventory": return <AdminInventory />;
      case "marketplace": return <AdminMarketplace />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r flex flex-col">
        <div className="p-4 border-b font-bold text-lg">
          <span className="text-primary">iFix</span>Cellulaire
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                active === item.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b bg-card flex items-center justify-between px-6">
          <h1 className="font-semibold">iFixCellulaire Admin</h1>
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </header>
        <main className="flex-1 p-6 overflow-auto">{renderPage()}</main>
      </div>
    </div>
  );
};

export default AdminLayout;

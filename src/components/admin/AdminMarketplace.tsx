import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { toast } from "sonner";

const listingStatuses = ["available", "reserved", "sold"];
const statusStyles: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  reserved: "bg-amber-100 text-amber-800",
  sold: "bg-muted text-muted-foreground",
};

const AdminMarketplace = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    try {
      const data = await dbAdapter.getMarketplaceListings();
      setListings(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load listings");
    }
  };

  useEffect(() => { load(); }, []);

  const toggleStatus = async (id: string, current: string) => {
    const idx = listingStatuses.indexOf(current);
    const next = listingStatuses[(idx + 1) % listingStatuses.length];
    try {
      await dbAdapter.updateMarketplaceListingStatus(id, next);
      load();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: fd.get("title") as string,
      category: fd.get("category") as string,
      condition: fd.get("condition") as string,
      price: parseFloat(fd.get("price") as string) || 0,
      status: "available",
    };
    try {
      await dbAdapter.addMarketplaceListing(payload);
      toast.success("Listing added");
      setOpen(false);
      load();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add listing");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Marketplace</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Listing</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Listing</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2"><Label>Title</Label><Input name="title" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Category</Label><Input name="category" /></div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select name="condition" defaultValue="good">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like_new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Price ($)</Label><Input name="price" type="number" step="0.01" required /></div>
              <Button type="submit" className="w-full">Save Listing</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((l: any) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.title}</TableCell>
                <TableCell>{l.category || "—"}</TableCell>
                <TableCell>{l.condition?.replace("_", " ")}</TableCell>
                <TableCell>${l.price?.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={`cursor-pointer ${statusStyles[l.status] || ""}`} onClick={() => toggleStatus(l.id, l.status)}>
                    {l.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {listings.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No listings found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminMarketplace;

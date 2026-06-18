import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Minus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const AdminInventory = () => {
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("inventory").select("*").order("name");
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const updateQty = async (id: string, delta: number) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(0, (item.quantity || 0) + delta);
    const { error } = await supabase.from("inventory").update({ quantity: newQty }).eq("id", id);
    if (error) { toast.error("Failed to update"); return; }
    load();
  };

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { error } = await supabase.from("inventory").insert({
      name: fd.get("name") as string,
      category: fd.get("category") as string,
      quantity: parseInt(fd.get("quantity") as string) || 0,
      unit_cost: parseFloat(fd.get("unit_cost") as string) || 0,
    });
    if (error) { toast.error("Failed to add item"); return; }
    toast.success("Item added");
    setOpen(false);
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inventory</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Inventory Item</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input name="name" required /></div>
              <div className="space-y-2"><Label>Category</Label><Input name="category" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Quantity</Label><Input name="quantity" type="number" defaultValue="0" /></div>
                <div className="space-y-2"><Label>Unit Cost ($)</Label><Input name="unit_cost" type="number" step="0.01" /></div>
              </div>
              <Button type="submit" className="w-full">Save Item</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i: any) => (
              <TableRow key={i.id} className={i.quantity <= 2 ? "bg-red-50" : ""}>
                <TableCell className="font-medium">{i.name}</TableCell>
                <TableCell>{i.category || "—"}</TableCell>
                <TableCell>{i.quantity}</TableCell>
                <TableCell>${i.unit_cost?.toFixed(2) ?? "0.00"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQty(i.id, -1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQty(i.id, 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No inventory items.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminInventory;

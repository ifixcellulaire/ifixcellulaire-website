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
import { format } from "date-fns";

const repairStatuses = ["in_progress", "complete", "warranty_claimed", "unrepairable"];
const statusStyles: Record<string, string> = {
  in_progress: "bg-blue-100 text-blue-800",
  complete: "bg-green-100 text-green-800",
  warranty_claimed: "bg-amber-100 text-amber-800",
  unrepairable: "bg-red-100 text-red-800",
};

const AdminRepairs = () => {
  const [repairs, setRepairs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState<any[]>([]);

  const load = async () => {
    try {
      const data = await dbAdapter.getRepairs();
      setRepairs(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load repairs");
    }
  };

  const loadClients = async () => {
    try {
      const data = await dbAdapter.getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); loadClients(); }, []);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      client_id: fd.get("client_id") as string,
      device_model: fd.get("device_model") as string,
      issue: fd.get("issue") as string,
      cost: parseFloat(fd.get("cost") as string) || 0,
      status: fd.get("status") as string || "in_progress",
      warranty_expires: fd.get("warranty_expires") as string || null,
    };
    try {
      await dbAdapter.createRepair(payload);
      toast.success("Repair added");
      setOpen(false);
      load();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add repair");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Repairs</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Repair</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Repair</DialogTitle></DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label>Client</Label>
                <Select name="client_id" required>
                  <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => <SelectItem key={c.id} value={c.id}>{c.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Device Model</Label><Input name="device_model" required /></div>
              <div className="space-y-2"><Label>Issue</Label><Input name="issue" required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Cost ($)</Label><Input name="cost" type="number" step="0.01" /></div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select name="status" defaultValue="in_progress">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {repairStatuses.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2"><Label>Warranty Expires</Label><Input name="warranty_expires" type="date" /></div>
              <Button type="submit" className="w-full">Save Repair</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Warranty Expires</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repairs.map((r: any) => (
              <TableRow key={r.id}>
                <TableCell>{r.created_at ? format(new Date(r.created_at), "yyyy-MM-dd") : "—"}</TableCell>
                <TableCell>{r.clients?.full_name}</TableCell>
                <TableCell>{r.device_model}</TableCell>
                <TableCell>{r.issue}</TableCell>
                <TableCell>${r.cost?.toFixed(2) ?? "0.00"}</TableCell>
                <TableCell>{r.warranty_expires || "—"}</TableCell>
                <TableCell>
                  <Badge className={statusStyles[r.status] || ""}>{r.status?.replace("_", " ")}</Badge>
                </TableCell>
              </TableRow>
            ))}
            {repairs.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No repairs found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminRepairs;

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { dbAdapter } from "@/lib/db";
import { format } from "date-fns";

const AdminClients = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [repairs, setRepairs] = useState<any[]>([]);

  const load = async () => {
    try {
      const data = await dbAdapter.getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openClient = async (client: any) => {
    setSelected(client);
    try {
      const data = await dbAdapter.getRepairsByClientId(client.id);
      setRepairs(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Clients</h2>
      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Total Repairs</TableHead>
              <TableHead>Last Repair</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((c: any) => {
              const repairDates = (c.repairs || []).map((r: any) => new Date(r.created_at)).sort((a: Date, b: Date) => b.getTime() - a.getTime());
              return (
                <TableRow key={c.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openClient(c)}>
                  <TableCell className="font-medium">{c.full_name}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.email || "—"}</TableCell>
                  <TableCell>{c.repairs?.length ?? 0}</TableCell>
                  <TableCell>{repairDates[0] ? format(repairDates[0], "yyyy-MM-dd") : "—"}</TableCell>
                </TableRow>
              );
            })}
            {clients.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No clients found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selected?.full_name} — Repair History</DialogTitle>
          </DialogHeader>
          {repairs.length === 0 ? (
            <p className="text-muted-foreground text-sm">No repairs for this client.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repairs.map((r: any) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.created_at ? format(new Date(r.created_at), "yyyy-MM-dd") : "—"}</TableCell>
                    <TableCell>{r.device_model}</TableCell>
                    <TableCell>{r.issue}</TableCell>
                    <TableCell>${r.cost?.toFixed(2) ?? "0.00"}</TableCell>
                    <TableCell><Badge variant="secondary">{r.status?.replace("_", " ")}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminClients;

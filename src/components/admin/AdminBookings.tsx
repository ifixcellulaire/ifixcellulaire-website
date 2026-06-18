import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { dbAdapter } from "@/lib/db";
import { toast } from "sonner";
import { format } from "date-fns";
import { Copy } from "lucide-react";

const statuses = ["pending", "confirmed", "completed", "cancelled"];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    try {
      const data = await dbAdapter.getBookings(filter);
      setBookings(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings");
    }
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const booking = bookings.find((b) => b.id === id);
      const updates: any = { status };

      if (status === "confirmed" && booking) {
        if (!booking.confirmed_date) {
          updates.confirmed_date = booking.preferred_date || "";
        }
        if (!booking.confirmed_time) {
          updates.confirmed_time = booking.preferred_time || "";
        }
      }

      await dbAdapter.updateBooking(id, updates);
      toast.success(`Status updated to ${status}`);
      load();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleUpdateConfirmed = async (id: string, confirmedDate: string, confirmedTime: string) => {
    try {
      await dbAdapter.updateBooking(id, {
        confirmed_date: confirmedDate,
        confirmed_time: confirmedTime,
      });
      toast.success("Appointment date/time updated");
      load();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update appointment details");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="bg-card border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requested At</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Preferred Appt</TableHead>
              <TableHead>Confirmed Appt</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((b: any) => (
              <TableRow key={b.id}>
                <TableCell className="text-xs text-muted-foreground">
                  {b.created_at ? format(new Date(b.created_at), "yyyy-MM-dd h:mm a") : "—"}
                </TableCell>
                <TableCell className="font-medium">{b.clients?.full_name}</TableCell>
                <TableCell>{b.clients?.phone}</TableCell>
                <TableCell>{b.device_model}</TableCell>
                <TableCell>{b.issue_type}</TableCell>
                <TableCell className="text-blue-600 dark:text-blue-400 font-semibold">
                  <div>{b.preferred_date || "—"}</div>
                  <div className="text-xs font-normal opacity-85">{b.preferred_time || "—"}</div>
                </TableCell>
                <TableCell className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                    <input
                      type="date"
                      value={b.confirmed_date || ""}
                      onChange={(e) => handleUpdateConfirmed(b.id, e.target.value, b.confirmed_time || "")}
                      className="bg-background border border-emerald-500/30 rounded px-2 py-1 text-xs focus:outline-none focus:border-emerald-500 text-foreground w-[125px]"
                    />
                    <Select
                      value={b.confirmed_time || "none"}
                      onValueChange={(v) => handleUpdateConfirmed(b.id, b.confirmed_date || "", v === "none" ? "" : v)}
                    >
                      <SelectTrigger className="w-[125px] h-[26px] py-1 px-2 text-xs border-emerald-500/30 text-foreground bg-background">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Select time</SelectItem>
                        {timeSlots.map((t) => {
                          const isPreferred = t === b.preferred_time;
                          return (
                            <SelectItem key={t} value={t} className={isPreferred ? "text-blue-600 font-bold dark:text-blue-400 bg-blue-500/5" : ""}>
                              {t} {isPreferred ? "★ (Preferred)" : ""}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {b.preferred_date && b.preferred_time && (b.confirmed_date !== b.preferred_date || b.confirmed_time !== b.preferred_time) && (
                      <button
                        onClick={() => handleUpdateConfirmed(b.id, b.preferred_date, b.preferred_time)}
                        title="Copy Preferred date & time"
                        className="p-1 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}>
                    <SelectTrigger className={`w-32 h-8 text-xs ${statusColor[b.status] || ""}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {bookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBookings;


import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Wrench, Users, AlertTriangle } from "lucide-react";
import { dbAdapter } from "@/lib/db";
import { format } from "date-fns";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ bookings: 0, repairs: 0, clients: 0, lowStock: 0 });
  const [todayBookings, setTodayBookings] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const today = format(new Date(), "yyyy-MM-dd");
      try {
        const res = await dbAdapter.getStats(today);
        setStats({
          bookings: res.bookings,
          repairs: res.repairs,
          clients: res.clients,
          lowStock: res.lowStock,
        });
        setTodayBookings(res.todayBookings);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const statCards = [
    { label: "Total Bookings", value: stats.bookings, icon: CalendarCheck, color: "text-primary" },
    { label: "Active Repairs", value: stats.repairs, icon: Wrench, color: "text-blue-500" },
    { label: "Total Clients", value: stats.clients, icon: Users, color: "text-green-500" },
    { label: "Low Stock Items", value: stats.lowStock, icon: AlertTriangle, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Pending Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {todayBookings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No pending bookings for today.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayBookings.map((b: any) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.preferred_time || "—"}</TableCell>
                    <TableCell>{b.clients?.full_name}</TableCell>
                    <TableCell>{b.clients?.phone}</TableCell>
                    <TableCell>{b.device_model}</TableCell>
                    <TableCell>{b.issue_type}</TableCell>
                    <TableCell><Badge variant="secondary">{b.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

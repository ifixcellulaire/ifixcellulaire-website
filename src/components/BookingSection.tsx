import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { dbAdapter } from "@/lib/db";

const issueTypes = [
  "Screen Replacement",
  "Battery Replacement",
  "Water Damage",
  "Camera Repair",
  "Charging Port",
  "Other",
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

const BookingSection = () => {
  const [date, setDate] = useState<Date>();
  const [issue, setIssue] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const fullName = (formData.get("name") as string).trim();
      const email = (formData.get("email") as string).trim();
      const phone = (formData.get("phone") as string).trim();
      const deviceModel = (formData.get("device") as string).trim();
      const description = (formData.get("description") as string)?.trim() || null;

      if (!fullName || !email || !phone || !deviceModel || !issue) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      console.log("=== BOOKING FORM SUBMISSION ===");
      console.log("Client data:", { fullName, email, phone });
      console.log("Booking data:", { deviceModel, issueType: issue, description, preferredDate: date ? format(date, "yyyy-MM-dd") : null, preferredTime: time || null });

      let client = await dbAdapter.getClientByPhone(phone);
      let clientId: string;

      if (!client) {
        console.log("No existing client found, creating new one...");
        const newClient = await dbAdapter.createClient({ full_name: fullName, phone, email });
        clientId = newClient.id;
      } else {
        clientId = client.id;
        console.log("Found existing client:", clientId);
      }

      const bookingPayload = {
        client_id: clientId,
        device_model: deviceModel,
        issue_type: issue,
        description,
        preferred_date: date ? format(date, "yyyy-MM-dd") : null,
        preferred_time: time || null,
        status: "pending",
      };
      console.log("Inserting booking:", bookingPayload);

      const newBooking = await dbAdapter.createBooking(bookingPayload);

      console.log("=== BOOKING SUCCESSFUL ===", newBooking);
      
      // Send background email notification
      fetch("/api/send-booking-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          deviceModel,
          issueType: issue,
          description,
          preferredDate: date ? format(date, "yyyy-MM-dd") : null,
          preferredTime: time || null,
        })
      }).catch((err) => {
        console.error("Failed to send booking notification email:", err);
      });

      setSubmitted(true);
      toast.success("Appointment requested! We'll confirm within the hour.");
    } catch (err: any) {
      console.error("=== BOOKING FAILED ===");
      console.error("Error code:", err?.code);
      console.error("Error message:", err?.message);
      console.error("Error details:", err?.details);
      console.error("Error hint:", err?.hint);
      console.error("Full error:", JSON.stringify(err, null, 2));
      toast.error("Something went wrong. Please call us directly at 514 984 4178.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="relative py-16 section-alt">
        <div id="booking" className="absolute -top-24" />
        <div className="container max-w-2xl text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-primary mx-auto" />
          <h2 className="text-3xl font-semibold">Appointment Requested!</h2>
          <p className="text-muted-foreground font-body">
            We'll confirm within the hour. Thank you for choosing iFixCellulaire.
          </p>
          <Button onClick={() => setSubmitted(false)} className="text-primary-foreground uppercase font-semibold tracking-wide">BOOK ANOTHER REPAIR</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 section-alt">
      <div id="booking" className="absolute -top-24" />
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">GET STARTED</p>
          <h2 className="text-3xl md:text-4xl font-semibold">Book a Repair</h2>
          <p className="text-muted-foreground mt-2 font-body">Fill out the form and we'll confirm your appointment.</p>
        </div>
        <form onSubmit={handleSubmit} className="framer-card p-6 md:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required maxLength={100} className="bg-input border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" required maxLength={100} className="bg-input border-border" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="(514) 555-0123" required maxLength={20} className="bg-input border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="device" className="text-xs font-semibold uppercase tracking-wider">Device Model</Label>
              <Input id="device" name="device" placeholder="iPhone 15 Pro" required maxLength={100} className="bg-input border-border" />
            </div>
          </div>
          <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider">Issue Type</Label>
              <Select value={issue} onValueChange={setIssue} required>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select issue" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider">Description</Label>
            <Textarea id="description" name="description" placeholder="Tell us more about the issue…" rows={3} maxLength={1000} className="bg-input border-border" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider">Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal bg-input border-border", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider">Preferred Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full text-primary-foreground uppercase font-semibold tracking-wide" disabled={loading}>
            {loading ? "SUBMITTING…" : "SUBMIT BOOKING"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;

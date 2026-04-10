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
import { supabase } from "@/lib/supabase";

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
      const phone = (formData.get("phone") as string).trim();
      const email = (formData.get("email") as string)?.trim() || null;
      const deviceModel = (formData.get("device") as string).trim();
      const description = (formData.get("description") as string)?.trim() || null;

      if (!fullName || !phone || !deviceModel || !issue) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      // 1. Check if client exists by phone number
      const { data: existingClients, error: lookupError } = await supabase
        .from("clients")
        .select("id")
        .eq("phone", phone)
        .limit(1);

      if (lookupError) throw lookupError;

      let clientId: string;

      if (existingClients && existingClients.length > 0) {
        clientId = existingClients[0].id;
      } else {
        // Create new client
        const { data: newClient, error: insertClientError } = await supabase
          .from("clients")
          .insert({ full_name: fullName, phone, email })
          .select("id")
          .single();

        if (insertClientError) throw insertClientError;
        clientId = newClient.id;
      }

      // 2. Insert booking
      const { error: bookingError } = await supabase.from("bookings").insert({
        client_id: clientId,
        device_model: deviceModel,
        issue_type: issue,
        description,
        preferred_date: date ? format(date, "yyyy-MM-dd") : null,
        preferred_time: time || null,
        status: "pending",
      });

      if (bookingError) throw bookingError;

      // 3. Success
      setSubmitted(true);
      toast.success("Appointment requested! We'll confirm within the hour.");
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Something went wrong. Please call us directly at (514) 555-0101.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 section-alt">
        <div className="container max-w-2xl text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-primary mx-auto" />
          <h2 className="text-3xl font-bold">Appointment Requested!</h2>
          <p className="text-muted-foreground">
            We'll confirm within the hour. Thank you for choosing iFixCellulaire.
          </p>
          <Button onClick={() => setSubmitted(false)}>Book Another Repair</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 section-alt">
      <div className="container max-w-2xl">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Get started</p>
          <h2 className="text-3xl md:text-4xl font-bold">Book a Repair</h2>
          <p className="text-muted-foreground mt-2">Fill out the form and we'll confirm your appointment.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border p-6 md:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="(514) 555-0123" required maxLength={20} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" maxLength={255} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="device">Device Model</Label>
              <Input id="device" name="device" placeholder="iPhone 15 Pro" required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label>Issue Type</Label>
              <Select value={issue} onValueChange={setIssue} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Tell us more about the issue…" rows={3} maxLength={1000} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
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
              <Label>Preferred Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
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
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Submitting…" : "Submit Booking"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;

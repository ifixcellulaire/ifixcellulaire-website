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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Placeholder — will connect to Supabase later
    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
    setSubmitted(true);
    toast.success("Booking submitted! We'll confirm shortly.");
  };

  if (submitted) {
    return (
      <section id="booking" className="py-20 section-alt">
        <div className="container max-w-2xl text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-primary mx-auto" />
          <h2 className="text-3xl font-bold">Booking Received!</h2>
          <p className="text-muted-foreground">
            We'll contact you shortly to confirm your appointment. Thank you for choosing iFixCellulaire.
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
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="device">Device Model</Label>
              <Input id="device" name="device" placeholder="iPhone 15 Pro" required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label>Issue Type</Label>
              <Select name="issue" required>
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
              <Select name="time">
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

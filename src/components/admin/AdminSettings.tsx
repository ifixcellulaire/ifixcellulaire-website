import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KeyRound, Lock, ShieldCheck, Instagram, Globe } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_ADMIN_PASSWORD = "ifix2024admin";
const PASSWORD_STORAGE_KEY = "ifix_admin_password";
const INSTAGRAM_WIDGET_KEY = "ifix_instagram_widget_url";

const AdminSettings = () => {
  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Instagram state
  const [instagramWidgetUrl, setInstagramWidgetUrl] = useState(
    localStorage.getItem(INSTAGRAM_WIDGET_KEY) || ""
  );

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);

    try {
      const savedPassword = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_ADMIN_PASSWORD;

      if (currentPassword !== savedPassword) {
        toast.error("The current password you entered is incorrect.");
        setPasswordLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        toast.error("New password must be at least 6 characters long.");
        setPasswordLoading(false);
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match.");
        setPasswordLoading(false);
        return;
      }

      localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword);
      toast.success("Admin password updated successfully!");
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleInstagramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(INSTAGRAM_WIDGET_KEY, instagramWidgetUrl.trim());
      toast.success("Instagram feed settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Instagram feed settings.");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your administrative preferences and integrations.
        </p>
      </div>

      {/* Instagram Integration Card */}
      <Card className="border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Instagram className="h-5 w-5 text-primary" />
            <CardTitle>Instagram Feed Integration</CardTitle>
          </div>
          <CardDescription>
            Connect your live Instagram photos to the home page Repair Gallery section.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleInstagramSubmit} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram Widget Embed URL</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="instagramUrl"
                  type="url"
                  placeholder="https://lightwidget.com/widgets/..."
                  value={instagramWidgetUrl}
                  onChange={(e) => setInstagramWidgetUrl(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                If left empty, the website will display a premium Instagram simulated grid linking directly to your profile page.
              </p>
            </div>
            <Button type="submit" className="w-full sm:w-auto px-6">
              Save Feed Settings
            </Button>
          </form>

          <div className="border-t pt-4 space-y-3">
            <h4 className="text-sm font-semibold">How to get a free Instagram Embed URL:</h4>
            <ol className="list-decimal list-inside text-xs text-muted-foreground space-y-2 leading-relaxed">
              <li>Go to a free widget provider like <a href="https://lightwidget.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">LightWidget.com</a> or <a href="https://elfsight.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">Elfsight.com</a>.</li>
              <li>Log in with your Instagram account: <span className="font-semibold text-foreground">@ifixcellulaire</span>.</li>
              <li>Configure your grid layout (we recommend 4 columns, 2 rows).</li>
              <li>Generate the embed code, copy <strong>only the URL</strong> inside the <code>src="..."</code> attribute of the iframe, and paste it above.</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Card */}
      <Card className="border border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            <CardTitle>Change Admin Password</CardTitle>
          </div>
          <CardDescription>
            Update the password used to access this administrative dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>

            <Button type="submit" disabled={passwordLoading} className="w-full sm:w-auto px-6">
              {passwordLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;

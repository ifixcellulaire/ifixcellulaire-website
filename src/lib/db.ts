import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  setDoc,
  limit
} from "firebase/firestore";

// Keys for LocalStorage fallback
const STORAGE_CLIENTS = "ifix_ls_clients";
const STORAGE_BOOKINGS = "ifix_ls_bookings";
const STORAGE_REPAIRS = "ifix_ls_repairs";
const STORAGE_INVENTORY = "ifix_ls_inventory";
const STORAGE_MARKETPLACE = "ifix_ls_marketplace";

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Seed data for LocalStorage fallback if empty
const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_CLIENTS)) {
    const clients = [
      { id: "c1", full_name: "John Doe", phone: "15145550123", email: "john@example.com", created_at: new Date().toISOString() },
      { id: "c2", full_name: "Sarah Connor", phone: "15145550999", email: "sarah@terminator.com", created_at: new Date().toISOString() }
    ];
    localStorage.setItem(STORAGE_CLIENTS, JSON.stringify(clients));
  }

  if (!localStorage.getItem(STORAGE_BOOKINGS)) {
    const bookings = [
      {
        id: "b1",
        client_id: "c1",
        device_model: "iPhone 13",
        issue_type: "screen",
        description: "Cracked screen glass",
        preferred_date: new Date().toISOString().split("T")[0],
        preferred_time: "10:30 AM",
        status: "pending",
        created_at: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_BOOKINGS, JSON.stringify(bookings));
  }

  if (!localStorage.getItem(STORAGE_REPAIRS)) {
    const repairs = [
      {
        id: "r1",
        client_id: "c1",
        device_model: "iPhone 13",
        issue: "Screen Replacement",
        cost: 149.99,
        status: "complete",
        warranty_expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        created_at: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_REPAIRS, JSON.stringify(repairs));
  }

  if (!localStorage.getItem(STORAGE_INVENTORY)) {
    const inventory = [
      { id: "i1", name: "iPhone 13 Screen OLED", category: "Screens", quantity: 5, unit_cost: 45.00 },
      { id: "i2", name: "iPhone 12 Battery", category: "Batteries", quantity: 8, unit_cost: 12.00 },
      { id: "i3", name: "USB-C Port Assembly", category: "Charging Ports", quantity: 1, unit_cost: 8.50 }
    ];
    localStorage.setItem(STORAGE_INVENTORY, JSON.stringify(inventory));
  }

  if (!localStorage.getItem(STORAGE_MARKETPLACE)) {
    const marketplace = [
      { id: "m1", title: "iPhone 13 — Refurbished", category: "Phone", condition: "Grade A", price: 499.00, status: "available", created_at: new Date().toISOString() },
      { id: "m2", title: "Samsung S22 — Refurbished", category: "Phone", condition: "Grade A+", price: 449.00, status: "available", created_at: new Date().toISOString() }
    ];
    localStorage.setItem(STORAGE_MARKETPLACE, JSON.stringify(marketplace));
  }
};

// Initialize LocalStorage if we are in Local mode
if (!isFirebaseConfigured) {
  initLocalStorage();
}

// -------------------------------------------------------------
// LOCALSTORAGE DATABASE IMPLEMENTATION
// -------------------------------------------------------------
const localDb = {
  async getClients() {
    const cls = JSON.parse(localStorage.getItem(STORAGE_CLIENTS) || "[]");
    const reps = JSON.parse(localStorage.getItem(STORAGE_REPAIRS) || "[]");
    
    // Map repairs onto clients to replicate Supabase subquery clients(*, repairs(id, created_at))
    return cls.map((c: any) => ({
      ...c,
      repairs: reps
        .filter((r: any) => r.client_id === c.id)
        .map((r: any) => ({ id: r.id, created_at: r.created_at }))
    }));
  },

  async getClientByPhone(phone: string) {
    const cls = JSON.parse(localStorage.getItem(STORAGE_CLIENTS) || "[]");
    const client = cls.find((c: any) => c.phone === phone);
    return client || null;
  },

  async createClient(clientData: { full_name: string; phone: string; email?: string }) {
    const cls = JSON.parse(localStorage.getItem(STORAGE_CLIENTS) || "[]");
    const newClient = {
      id: generateId(),
      full_name: clientData.full_name,
      phone: clientData.phone,
      email: clientData.email || "",
      created_at: new Date().toISOString()
    };
    cls.push(newClient);
    localStorage.setItem(STORAGE_CLIENTS, JSON.stringify(cls));
    return newClient;
  },

  async getBookings(statusFilter: string = "all") {
    const bks = JSON.parse(localStorage.getItem(STORAGE_BOOKINGS) || "[]");
    const cls = JSON.parse(localStorage.getItem(STORAGE_CLIENTS) || "[]");
    
    // Sort descending by created_at
    let filtered = bks.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (statusFilter !== "all") {
      filtered = filtered.filter((b: any) => b.status === statusFilter);
    }

    return filtered.map((b: any) => {
      const client = cls.find((c: any) => c.id === b.client_id) || { full_name: "Unknown Client", phone: "" };
      return {
        ...b,
        clients: {
          full_name: client.full_name,
          phone: client.phone
        }
      };
    });
  },

  async createBooking(bookingData: {
    client_id: string;
    device_model: string;
    issue_type: string;
    description: string | null;
    preferred_date: string | null;
    preferred_time: string | null;
    status: string;
  }) {
    const bks = JSON.parse(localStorage.getItem(STORAGE_BOOKINGS) || "[]");
    const newBooking = {
      id: generateId(),
      ...bookingData,
      created_at: new Date().toISOString()
    };
    bks.push(newBooking);
    localStorage.setItem(STORAGE_BOOKINGS, JSON.stringify(bks));
    return newBooking;
  },

  async updateBookingStatus(id: string, status: string) {
    const bks = JSON.parse(localStorage.getItem(STORAGE_BOOKINGS) || "[]");
    const idx = bks.findIndex((b: any) => b.id === id);
    if (idx === -1) throw new Error("Booking not found");
    bks[idx].status = status;
    localStorage.setItem(STORAGE_BOOKINGS, JSON.stringify(bks));
    return bks[idx];
  },

  async getRepairs() {
    const reps = JSON.parse(localStorage.getItem(STORAGE_REPAIRS) || "[]");
    const cls = JSON.parse(localStorage.getItem(STORAGE_CLIENTS) || "[]");
    
    const sorted = reps.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return sorted.map((r: any) => {
      const client = cls.find((c: any) => c.id === r.client_id) || { full_name: "Unknown Client" };
      return {
        ...r,
        clients: {
          full_name: client.full_name
        }
      };
    });
  },

  async getRepairsByClientId(clientId: string) {
    const reps = JSON.parse(localStorage.getItem(STORAGE_REPAIRS) || "[]");
    const filtered = reps.filter((r: any) => r.client_id === clientId);
    return filtered.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createRepair(repairData: {
    client_id: string;
    device_model: string;
    issue: string;
    cost: number;
    status: string;
    warranty_expires: string | null;
  }) {
    const reps = JSON.parse(localStorage.getItem(STORAGE_REPAIRS) || "[]");
    const newRepair = {
      id: generateId(),
      ...repairData,
      created_at: new Date().toISOString()
    };
    reps.push(newRepair);
    localStorage.setItem(STORAGE_REPAIRS, JSON.stringify(reps));
    return newRepair;
  },

  async getInventory() {
    const inv = JSON.parse(localStorage.getItem(STORAGE_INVENTORY) || "[]");
    return inv.sort((a: any, b: any) => a.name.localeCompare(b.name));
  },

  async updateInventoryQty(id: string, delta: number) {
    const inv = JSON.parse(localStorage.getItem(STORAGE_INVENTORY) || "[]");
    const idx = inv.findIndex((i: any) => i.id === id);
    if (idx === -1) throw new Error("Inventory item not found");
    inv[idx].quantity = Math.max(0, (inv[idx].quantity || 0) + delta);
    localStorage.setItem(STORAGE_INVENTORY, JSON.stringify(inv));
    return inv[idx];
  },

  async addInventoryItem(itemData: { name: string; category: string; quantity: number; unit_cost: number }) {
    const inv = JSON.parse(localStorage.getItem(STORAGE_INVENTORY) || "[]");
    const newItem = {
      id: generateId(),
      ...itemData
    };
    inv.push(newItem);
    localStorage.setItem(STORAGE_INVENTORY, JSON.stringify(inv));
    return newItem;
  },

  async getMarketplaceListings() {
    const mpl = JSON.parse(localStorage.getItem(STORAGE_MARKETPLACE) || "[]");
    return mpl.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async addMarketplaceListing(listingData: { title: string; category: string; condition: string; price: number; status: string }) {
    const mpl = JSON.parse(localStorage.getItem(STORAGE_MARKETPLACE) || "[]");
    const newListing = {
      id: generateId(),
      ...listingData,
      created_at: new Date().toISOString()
    };
    mpl.push(newListing);
    localStorage.setItem(STORAGE_MARKETPLACE, JSON.stringify(mpl));
    return newListing;
  },

  async updateMarketplaceListingStatus(id: string, status: string) {
    const mpl = JSON.parse(localStorage.getItem(STORAGE_MARKETPLACE) || "[]");
    const idx = mpl.findIndex((m: any) => m.id === id);
    if (idx === -1) throw new Error("Listing not found");
    mpl[idx].status = status;
    localStorage.setItem(STORAGE_MARKETPLACE, JSON.stringify(mpl));
    return mpl[idx];
  },

  async getStats(todayString: string) {
    const bks = JSON.parse(localStorage.getItem(STORAGE_BOOKINGS) || "[]");
    const reps = JSON.parse(localStorage.getItem(STORAGE_REPAIRS) || "[]");
    const cls = JSON.parse(localStorage.getItem(STORAGE_CLIENTS) || "[]");
    const inv = JSON.parse(localStorage.getItem(STORAGE_INVENTORY) || "[]");

    const lowStock = inv.filter((i: any) => (i.quantity || 0) <= 2).length;
    
    // Map today's pending bookings
    const todayBk = bks
      .filter((b: any) => b.preferred_date === todayString && b.status === "pending")
      .map((b: any) => {
        const client = cls.find((c: any) => c.id === b.client_id) || { full_name: "Unknown", phone: "" };
        return {
          ...b,
          clients: {
            full_name: client.full_name,
            phone: client.phone
          }
        };
      });

    return {
      bookings: bks.length,
      repairs: reps.length,
      clients: cls.length,
      lowStock,
      todayBookings: todayBk
    };
  }
};

// -------------------------------------------------------------
// FIREBASE FIRESTORE DATABASE IMPLEMENTATION
// -------------------------------------------------------------
const firebaseDb = {
  async getClients() {
    const querySnapshot = await getDocs(collection(db, "clients"));
    const cls: any[] = [];
    querySnapshot.forEach((doc) => {
      cls.push({ id: doc.id, ...doc.data() });
    });

    const repsSnapshot = await getDocs(collection(db, "repairs"));
    const reps: any[] = [];
    repsSnapshot.forEach((doc) => {
      reps.push({ id: doc.id, ...doc.data() });
    });

    return cls.map((c: any) => ({
      ...c,
      repairs: reps
        .filter((r: any) => r.client_id === c.id)
        .map((r: any) => ({ id: r.id, created_at: r.created_at }))
    })).sort((a: any, b: any) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  },

  async getClientByPhone(phone: string) {
    const q = query(collection(db, "clients"), where("phone", "==", phone), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const docSnap = querySnapshot.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  },

  async createClient(clientData: { full_name: string; phone: string; email?: string }) {
    const clientPayload = {
      full_name: clientData.full_name,
      phone: clientData.phone,
      email: clientData.email || "",
      created_at: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "clients"), clientPayload);
    return { id: docRef.id, ...clientPayload };
  },

  async getBookings(statusFilter: string = "all") {
    let q = query(collection(db, "bookings"));
    if (statusFilter !== "all") {
      q = query(collection(db, "bookings"), where("status", "==", statusFilter));
    }
    
    const querySnapshot = await getDocs(q);
    const bks: any[] = [];
    querySnapshot.forEach((doc) => {
      bks.push({ id: doc.id, ...doc.data() });
    });

    const clientsSnapshot = await getDocs(collection(db, "clients"));
    const cls: any[] = [];
    clientsSnapshot.forEach((doc) => {
      cls.push({ id: doc.id, ...doc.data() });
    });

    return bks
      .map((b: any) => {
        const client = cls.find((c: any) => c.id === b.client_id) || { full_name: "Unknown Client", phone: "" };
        return {
          ...b,
          clients: {
            full_name: client.full_name,
            phone: client.phone
          }
        };
      })
      .sort((a: any, b: any) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  },

  async createBooking(bookingData: {
    client_id: string;
    device_model: string;
    issue_type: string;
    description: string | null;
    preferred_date: string | null;
    preferred_time: string | null;
    status: string;
  }) {
    const bookingPayload = {
      ...bookingData,
      created_at: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "bookings"), bookingPayload);
    return { id: docRef.id, ...bookingPayload };
  },

  async updateBookingStatus(id: string, status: string) {
    const docRef = doc(db, "bookings", id);
    await updateDoc(docRef, { status });
    const snap = await getDoc(docRef);
    return { id: snap.id, ...snap.data() };
  },

  async getRepairs() {
    const querySnapshot = await getDocs(collection(db, "repairs"));
    const reps: any[] = [];
    querySnapshot.forEach((doc) => {
      reps.push({ id: doc.id, ...doc.data() });
    });

    const clientsSnapshot = await getDocs(collection(db, "clients"));
    const cls: any[] = [];
    clientsSnapshot.forEach((doc) => {
      cls.push({ id: doc.id, ...doc.data() });
    });

    return reps
      .map((r: any) => {
        const client = cls.find((c: any) => c.id === r.client_id) || { full_name: "Unknown Client" };
        return {
          ...r,
          clients: {
            full_name: client.full_name
          }
        };
      })
      .sort((a: any, b: any) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  },

  async getRepairsByClientId(clientId: string) {
    const q = query(collection(db, "repairs"), where("client_id", "==", clientId));
    const querySnapshot = await getDocs(q);
    const reps: any[] = [];
    querySnapshot.forEach((doc) => {
      reps.push({ id: doc.id, ...doc.data() });
    });
    return reps.sort((a: any, b: any) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  },

  async createRepair(repairData: {
    client_id: string;
    device_model: string;
    issue: string;
    cost: number;
    status: string;
    warranty_expires: string | null;
  }) {
    const repairPayload = {
      ...repairData,
      created_at: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "repairs"), repairPayload);
    return { id: docRef.id, ...repairPayload };
  },

  async getInventory() {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    const items: any[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items.sort((a: any, b: any) => a.name.localeCompare(b.name));
  },

  async updateInventoryQty(id: string, delta: number) {
    const docRef = doc(db, "inventory", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Inventory item not found");
    const currentQty = docSnap.data().quantity || 0;
    const newQty = Math.max(0, currentQty + delta);
    await updateDoc(docRef, { quantity: newQty });
    return { id: docRef.id, ...docSnap.data(), quantity: newQty };
  },

  async addInventoryItem(itemData: { name: string; category: string; quantity: number; unit_cost: number }) {
    const docRef = await addDoc(collection(db, "inventory"), itemData);
    return { id: docRef.id, ...itemData };
  },

  async getMarketplaceListings() {
    const querySnapshot = await getDocs(collection(db, "marketplace_listings"));
    const listings: any[] = [];
    querySnapshot.forEach((doc) => {
      listings.push({ id: doc.id, ...doc.data() });
    });
    return listings.sort((a: any, b: any) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  },

  async addMarketplaceListing(listingData: { title: string; category: string; condition: string; price: number; status: string }) {
    const listingPayload = {
      ...listingData,
      created_at: new Date().toISOString()
    };
    const docRef = await addDoc(collection(db, "marketplace_listings"), listingPayload);
    return { id: docRef.id, ...listingPayload };
  },

  async updateMarketplaceListingStatus(id: string, status: string) {
    const docRef = doc(db, "marketplace_listings", id);
    await updateDoc(docRef, { status });
    const docSnap = await getDoc(docRef);
    return { id: docRef.id, ...docSnap.data() };
  },

  async getStats(todayString: string) {
    // Replicates aggregated count stats
    const bksSnap = await getDocs(collection(db, "bookings"));
    const repsSnap = await getDocs(collection(db, "repairs"));
    const clsSnap = await getDocs(collection(db, "clients"));
    const invSnap = await getDocs(collection(db, "inventory"));

    const bks: any[] = [];
    bksSnap.forEach((doc) => bks.push(doc.data()));
    
    const repsCount = repsSnap.size;
    const clsCount = clsSnap.size;
    
    let lowStock = 0;
    invSnap.forEach((doc) => {
      if ((doc.data().quantity || 0) <= 2) {
        lowStock++;
      }
    });

    // Get today's bookings
    const q = query(
      collection(db, "bookings"),
      where("preferred_date", "==", todayString),
      where("status", "==", "pending")
    );
    const todayBkSnap = await getDocs(q);
    const todayBks: any[] = [];
    todayBkSnap.forEach((doc) => {
      todayBks.push({ id: doc.id, ...doc.data() });
    });

    // Fetch clients for today's bookings mapping
    const cls: any[] = [];
    clsSnap.forEach((doc) => {
      cls.push({ id: doc.id, ...doc.data() });
    });

    const mappedTodayBk = todayBks.map((b: any) => {
      const client = cls.find((c: any) => c.id === b.client_id) || { full_name: "Unknown", phone: "" };
      return {
        ...b,
        clients: {
          full_name: client.full_name,
          phone: client.phone
        }
      };
    });

    return {
      bookings: bks.length,
      repairs: repsCount,
      clients: clsCount,
      lowStock,
      todayBookings: mappedTodayBk
    };
  }
};

// Export active implementation depending on whether Firebase is set up
export const dbAdapter = isFirebaseConfigured ? firebaseDb : localDb;

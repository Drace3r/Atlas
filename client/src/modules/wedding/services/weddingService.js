import weddingStats, { guests } from "../data/weddingData";

const weddingService = {
  async getGuests() {
    const response = await fetch("http://localhost:3000/api/rsvps");

    if (!response.ok) {
      throw new Error("Kunde inte hämta gäster");
    }

    const weddingGuests = await response.json();

    return weddingGuests.map((guest) => ({
      id: guest.id,
      name: guest.name,
      status:
        guest.attending === "yes"
          ? "attending"
          : "declined",
      allergies: guest.allergies ?? "",
      respondedAt: guest.submitted_at ?? "",
    }));
  },

  async getAttendingGuests() {
    const guests = await this.getGuests();

    return guests.filter(
      (guest) => guest.status === "attending"
    );
  },

  getPendingGuests() {
    return guests.filter(
      (guest) => guest.status === "pending"
    );
  },

  getDeclinedGuests() {
    return guests.filter(
      (guest) => guest.status === "declined"
    );
  },

  getStats() {
    return {
      totalGuests: guests.length,
      attending: guests.filter(
        (guest) => guest.status === "attending"
      ).length,
      pending: guests.filter(
        (guest) => guest.status === "pending"
      ).length,
      declined: guests.filter(
        (guest) => guest.status === "declined"
      ).length,
      allergies: guests.filter(
        (guest) => guest.allergies?.trim() !== ""
      ).length,
    };
  },

  getWeddingDashboardCard() {
    return {
      id: "wedding",
      title: "Wedding",
      value: `${guests.length} gäster`,
      description: "Bröllopsplanering",
      icon: "💒",
      path: "/wedding",
    };
  },
};

export default weddingService;
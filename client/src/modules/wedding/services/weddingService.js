import weddingStats, { guests } from "../data/weddingData";

const weddingService = {
  getGuests() {
    return guests;
  },

  getAttendingGuests() {
    return guests.filter((guest) => guest.status === "attending");
  },

  getPendingGuests() {
    return guests.filter((guest) => guest.status === "pending");
  },

  getDeclinedGuests() {
    return guests.filter((guest) => guest.status === "declined");
  },

  getStats() {
    return {
      totalGuests: guests.length,
      attending: this.getAttendingGuests().length,
      pending: this.getPendingGuests().length,
      declined: this.getDeclinedGuests().length,
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
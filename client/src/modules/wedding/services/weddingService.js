const RSVP_API_URL =
  "http://localhost:3000/api/rsvps";

const SEATING_API_URL =
  "http://localhost:3000/api/seating-plan";

const weddingService = {
  async getGuests() {
    const response = await fetch(RSVP_API_URL);

    if (!response.ok) {
      throw new Error(
        "Kunde inte hämta gäster"
      );
    }

    const weddingGuests = await response.json();

    return weddingGuests.map((guest) => ({
      id: guest.id,
      name: guest.name,
      status:
        guest.attending === "yes"
          ? "attending"
          : guest.attending === "no"
            ? "declined"
            : "pending",
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

  async getPendingGuests() {
    const guests = await this.getGuests();

    return guests.filter(
      (guest) => guest.status === "pending"
    );
  },

  async getDeclinedGuests() {
    const guests = await this.getGuests();

    return guests.filter(
      (guest) => guest.status === "declined"
    );
  },

  async getStats() {
    const guests = await this.getGuests();

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
        (guest) =>
          guest.allergies?.trim() !== ""
      ).length,
    };
  },

  async getSeatingPlan() {
    const response = await fetch(
      SEATING_API_URL
    );

    if (!response.ok) {
      throw new Error(
        "Kunde inte hämta bordsplaceringen"
      );
    }

    return response.json();
  },

  async saveSeatingPlan(tables) {
    const response = await fetch(
      SEATING_API_URL,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tables,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Kunde inte spara bordsplaceringen"
      );
    }

    return response.json();
  },

  async getWeddingDashboardCard() {
    const guests = await this.getGuests();

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
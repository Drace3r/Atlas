import weddingStats, { guests } from "../data/weddingData";

const weddingService = {
  getStats() {
    return weddingStats;
  },

  getGuests() {
    return guests;
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
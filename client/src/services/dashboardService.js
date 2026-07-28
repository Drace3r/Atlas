import dashboardCards from "../data/dashboardData";
import { getFitnessDashboardCard } from "./fitnessService";

export function getDashboardCards(settings) {
  return dashboardCards.map((card) => {
    switch (card.id) {
      case "fitness":
        return getFitnessDashboardCard(settings);

      default:
        return card;
    }
  });
}
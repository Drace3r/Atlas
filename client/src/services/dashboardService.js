import {
  getFitnessDashboardCard,
} from "../modules/fitness/services/fitnessService";

import {
  getCareerDashboardCard,
} from "./careerService";

import weddingService from "../modules/wedding/services/weddingService";

import {
  getAIDashboardCard,
} from "./aiService";

export async function getDashboardCards(
  settings,
  workoutLogs
) {
  let weddingCard = {
    id: "wedding",
    title: "Wedding",
    heading: "Kunde inte ansluta",
    description: "Wedding-backenden är offline",
    icon: "💒",
    path: "/wedding",
  };

  try {
    weddingCard =
      await weddingService
        .getWeddingDashboardCard();
  } catch (error) {
    console.error(
      "Wedding-backenden är inte tillgänglig:",
      error
    );
  }

  return [
    getFitnessDashboardCard(
      settings,
      workoutLogs
    ),
    getCareerDashboardCard(),
    weddingCard,
    getAIDashboardCard(),
  ];
}
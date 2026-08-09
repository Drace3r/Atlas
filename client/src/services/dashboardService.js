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
  const weddingCard =
    await weddingService
      .getWeddingDashboardCard();

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
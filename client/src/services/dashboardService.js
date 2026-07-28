import { getFitnessDashboardCard } from "./fitnessService";
import { getCareerDashboardCard } from "./careerService";
import { getWeddingDashboardCard } from "./weddingService";
import { getAIDashboardCard } from "./aiService";

export function getDashboardCards(settings) {
  return [
    getFitnessDashboardCard(settings),
    getCareerDashboardCard(),
    getWeddingDashboardCard(),
    getAIDashboardCard(),
  ];
}
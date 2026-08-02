import { getFitnessDashboardCard } from "../modules/fitness/services/fitnessService";
import { getCareerDashboardCard } from "./careerService";
import  WeddingService  from "../modules/wedding/services/weddingService";
import { getAIDashboardCard } from "./aiService";

export function getDashboardCards(settings, workoutLogs) {
  return [
    getFitnessDashboardCard(settings, workoutLogs),
    getCareerDashboardCard(),
    WeddingService.getWeddingDashboardCard(),
    getAIDashboardCard(),
  ];
}
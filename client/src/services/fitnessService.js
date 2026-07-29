export function getWeeklyProgress(completed, goal) {
    const safeCompleted =
      typeof completed === "number" && completed >= 0
        ? completed
        : 0;
  
    const safeGoal =
      typeof goal === "number" && goal > 0
        ? goal
        : 0;
  
    const percentage =
      safeGoal > 0
        ? Math.min(Math.round((safeCompleted / safeGoal) * 100), 100)
        : 0;
  
    return {
      completed: safeCompleted,
      goal: safeGoal,
      percentage,
    };
  }
  
  export function getFitnessDashboardCard(settings, workoutLogs) {
    const weeklyProgress = getWeeklyProgress(
      workoutLogs.length,
      settings.fitness.weeklyGoal,
    );
  
    return {
      id: "fitness",
      icon: "💪",
      title: "Fitness",
      heading: `${weeklyProgress.completed} workouts this week`,
      description: `Weekly goal: ${weeklyProgress.goal} workouts`,
    };
  }
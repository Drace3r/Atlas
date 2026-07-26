import {
    CalendarDays,
    Dumbbell,
    Flame,
    Trophy,
  } from "lucide-react";
  
  const fitnessData = [
    {
      id: 1,
      icon: Dumbbell,
      title: "Dagens pass",
      heading: "Push Day",
      exercises: [
        { id: 1, name: "Bänkpress" },
        { id: 2, name: "Lutande hantelpress" },
        { id: 3, name: "Axelpress" },
        { id: 4, name: "Sidolyft" },
        { id: 5, name: "Triceps pushdown" },
        { id: 6, name: "Dips" },
      ],
    },
    {
      id: 2,
      icon: CalendarDays,
      title: "Veckans mål",
      completed: 3,
      goal: 4,
    },
    {
      id: 3,
      icon: Flame,
      title: "Streak",
      heading: "12 dagar",
      description: "Fortsätt så",
    },
    {
      id: 4,
      icon: Trophy,
      title: "Personbästa",
      heading: "Bänkpress: 100 kg",
      description: "Knäböj: 130 kg",
    },
  ];
  
  export default fitnessData;
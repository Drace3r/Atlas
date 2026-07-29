import { 
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AppContext = createContext(null);

const defaultSettings = {
    user: {
      name: "Jonathan",
      initials: "JF",
    },
    appearance: {
      theme: "light",
    },
    fitness: {
      gym: "Nordic Wellness",
      workoutProgram: "PPL",
      weeklyGoal: 4,
    },
  };

  export function AppProvider({ children }) {
    const [settings, setSettings] = useState(() => {
      const savedSettings = localStorage.getItem("forsemalm-settings");
  
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
  
      return defaultSettings;
    });
  
    useEffect(() => {
      localStorage.setItem(
        "forsemalm-settings",
        JSON.stringify(settings)
      );
    }, [settings]);

    const [workoutLogs, setWorkoutLogs] = useState (() => {
        const savedLogs = localStorage.getItem("forsemalm-workout-logs");

        if (savedLogs) {
            return JSON.parse(savedLogs);
        }

        return[];
    }); 

    useEffect(() => {
        localStorage.setItem(
            "forsemalm-workout-logs",
            JSON.stringify(workoutLogs),
        );
    }, [workoutLogs]);
    function addWorkoutLog(workout) {
        const newWorkoutLog = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          ...workout,
        };
        
        
        setWorkoutLogs((currentLogs) => [
          newWorkoutLog,
          ...currentLogs,
        ]);
      }

      function updateWorkoutLog(workoutId, updates) {
        setWorkoutLogs((currentLogs) =>
        currentLogs.map((workout) =>
        workout.id === workoutId
        ? {
          ...workout,
          ...updates,

        }
        : workout,
        ),
        );
    }

      function deleteWorkoutLog(workoutId) {
        setWorkoutLogs((currentLogs) =>
          currentLogs.filter((workout) => workout.id !== workoutId),
        );
      }

      
    return (
      <AppContext.Provider
        value={{
          settings,
          setSettings,
          workoutLogs,
          addWorkoutLog,
          updateWorkoutLog,
          deleteWorkoutLog,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp måste användas inuti AppProvider");
  }

  return context;
}
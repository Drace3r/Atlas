import React from "react";
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
  
    return (
      <AppContext.Provider
        value={{
          settings,
          setSettings,
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
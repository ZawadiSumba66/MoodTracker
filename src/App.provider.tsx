import React, { createContext, useContext, useState, useCallback } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);
  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList((list) => [
      ...list,
      { mood: selectedMood, timestamp: Date.now() },
    ]);
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

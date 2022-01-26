import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

const dataKey = 'my-app-data';

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch {}
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch {}
  return null;
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);
  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList((list) => {
      const newMoodList = [
        ...list,
        { mood: selectedMood, timestamp: Date.now() },
      ];
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  const handleDeleteMood = useCallback((mood: MoodOptionWithTimestamp) => {
    setMoodList((current) => {
      const newMoodList = current.filter((value) => {
        return value.timestamp !== mood.timestamp;
      });
      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);
  return (
    /* passed down to the children but only accessed via use context*/
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

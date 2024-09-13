import {useState, useContext, createContext, useEffect} from 'react';
import {STEBEN_QUIZ, STEBEN_TRUE_FALSE} from '../data/stabenData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({
  quizData: [],
  trueFalseData: [],
});

export const AppProvider = ({children}) => {
  const [quizData, setQuizData] = useState([]);
  const [trueFalseData, setTrueFalseData] = useState([]);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      // Check if data already exists in AsyncStorage
      const storedQuizData = await AsyncStorage.getItem('quizData');
      const storedTrueFalseData = await AsyncStorage.getItem('trueFalseData');

      if (!storedQuizData) {
        // If not, store the initial data
        await AsyncStorage.setItem('quizData', JSON.stringify(STEBEN_QUIZ));
        setQuizData(STEBEN_QUIZ);
      } else {
        setQuizData(JSON.parse(storedQuizData));
      }

      if (!storedTrueFalseData) {
        await AsyncStorage.setItem(
          'trueFalseData',
          JSON.stringify(STEBEN_TRUE_FALSE),
        );
        setTrueFalseData(STEBEN_TRUE_FALSE);
      } else {
        setTrueFalseData(JSON.parse(storedTrueFalseData));
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  const value = {quizData, trueFalseData};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('Context using error');
  }
  return appContext;
};

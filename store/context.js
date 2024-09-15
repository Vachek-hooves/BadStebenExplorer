import {useState, useContext, createContext, useEffect} from 'react';
import {STEBEN_QUIZ, STEBEN_TRUE_FALSE} from '../data/stabenData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({
  quizData: [],
  trueFalseData: [],
  meetups: [],
  addMeetup: () => {},
  deleteMeetup: () => {},
  updateMeetup: () => {},
});

export const AppProvider = ({children}) => {
  const [quizData, setQuizData] = useState([]);
  const [trueFalseData, setTrueFalseData] = useState([]);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      // Check if data already exists in AsyncStorage
      const storedQuizData = await AsyncStorage.getItem('quizData');
      const storedTrueFalseData = await AsyncStorage.getItem('trueFalseData');
      const storedMeetups = await AsyncStorage.getItem('meetups');
      if (storedMeetups) {
        setMeetups(JSON.parse(storedMeetups));
      }

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
  const addMeetup = async newMeetup => {
    try {
      const updatedMeetups = [...meetups, newMeetup];
      await AsyncStorage.setItem('meetups', JSON.stringify(updatedMeetups));
      setMeetups(updatedMeetups);
    } catch (error) {
      console.error('Error adding meetup:', error);
    }
  };

  const deleteMeetup = async meetupId => {
    try {
      const updatedMeetups = meetups.filter(meetup => meetup.id !== meetupId);
      await AsyncStorage.setItem('meetups', JSON.stringify(updatedMeetups));
      setMeetups(updatedMeetups);
    } catch (error) {
      console.error('Error deleting meetup:', error);
    }
  };

  const updateMeetup = async updatedMeetup => {
    try {
      const updatedMeetups = meetups.map(meetup =>
        meetup.id === updatedMeetup.id ? updatedMeetup : meetup,
      );
      await AsyncStorage.setItem('meetups', JSON.stringify(updatedMeetups));
      setMeetups(updatedMeetups);
    } catch (error) {
      console.error('Error updating meetup:', error);
    }
  };

  const value = {
    quizData,
    trueFalseData,
    meetups,
    addMeetup,
    deleteMeetup,
    updateMeetup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('Context using error');
  }
  return appContext;
};

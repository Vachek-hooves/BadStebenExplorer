import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from 'react';
import {STEBEN_QUIZ, STEBEN_TRUE_FALSE} from '../data/stabenData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({
  quizData: [],
  trueFalseData: [],
  meetups: [],
  addMeetup: () => {},
  deleteMeetup: () => {},
  updateMeetup: () => {},
  updateCompletedQuestions: () => {},
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

  const updateCompletedQuestions = useCallback(
    async (topicId, correctAnswers) => {
      try {
        const updatedData = trueFalseData.map(topic => {
          if (topic.id === topicId) {
            const newCompleted = (topic.completedQuestions || 0) + 1;
            const newCorrectAnswers =
              (topic.correctAnswers || 0) + correctAnswers;
            return {
              ...topic,
              completedQuestions: newCompleted,
              correctAnswers: newCorrectAnswers,
            };
          }
          return topic;
        });

        // Update active status for each level
        const finalData = updatedData.map((topic, index) => {
          if (
            index === 0 ||
            (index > 0 && updatedData[index - 1].correctAnswers >= 6)
          ) {
            return {...topic, active: true};
          }
          return {...topic, active: false};
        });

        await AsyncStorage.setItem('trueFalseData', JSON.stringify(finalData));
        setTrueFalseData(finalData);
      } catch (error) {
        console.error('Error updating completed questions:', error);
      }
    },
    [trueFalseData],
  );

  const updateNextLevelStatus = async (currentTopicId, score, totalQuestions) => {
    try {
      if (score >= 6) {
        const updatedTrueFalseData = trueFalseData.map((topic, index, array) => {
          if (topic.id === currentTopicId && index < array.length - 1) {
            array[index + 1].active = true;
          }
          return topic;
        });
        await AsyncStorage.setItem('trueFalseData', JSON.stringify(updatedTrueFalseData));
        setTrueFalseData(updatedTrueFalseData);
      }
    } catch (error) {
      console.error('Error updating next level status:', error);
    }
  };

  const value = {
    quizData,
    trueFalseData,
    meetups,
    addMeetup,
    deleteMeetup,
    updateMeetup,
    updateCompletedQuestions,
    updateNextLevelStatus,
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

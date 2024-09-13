import {useState, useContext, createContext, useEffect} from 'react';

export const AppContext = createContext({});

export const AppProvider = ({children}) => {
  const [cityQuiz, setCityQuiz] = useState([]);
  const [trueFalse, setTrueFalse] = useState([]);
  const value = {};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error('Context using error');
  }
  return appContext;
};

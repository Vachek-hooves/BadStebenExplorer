import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppProvider} from './store/context';
import {
  IntroductionScreen,
  QuizLaunchScreen,
  TFLaunchScreen,
  WelcomeScreen,
} from './screen';
import {IconTabCity} from './components/icon';
import IconTabQuiz from './components/icon/IconTabQuiz';
import IconTabTF from './components/icon/IconTabTF';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      title: '',
      tabBarStyle: {height: 95, paddingTop: 40},
    }}>
    <Tab.Screen
      name="IntroductionScreen"
      component={IntroductionScreen}
      options={{tabBarIcon: () => <IconTabCity />}}
    />
    <Tab.Screen
      name="QuizScreen"
      component={QuizLaunchScreen}
      options={{tabBarIcon: () => <IconTabQuiz />}}
    />
    <Tab.Screen
      name="TFScreen"
      component={TFLaunchScreen}
      options={{tabBarIcon: () => <IconTabTF />}}
    />
  </Tab.Navigator>
);

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 800,
          }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="InitialTabScreen" component={TabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppProvider} from './store/context';
import {
  CityDeatailsScreen,
  CityHistoryScreen,
  IntroductionScreen,
  MeetupScreen,
  NewsPaperScreen,
  QuizGameScreen,
  QuizLaunchScreen,
  TFGameScreen,
  TFLaunchScreen,
  WelcomeScreen,
} from './screen';
import {IconTabCity} from './components/icon';
import IconTabQuiz from './components/icon/IconTabQuiz';
import IconTabTF from './components/icon/IconTabTF';
import {COLOR} from './const/customColors';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      title: '',
      tabBarStyle: {
        height: 95,
        paddingTop: 40,
        backgroundColor: 'transparent',
        borderRadius: 16,
        position: 'absolute',
        // marginHorizontal: 5,
        bottom: 5,
        shadowOpacity: 0, // Remove shadow on iOS
        borderTopWidth: 0,
      },
    }}>
    <Tab.Screen
      name="IntroductionScreen"
      component={IntroductionScreen}
      options={{tabBarIcon: ({focused}) => <IconTabCity focused={focused} />}}
    />
    <Tab.Screen
      name="QuizScreen"
      component={QuizLaunchScreen}
      options={{tabBarIcon: ({focused}) => <IconTabQuiz focused={focused} />}}
    />
    <Tab.Screen
      name="TFScreen"
      component={TFLaunchScreen}
      options={{tabBarIcon: ({focused}) => <IconTabTF focused={focused} />}}
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
          <Stack.Screen name="NewsPaperScreen" component={NewsPaperScreen} />
          <Stack.Screen
            name="CityHistoryScreen"
            component={CityHistoryScreen}
          />
          <Stack.Screen name="MeetupScreen" component={MeetupScreen} />
          <Stack.Screen
            name="CityDetailsScreen"
            component={CityDeatailsScreen}
          />
          <Stack.Screen name="TFGameScreen" component={TFGameScreen} />
          <Stack.Screen name="QuizGameScreen" component={QuizGameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;

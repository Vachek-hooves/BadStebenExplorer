import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppProvider} from './store/context';
import {IntroductionScreen, WelcomeScreen} from './screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => {
  <Tab.Navigator>
    <Tab.Screen name="IntroductionScreen" component={IntroductionScreen} />
  </Tab.Navigator>;
};

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
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;

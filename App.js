import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppProvider} from './store/context';
import {WelcomeScreen} from './screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;

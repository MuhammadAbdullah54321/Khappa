import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,  } from '@react-navigation/stack';
import HomeScreen from './screens/home/HomeScreen'
import CategoryItems from './screens/categoryitems/CategoryItems'
import Statistics from './screens/statistics/Statistics'

const Stack = createStackNavigator();
class App extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Category Items" component={CategoryItems} />
              <Stack.Screen name="Statistics" component={Statistics} />
            </Stack.Navigator>
          </NavigationContainer>
        );  
  }
}
export default App;

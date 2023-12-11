import React, {FC} from 'react';
import CharacterScreen from './src/screens/CharacterScreen.tsx';
import MainScreen from './src/screens/MainScreen.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type TypeCharactersParamList = {
  MainScreen: undefined;
  CharacterScreen: {
    characterData: {
      name: string;
      birth_year: string;
      gender: string;
      homeworld: string;
      species: string;
      height: string;
      mass: string;
    };
  };
};

const Stack = createNativeStackNavigator<TypeCharactersParamList>();

const App: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CharacterScreen"
          component={CharacterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

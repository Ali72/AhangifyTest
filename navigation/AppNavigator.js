import React, {useEffect, useState, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {SPLASH, HOME} from '../constants';
import TabNavigator from './TabNavigator';
import SplashScreen from '../screens/Splash';

// import {CTX} from '../tools/context';

const Stack = createStackNavigator();

export default function AppStackNavigator() {
  const [loading, setLoading] = useState(true);

  // const skipContext = useContext(CTX);
  // const {skip} = skipContext;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Stack.Navigator
      initialRouteName={SPLASH}
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
      }}>
      {loading ? (
        <Stack.Screen name={SPLASH} component={SplashScreen} />
      ) : (
        <Stack.Screen name={HOME} component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
}

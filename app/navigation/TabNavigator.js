import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {BROWSE_TAB, CHART_TAB, NEW_TAB, ARTISTS_TAB} from '../constants';
import {selectedTab} from '../theme';
import Browse from '../screens/Browse';
import New from '../screens/New';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator(props) {
  const navigation = useNavigation();
  const {navigate} = navigation;

  return (
    <Tab.Navigator
      initialRouteName={BROWSE_TAB}
      screenOptions={{
        activeTintColor: selectedTab,
        showLabel: false,
      }}>
      <Tab.Screen
        name={BROWSE_TAB}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={'th'} color={color} size={size} />
          ),
        }}
        children={() => <Browse {...props} />}
      />
      <Tab.Screen
        name={NEW_TAB}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={'music'} color={color} size={size} />
          ),
        }}
        children={() => <New {...props} />}
      />
      <Tab.Screen
        name={CHART_TAB}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={'star'} color={color} size={size} solid />
          ),
        }}
        children={() => <View {...props} />}
      />
      <Tab.Screen
        name={ARTISTS_TAB}
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome5 name={'users'} color={color} size={size} />
          ),
        }}
        children={() => <View {...props} />}
      />
    </Tab.Navigator>
  );
}

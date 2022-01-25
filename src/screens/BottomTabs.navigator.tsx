import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import { AnalyticsIcon, HistoryIcon, HomeIcon } from '../components/Icons';
import { theme } from '../theme';
import { Analytics } from './Analytics.screen';
import { History } from './History.screen';
import { Home } from './Home.screen';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: {
          fontFamily: theme.fontFamilyRegular,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colorBlue, //gives color to the icons if the
        tabBarInactiveTintColor: theme.colorGrey, // color prop in tabBarIcon is not passed
        tabBarIcon: ({ size, color }) => {
          if (route.name === 'Home') {
            return <HomeIcon size={size} color={color} />;
          }
          if (route.name === 'History') {
            return <HistoryIcon size={size} color={color} />;
          }
          if (route.name === 'Analytics') {
            return <AnalyticsIcon size={size} color={color} />;
          }
          return <Text>{route.name}</Text>;
        },
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: "Today's Mood?" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: 'Fancy Graphs' }}
      />
    </BottomTabs.Navigator>
  );
};

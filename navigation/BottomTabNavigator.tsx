/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, Octicons, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import { Auth, API, graphqlOperation} from 'aws-amplify';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ToDoScreen from '../screens/ToDoScreen';
import ResourceScreen from '../screens/ResourceScreen';
import ProductivityScreen from '../screens/ProductivityScreen';
import { BottomTabParamList, HomeNavigatorParamList, TabTwoParamList } from '../types';
import ProfilePicture from '../components/ProfilePicture';
import {getUser} from '../src/graphql/queries';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        showLabel: false
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <Octicons name="tasklist" color={color} size={26}/>,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <Feather name="bookmark" color={color} size={28} />,
        }}
      />
      <BottomTab.Screen
        name="Messages"
        component={TabFourNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="ios-timer-outline" color={color} size={28} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<HomeNavigatorParamList>();

function HomeNavigator() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    //get the current user
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      if(!userInfo) {
        return;
      }
      try {
          const userData = await API.graphql(graphqlOperation(getUser, {id: userInfo.attributes.sub}));
          if (userData) {
            setUser(userData.data.getUser);
          }
        } catch (e) {
          console.log(e);
        }
    }
    fetchUser();
  }, [])
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="HomeScreen"
        component={TabOneScreen}
        options={{
          headerRightContainerStyle: {
            marginRight: 15,
          },
          headerLeftContainerStyle: {
            marginLeft: 15,
          },
          headerTintColor: "darkorange",
          headerTitle: 'OmniCampus', 
          headerRight: () => (
            <AntDesign name="questioncircle" size={32} />
          ),
          headerLeft: () => (
            <ProfilePicture size={40} image={user?.image} />
          )

        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ToDoScreen"
        component={ToDoScreen}
        options={{ headerTitle: 'To do list', headerTintColor: "darkorange", }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="ResourceScreen"
        component={ResourceScreen}
        options={{ headerTitle: 'NUS Resources 🎒', headerTintColor: "darkorange",}}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="newScreen"
        component={ProductivityScreen}
        options={{ headerTitle: 'Productivity Booster', headerTintColor: "darkorange",}}
      />
    </TabFourStack.Navigator>
  );
}

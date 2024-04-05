import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from './src/screens/intro/SplashScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import HomeScreen from './src/screens/tabs/HomeScreen';
import NotificationScreen from './src/screens/tabs/NotificationScreen';
import SearchScreen from './src/screens/tabs/SearchScreen';
import ProfileScreen from './src/screens/tabs/ProfileScreen';
import DetailScreen from './src/screens/DetailScreen';
import CartScreen from './src/screens/CartScreen';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderBillScreen from './src/screens/OrderBillScreen';

const homeName = 'HomeScreen';
const notiName = 'NotificationScreen';
const searchName = 'SearchScreen';
const profileName = 'ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="MainContainer" component={MainContainer} />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <Stack.Screen name="OrderBillScreen" component={OrderBillScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={{
        tabBarStyle: {backgroundColor: 'white', borderTopWidth: 0, height: 70},
        tabBarActiveTintColor: 'black',
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => null,
      }}>
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                height: 24,
                width: 24,
                tintColor: focused ? '#D17842' : undefined,
              }}
              source={require('./assets/images/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={notiName}
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                height: 35,
                width: 24,
                tintColor: focused ? '#D17842' : undefined,
              }}
              source={require('./assets/images/noti.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={searchName}
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                height: 24,
                width: 27,
                tintColor: focused ? '#D17842' : undefined,
              }}
              source={require('./assets/images/search.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={profileName}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              style={{
                height: 27,
                width: 22,
                tintColor: focused ? '#D17842' : undefined,
              }}
              source={require('./assets/images/profile.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;

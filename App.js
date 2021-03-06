import React, {useEffect} from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import AiScreen from './screens/AiScreen';
import DictScreen from './screens/DictScreen';
import UserScreen from './screens/UserScreen';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { getDisplay } from 'react-native-device-info';

const getTabBarVisible = (tsetPa) => {
  //const params = route.params;
  if (tsetPa === false) {
      return false;
    }
  return true;
};

const bottomHeight = getBottomSpace();
const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'home-outline'} />
          </View>
        ),
        initialRouteName: 'Home',
        activeColor: '#C71585',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#FFC0CB'},
      },
    },
    Ai: {
      screen: AiScreen,
      navigationOptions: {
        tabBarLabel: 'Ai',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={25}
              name={'pie-chart-outline'}
            />
          </View>
        ),
        tabBarVisible: getTabBarVisible(false),
        activeColor: '#4B0082',
        inactiveColor: '#226557',
        barStyle: {
          backgroundColor: '#B0C4DE',display: 'none'
        },
      },
    },
    Settings: {
      screen: DictScreen,
      navigationOptions: {
        tabBarLabel: 'Dict',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={25}
              name={'book-outline'}
            />
          </View>
        ),
        activeColor: '#006400',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#8FBC8F'},
      },
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        tabBarLabel: 'User',
        tabBarIcon: ({tintColor}) => (
          <View>
            <Icon
              style={[{color: tintColor}]}
              size={25}
              name={'person-outline'}
            />
          </View>
        ),
        activeColor: '#006400',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#8FBC8F'},
      },
    },
  },
  {
      animationEnabled: true,
      swipeEnabled: false,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        pressColor: '#00aef0',
        style: {
          backgroundColor: '#fff',
          paddingBottom: bottomHeight,
        },
        indicatorStyle: {
          backgroundColor: '#00aef0',
        },
        activeTintColor: '#00aef0',
        inactiveTintColor: '#d1cece',
        showLabel: false,
        showIcon: true,
      },
    },
);

export default createAppContainer(TabNavigator);
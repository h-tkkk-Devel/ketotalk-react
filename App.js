import React, {useEffect} from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import AiScreen from './screens/AiScreen';
import DictScreen from './screens/DictScreen';
import UserScreen from './screens/UserScreen';

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
    Chat: {
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
        activeColor: '#4B0082',
        inactiveColor: '#226557',
        barStyle: {backgroundColor: '#B0C4DE'},
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
      swipeEnabled: true,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        pressColor: '#00aef0',
        style: {
          backgroundColor: '#fff',
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
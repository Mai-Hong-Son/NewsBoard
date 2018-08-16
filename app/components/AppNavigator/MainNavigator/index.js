import React from 'react';
import { Image } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';

// Menubar
import Login from '../../Login';
import News from '../../News';
import Save from '../../Save';
import Focus from '../../Focus';
import Share from '../../Share';
import Newspaper from '../../Newspaper';

// Components
import NewsDetail from '../../NewsDetail';

// theme component
import Header from '../../Reusables/Header';

// assets
import ImageUrls from '../../../assets/images';

import { MyTabBar } from './myTabBar';

export const RootTabs = createBottomTabNavigator(
  {
    News: {
      screen: News,
      navigationOptions: {
        title: 'Tin tức'
      }
    },
    Focus: {
      screen: Focus,
      navigationOptions: {
        title: 'Tiêu điểm'
      }
    },
    Share: {
      screen: Share
    },
    Newspaper: {
      screen: Newspaper,
      navigationOptions: {
        title: 'Tin tham khảo'
      }
    },
    Save: {
      screen: Save,
      navigationOptions: {
        title: 'Lưu trữ'
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'News') {
          iconName = ImageUrls.menubars[0];
        } else if (routeName === 'Focus') {
          iconName = ImageUrls.menubars[1];
        } else if (routeName === 'Share') {
          iconName = ImageUrls.menubars[2];
        } else if (routeName === 'Newspaper') {
          iconName = ImageUrls.menubars[3];
        } else if (routeName === 'Save') {
          iconName = ImageUrls.menubars[4];
        }

        return <Image source={iconName} style={{ width: 27, height: 27, tintColor }} />;
      }
    }),
    tabBarComponent: MyTabBar,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazy: true
  }
);

export const RootStacks = createStackNavigator(
  {
    HomeTab: {
      screen: RootTabs
    },
    NewsDetail: {
      screen: NewsDetail
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export const DrawerApp = createDrawerNavigator(
  {
    RootStack: {
      screen: RootStacks,
      navigationOptions: {
        drawerLabel: 'Home'
      }
    }
  },
);

export const MainStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    DrawerApp: {
      screen: DrawerApp
    }
  },
  {
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);

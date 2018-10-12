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
import Filter from '../../News/Filter';
import ArticlesByCategory from '../../News/ArticlesByCategory';
import SideMenu from '../../SideMenu';
import SummaryDetail from '../../Newspaper/SummaryDetail';
import SearchArticle from '../../SearchArticle';
import ArticleBySubject from '../../ArticleBySubject';
import IssuesDetail from '../../Focus/IssuesDetail';
import Setting from '../../Setting';

// theme component
// import Header from '../../Reusables/Header';

// assets
import ImageUrls from '../../../assets/images';

import { MyTabBar } from './myTabBar';
import Scale from '../../../theme/scale';
import platform from '../../../theme/platform';

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
    Newspaper: {
      screen: Newspaper
    },
    Share: {
      screen: Share,
      navigationOptions: {
        title: 'Chia sẻ'
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

        return <Image source={iconName} style={{ width: Scale.getSize(27), height: Scale.getSize(27), tintColor }} />;
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
    },
    Filter: {
      screen: Filter
    },
    ArticlesByCategory: {
      screen: ArticlesByCategory
    },
    SummaryDetail: {
      screen: SummaryDetail
    },
    SearchArticle: {
      screen: SearchArticle
    },
    IssuesDetail: {
      screen: IssuesDetail
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
      screen: RootStacks
    },
    ArticleBySubject: {
      screen: ArticleBySubject
    },
    Setting: {
      screen: Setting
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: platform.deviceWidth - 100
  }
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

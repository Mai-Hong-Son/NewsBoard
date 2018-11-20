import React from 'react';
import { Image } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import I18n from 'react-native-i18n';
// import moment from 'moment';
import 'moment/locale/vi';

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
import FilterSetting from '../../Setting/elements/FilterSetting';

// theme component
// import Header from '../../Reusables/Header';

// assets
import ImageUrls from '../../../assets/images';

import { MyTabBar } from './myTabBar';
// import Scale from '../../../theme/scale';
import platform from '../../../theme/platform';
import en from '../../../assets/i18n/locales/en';
import vi from '../../../assets/i18n/locales/vi';

I18n.fallbacks = true;
I18n.translations = { en, vi };

export const RootTabs = createBottomTabNavigator(
  {
    News: {
      screen: News,
      navigationOptions: {
        title: null
      }
    },
    Focus: {
      screen: Focus,
      navigationOptions: {
        title: null
      }
    },
    Newspaper: {
      screen: Newspaper
    },
    Share: {
      screen: Share,
      navigationOptions: {
        title: null
      }
    },
    Save: {
      screen: Save,
      navigationOptions: {
        title: null
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
    swipeEnabled: true,
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
    },
    ArticleBySubject: {
      screen: ArticleBySubject
    },
    Setting: {
      screen: Setting
    },
    FilterSetting: {
      screen: FilterSetting
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
    }
  }, {
    contentComponent: SideMenu,
    drawerWidth: platform.deviceWidth - 100,
    drawerLockMode: 'locked-closed'
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

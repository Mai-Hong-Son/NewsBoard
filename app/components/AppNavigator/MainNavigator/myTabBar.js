import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FullGradient from '../../Reusables/FullGradient';

const TAB_BAR_HEIGHT = 60;
const BARCODE_BUTTON_MARGIN = 10;

export class MyTabBar extends React.Component {
  renderTabBarButton = (route, idx) => {
    const { navigation, getLabelText, renderIcon } = this.props;
    const { state } = navigation;
    const { routes } = state;
    const color = state.index === idx ? '#4D80E6' : '#7F94A0';
    const label = getLabelText({ route });

    const btnBarCode = (
      <FullGradient
        containerStyle={styles.btnBarCode}
      >
        {renderIcon({ route, tintColor: '#fff' })}
      </FullGradient>
    );

    const btnTabBarCustom =
      idx !== 2 ? (
        <View style={styles.btnTabBar}>
          {renderIcon({ route, tintColor: color })}
          <Text style={[styles.txtTabBar, { color }]}>{label}</Text>
        </View>
      ) :
        (
          btnBarCode
        );

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (routes.index !== idx) {
            navigation.navigate(route.routeName);
          }
        }}
        key={route.routeName}
      >
        {btnTabBarCustom}
      </TouchableOpacity>
    );
  };

  render() {
    const { navigation } = this.props;
    const {
      state: { routes }
    } = navigation;
    const tabBarButtons = routes.map(this.renderTabBarButton);

    return (
      <View style={styles.wrapTabBar}>
        <View style={styles.tabBarBackground} />
        {tabBarButtons}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT + BARCODE_BUTTON_MARGIN,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.7,
    elevation: 1
  },
  tabBarBackground: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT
  },
  btnTabBar: {
    alignItems: 'center',
    marginTop: BARCODE_BUTTON_MARGIN
  },
  txtTabBar: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 4
  },
  btnBarCode: {
    backgroundColor: '#4D80E6',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: BARCODE_BUTTON_MARGIN,
    height: 60,
    borderRadius: 30
  }
});

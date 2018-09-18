import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import FullGradient from '../FullGradient';

// theme component
import platform from '../../../theme/platform';
import Scale from '../../../theme/scale';

export default class Header extends React.PureComponent {
  render() {
    const { navigation, title, iconName, type, hasSearch } = this.props;
    const iconLeft = type !== 'stack' ? 'align-justify' : 'angle-left';
    const sizeBtnLeft = type !== 'stack' ? Scale.getSize(25) : Scale.getSize(40);

    return (
      <FullGradient
        containerStyle={styles.container}
      >
        <View style={styles.wrapContentHeader}>
          <View style={styles.wrapBoxLeft}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => (type !== 'stack' ? navigation.openDrawer() : navigation.goBack())}
            >
              <Icon
                name={iconLeft}
                color={platform.containerBg}
                size={sizeBtnLeft}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.txtNews}>{title.toUpperCase()}</Text>
          <View style={styles.wrapBoxRight}>
            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => null}>
              <Icon
                name={hasSearch ? 'search' : null}
                color={platform.containerBg}
                size={Scale.getSize(21)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <Icon
                name={iconName}
                color={platform.containerBg}
                size={Scale.getSize(25)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </FullGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: platform.platform === 'ios' ? Scale.getSize(80) : Scale.getSize(60),
    width: platform.deviceWidth,
    justifyContent: 'flex-end',
    paddingBottom: Scale.getSize(15)
  },
  wrapContentHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  txtNews: {
    color: platform.containerBg,
    fontWeight: platform.fontWeightTitle,
    fontSize: Scale.getSize(16)
  },
  wrapBoxLeft: {
    flex: 1
  },
  wrapBoxRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});

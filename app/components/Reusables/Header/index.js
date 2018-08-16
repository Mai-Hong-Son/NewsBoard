import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import FullGradient from '..//FullGradient';

// theme component
import platform from '../../../theme/platform';
// import Scale from '../theme/scale';

export default class Header extends React.PureComponent {
  render() {
    const { navigation, title, iconName, type } = this.props;
    const iconLeft = type !== 'stack' ? 'align-left' : 'angle-left';
    const sizeBtnLeft = type !== 'stack' ? 32 : 40;

    return (
      <FullGradient
        containerStyle={styles.container}
      >
        <View style={styles.wrapContentHeader}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => (type !== 'stack' ? navigation.openDrawer() : navigation.goBack())}
          >
            <Icon name={iconLeft} color={platform.containerBg} size={sizeBtnLeft} />
          </TouchableOpacity>
          <Text style={styles.txtNews}>{title.toUpperCase()}</Text>
          <TouchableOpacity onPress={() => this.props.onPress()}>
            <Icon name={iconName} color={platform.containerBg} size={32} />
          </TouchableOpacity>
        </View>
      </FullGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: platform.deviceWidth,
    justifyContent: 'flex-end',
    paddingBottom: 15
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
    fontSize: 16
  }
});

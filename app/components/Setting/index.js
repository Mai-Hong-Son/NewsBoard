import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native';

import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';

export default class Setting extends React.PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <SafeArea>
        <Header
          title={'Cài đặt'}
          type='stack'
          navigation={navigation}
        />
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({

});

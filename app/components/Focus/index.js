import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../Reusables/Header';
import * as commonActions from '../../../redux/actions';

@connect(
  state => ({
    danhmucthuoc: state.getdanhmucthuoc
  }),
  { ...commonActions }
)
export default class Focus extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header title={'Tiêu điểm'} navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

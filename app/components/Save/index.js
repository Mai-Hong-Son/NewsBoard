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
    ketquaguiphanhoi: state.ketquaguiphanhoi
  }),
  { ...commonActions }
)
export default class Save extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header title={'Lưu trữ'} navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

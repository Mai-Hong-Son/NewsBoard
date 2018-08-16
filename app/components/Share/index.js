import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Header from '../Reusables/Header';

@connect(state => ({
  statusBack: state.statusBack
}))
export default class Share extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header title={'Chia sẻ'} navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

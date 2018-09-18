import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import FullGradient from '../Reusables/FullGradient';
import PersonalInfo from './PersonalInfo';

export default class SideMenu extends React.PureComponent {
  render() {
    return (
      <FullGradient containerStyle={styles.container}>
        <PersonalInfo />
      </FullGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});


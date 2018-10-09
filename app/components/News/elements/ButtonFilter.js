import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Scale from '../../../theme/scale';

class ButtonFilter extends React.PureComponent {
  render() {
    const { title } = this.props;

    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View style={styles.buttonFilter}>
          <Text style={styles.txtButtonFilter}>{title}</Text>
          <View>
            <Icon name='ios-arrow-up' size={Scale.getSize(12)} />
            <Icon name='ios-arrow-down' size={Scale.getSize(12)} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ButtonFilter;

const styles = StyleSheet.create({
  btnTimePicker: {
    paddingRight: 5
  },
  buttonFilter: {
    paddingHorizontal: Scale.getSize(15),
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: 'red'
  },
  txtButtonFilter: {
    paddingRight: Scale.getSize(7),
    fontSize: Scale.getSize(14)
    // paddingTop: Scale.getSize(24) - Scale.getSize(21)
  }
});

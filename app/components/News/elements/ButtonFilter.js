import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class ButtonFilter extends React.PureComponent {
  render() {
    const { title } = this.props;

    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View style={styles.buttonFilter}>
          <Text style={styles.txtButtonFilter}>{title}</Text>
          <View>
            <Icon name='ios-arrow-up' size={12} />
            <Icon name='ios-arrow-down' size={12} />
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
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
    // backgroundColor: 'red'
  },
  txtButtonFilter: {
    paddingRight: 7,
    fontSize: 14,
    color: '#000'
    // paddingTop: Scale.getSize(24) - Scale.getSize(21)
  }
});

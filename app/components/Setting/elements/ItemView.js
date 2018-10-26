import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import Scale from '../../../theme/scale';

export default class ItemView extends React.PureComponent {
  render() {
    const { title, data } = this.props;
    const text = `${data.map(item => (`${item.name}`))}`;

    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View style={styles.wrapItem}>
          <Text style={styles.txtTitle}>{title}</Text>
          <Text style={styles.txtContent}>{text.replace(/.$ /, '')}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapItem: {
    paddingVertical: Scale.getSize(10),
    borderBottomColor: 'rgb(237,237,237)',
    borderBottomWidth: 1
  },
  txtTitle: {
    fontSize: Scale.getSize(17),
    color: '#000',
    paddingBottom: Scale.getSize(8)
  },
  txtContent: {
    fontSize: Scale.getSize(16),
    color: 'rgb(137,137,137)',
    paddingBottom: Scale.getSize(8)
  }
});


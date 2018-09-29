import React from 'react';
import {
  // View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import platform from '../../theme/platform';
import SafeArea from '../../theme/SafeArea';
import FullGradient from '../Reusables/FullGradient';
import Scale from '../../theme/scale';

export default class SearchArticle extends React.PureComponent {
  state = {
    data: ''
  }

  onSubmit = () => {
    const { navigation: { state: { params: { onSubmit } } } } = this.props;
    const { data } = this.state;

    onSubmit && onSubmit(data);
    this.props.navigation.goBack();
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeArea>
        <FullGradient containerStyle={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='angle-left' size={Scale.getSize(40)} color={platform.containerBg} />
          </TouchableOpacity>
          <TextInput
            underlineColorAndroid={'transparent'}
            autoFocus
            onSubmitEditing={this.onSubmit}
            onChangeText={text => this.setState({ data: text })}
            selectionColor={'#fff'}
            style={styles.textInputStyle}
          />
        </FullGradient>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: platform.containerBg
  },
  headerContainer: {
    height: platform.platform == 'ios' ? Scale.getSize(80) : Scale.getSize(60),
    width: platform.deviceWidth,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: Scale.getSize(15),
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  textInputStyle: {
    height: Scale.getSize(35),
    flex: 1,
    paddingLeft: 15,
    fontSize: Scale.getSize(25),
    color: '#fff'
  }
});

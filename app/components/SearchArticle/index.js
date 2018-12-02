import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import platform from '../../theme/platform';
import SafeArea from '../../theme/SafeArea';
import FullGradient from '../Reusables/FullGradient';
import Scale from '../../theme/scale';

export default class SearchArticle extends React.PureComponent {
  constructor(props) {
    super(props);

    const { navigation: { state: { params: { textSearch } } } } = this.props;

    this.state = {
      data: textSearch
    };
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
          <TouchableOpacity style={{ height: '100%', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
            <Icon name='ios-arrow-back' size={35} color={platform.containerBg} />
          </TouchableOpacity>
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <TextInput
              underlineColorAndroid={'transparent'}
              autoFocus
              onSubmitEditing={this.onSubmit}
              onChangeText={text => this.setState({ data: text })}
              selectionColor={'#fff'}
              style={styles.textInputStyle}
              value={this.state.data}
            />
          </View>
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
    height: platform.platform === 'ios' ? 80 : 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    // paddingBottom: Scale.getSize(15),
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  textInputStyle: {
    // flex: 1,
    paddingLeft: 15,
    fontSize: 20,
    color: '#fff',
    width: platform.deviceWidth
  }
});

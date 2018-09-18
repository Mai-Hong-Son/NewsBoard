import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import * as commonActions from '../../../../redux/actions';
import images from '../../../assets/images';
import Scale from '../../../theme/scale';

@connect(
  state => ({
    userInfo: state.userInfo
  }),
  { ...commonActions }
)
export default class PersonalInfo extends React.PureComponent {
  state = {
    userData: null,
    loading: true
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo, error } = nextProps;

    if (!error) {
      this.setState({
        userData: userInfo.data,
        loading: false
      });
    }
  }

  render() {
    const { loading, userData } = this.state;

    if (loading) return null;

    return (
      <View style={styles.container}>
        <Image
          source={images.userImage}
          style={styles.imageSize}
          resizeMode='cover'
        />
        <View style={styles.wrapUserInfo}>
          <Text style={styles.txtUserName}>{userData.username}</Text>
          <Text style={styles.txtEmail}>{userData.email}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Scale.getSize(20),
    paddingLeft: 15
  },
  imageSize: {
    width: 70,
    height: 70
  },
  wrapUserInfo: {
    paddingLeft: 15,
    justifyContent: 'center'
  },
  txtUserName: {
    fontSize: Scale.getSize(18),
    fontWeight: '600',
    color: '#fff'
  },
  txtEmail: {
    fontSize: Scale.getSize(15),
    fontWeight: '500',
    color: '#fff'
  }
});


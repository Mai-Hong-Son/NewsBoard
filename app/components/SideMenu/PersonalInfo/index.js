import React from 'react';
import {
  View,
  Text,
  // Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import { Gravatar } from 'react-native-gravatar';

import * as commonActions from '../../../../redux/actions';
// import images from '../../../assets/images';
import Scale from '../../../theme/scale';

@connect(
  state => ({
    userInfo: state.userInfo,
    mainRouter: state.mainRouter,
    localhost: state.localhost
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
    this.props.getCategoriesSetting();
    this.props.getLanguagesSetting();
    this.props.getCountriesSetting();
    this.props.getRegionsSetting();
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo: { error, data } } = nextProps;

    if (!error && this.state.loading) {
      const { id } = data;

      // this._retrieveData(id);
      OneSignal.sendTags({ ip: this.props.localhost.data.payload.replace('http://', '').replace(':8080', ''), user_id: id });
      OneSignal.inFocusDisplaying(2);
      OneSignal.addEventListener('opened', (openResult) => this.onOpened(openResult, this.props));
      OneSignal.configure();

      this.setState({
        userData: data,
        loading: false
      }, () => this.props.postSettings(this.state.userData.settings));
    }
  }

  onOpened(openResult, props) {
    const { type, post, subject } = openResult.notification.payload.additionalData;

    switch (type) {
      case 'news':
        if (subject && subject === 'summaries') {
          props.navigation.push('SummaryDetail', { id: post });
        } else {
          props.navigation.push('NewsDetail', { _id: post });
        }
        break;
      case 'share':
        props.navigation.push('NewsDetail', { _id: post });
        break;
      case 'issue':
        props.navigateMainTab('Focus');
        break;
    
      default:
        break;
    }
  }

  // _retrieveData = async (id) => {
  //   try {
  //     const value = await AsyncStorage.getItem('localhost');
  //     if (value !== null) {
  //       // We have data!!
  //       OneSignal.sendTags({ ip: value.replace('http://', '').replace(':8080', ''), user_id: id });
  //       OneSignal.inFocusDisplaying(2);
  //       OneSignal.addEventListener('opened', (openResult) => this.onOpened(openResult, this.props));
  //       OneSignal.configure();
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  render() {
    const { loading, userData } = this.state;

    if (loading) return null;

    return (
      <View style={styles.container}>
        {/* <Image
          source={images.userImage}
          style={styles.imageSize}
          resizeMode='cover'
        /> */}
        <Gravatar
          options={{
            email: userData.email,
            parameters: { size: '70', d: 'mm' },
            secure: true
          }}
          style={styles.imageSize}
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
    height: 70,
    borderRadius: 35
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


import React from 'react';
import {
  View,
  StyleSheet,
  YellowBox,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
// import _ from 'lodash';
// import OneSignal from 'react-native-onesignal';

import * as commonActions from '../../../redux/actions';
import FullGradient from '../Reusables/FullGradient';
import Scale from '../../theme/scale';
import platform from '../../theme/platform';
import imageurls from '../../assets/images';
// import { axiosClient } from '../../../redux/store/axiosMiddleware';

@connect(
  state => ({
    tokenAccess: state.tokenAccess
  }),
  { ...commonActions }
)
export default class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings(
      ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
      ]);

    this.state = {
      username: '',
      password: '',
      localhost: 'http://35.196.179.240:8080',
      // localhost: 'http://192.168.92.90:8080',
      loading: false
    };

    this.flag = false;
  }

  componentDidMount() {
    const { tokenAccess: { data }, navigation } = this.props;

    if (data.token) {
      navigation.replace('DrawerApp');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { tokenAccess: { data } } = nextProps;

    if (data.token) {
      this.props.navigation.replace('DrawerApp');
    } else if (this.flag) {
      Alert.alert(
        I18n.t('login.alertTitle'),
        I18n.t('login.alertContent'),
        [
          { text: 'OK', onPress: () => null }
        ],
        { cancelable: false }
      );
    }

    this.setState({
      loading: false
    });
  }

  onLogin = async () => {
    const { username, password } = this.state;

    await this.props.saveLocalhost(this.state.localhost);
    this.setState({
      loading: true
    });
    this.flag = true;

    this.props.login({ username, password });
  }

  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('localhost');
  //     if (value !== null) {
  //       // We have data!!
  //       if (_.endsWith(value, ':8080')) {
  //         axiosClient.defaults.baseURL = value;
  //         OneSignal.sendTag('ip', value.replace('http://', '').replace(':8080', ''));
  //         if (!this.flag) {
  //           this.props.navigation.replace('DrawerApp');
  //         }
  //       } else {
  //         axiosClient.defaults.baseURL = '';
  //       }
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  render() {
    const { username, password, loading, localhost } = this.state;
    const statusLogin = loading ?
      <ActivityIndicator color={platform.primaryBlue} /> :
      <Text style={styles.txtLogin}>{I18n.t('login.title')}</Text>;

    return (
      <FullGradient
        containerStyle={styles.container}
      >
        <View style={styles.wrapImage}>
          <Image
            style={styles.image}
            source={imageurls.logoApp}
          />
        </View>
        <View style={styles.wrapTextInput}>
          <TextInput
            style={styles.txtInput}
            placeholderTextColor={platform.inputColorPlaceholder}
            underlineColorAndroid="transparent"
            autoCapitalize='none'
            placeholder={I18n.t('login.username')}
            onChangeText={text => this.setState({ username: text })}
            value={username}
          />
        </View>
        <View style={styles.wrapTextInput}>
          <TextInput
            style={styles.txtInput}
            placeholderTextColor={platform.inputColorPlaceholder}
            underlineColorAndroid="transparent"
            autoCapitalize='none'
            placeholder={I18n.t('login.password')}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
            value={password}
          />
        </View>
        <View style={styles.wrapTextInput}>
          <TextInput
            style={styles.txtInput}
            placeholderTextColor={platform.inputColorPlaceholder}
            underlineColorAndroid="transparent"
            placeholder={'Localhost'}
            onChangeText={text => this.setState({ localhost: text })}
            value={localhost}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.onLogin}
        >
          <FullGradient
            backgroundColor={platform.buttonColorGradient}
            containerStyle={styles.buttonLogin}
          >
            {statusLogin}
          </FullGradient>
        </TouchableOpacity>
      </FullGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapImage: {
    paddingBottom: Scale.getSize(35)
  },
  image: {
    width: Scale.getSize(100),
    height: Scale.getSize(100)
  },
  wrapTextInput: {
    paddingHorizontal: Scale.getSize(10),
    paddingVertical: platform.platform === 'ios' ? Scale.getSize(10) : 0,
    width: platform.deviceWidth - 50,
    borderColor: platform.containerBg,
    borderWidth: 2,
    borderRadius: platform.borderRadius,
    marginBottom: Scale.getSize(20)
  },
  txtInput: {
    color: platform.containerBg,
    fontSize: Scale.getSize(18)
  },
  txtLogin: {
    color: platform.primaryBlue,
    fontSize: Scale.getSize(18)
  },
  buttonLogin: {
    paddingVertical: Scale.getSize(15),
    width: platform.deviceWidth - 50,
    borderRadius: platform.borderRadius,
    marginBottom: Scale.getSize(20),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

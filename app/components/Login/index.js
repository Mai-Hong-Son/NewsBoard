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
  ActivityIndicator,
  ScrollView
  // AsyncStorage
} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import moment from 'moment';
import 'moment/locale/en-au';
import 'moment/locale/vi';
// import _ from 'lodash';
import OneSignal from 'react-native-onesignal';

import * as commonActions from '../../../redux/actions';
import FullGradient from '../Reusables/FullGradient';
import Scale from '../../theme/scale';
import platform from '../../theme/platform';
import imageurls from '../../assets/images';
// import { axiosClient } from '../../../redux/store/axiosMiddleware';

@connect(
  state => ({
    tokenAccess: state.tokenAccess,
    language: state.language,
    localhost: state.localhost
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
      username: props.tokenAccess.account.username ? props.tokenAccess.account.username : '',
      password: props.tokenAccess.account.password ? props.tokenAccess.account.password : '',
      localhost: !props.localhost.data.payload ? 'http://35.196.179.240:8080' : props.localhost.data.payload,
      // localhost: 'http://192.168.92.90:8080',
      loading: false
    };

    this.flag = false;
  }

  componentDidMount() {
    const { tokenAccess: { data }, navigation, language } = this.props;
    const { state: { params: { deleteTag } } } = navigation;
    I18n.locale = language.data;
    moment.locale(language.data);
    if (deleteTag && deleteTag) {
      OneSignal.deleteTag('ip');
      OneSignal.deleteTag('user_id');
      OneSignal.configure();
    }

    if (data.token) {
      navigation.replace('DrawerApp');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { tokenAccess: { data }, language } = nextProps;

    if (this.props.language.data !== nextProps.language.data) {
      I18n.locale = language.data;
      moment.locale(language.data);
    }

    if (data.token) {
      this.props.navigation.replace('DrawerApp');
    } else if (this.flag) {
      Alert.alert(
        I18n.t('login.alertTitle'),
        I18n.t('login.alertContent'),
        [
          {
            text: 'OK',
            onPress: () => {
              this.setState({ loading: false });
              this.flag = false;
            }
          }
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

  render() {
    const { username, password, loading, localhost } = this.state;
    const statusLogin = loading ?
      <ActivityIndicator color={platform.primaryBlue} /> :
      <Text style={styles.txtLogin}>{I18n.t('login.title')}</Text>;

    return (
      <FullGradient
        containerStyle={styles.container}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
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
            style={{ width: '90%' }}
            onPress={() => (this.state.loading ? null : this.onLogin())}
          >
            <FullGradient
              backgroundColor={platform.buttonColorGradient}
              containerStyle={styles.buttonLogin}
            >
              {statusLogin}
            </FullGradient>
          </TouchableOpacity>
        </ScrollView>
      </FullGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    width: '90%',
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
    width: '100%',
    borderRadius: platform.borderRadius,
    marginBottom: Scale.getSize(20),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

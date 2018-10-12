import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import FullGradient from '../Reusables/FullGradient';
import PersonalInfo from './PersonalInfo';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';

@connect(
  state => ({
    subjects: state.subjects,
    tokenAccess: state.tokenAccess
  }),
  { ...commonActions }
)
export default class SideMenu extends React.PureComponent {
  state = {
    loading: true,
    subjectsData: [],
    isClickLogout: false
  };

  componentDidMount() {
    this.props.getSubjects();
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { subjects: { error, data }, tokenAccess: { error: errLogout } } = nextProps;

    if (!error) {
      this.setState({
        subjectsData: data,
        loading: false
      });
    }

    if (!errLogout && this.state.isClickLogout) {
      this.setState({
        isClickLogout: false
      }, () => this.props.navigation.navigate('Login'));
    }
  }

  onRefresh = () => {
    this.setState({
      loading: true
    }, () => this.props.getSubjects());
  }

  onLogout = () => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn đăng xuất ứng dụng?',
      [
        { text: 'Hủy', onPress: () => null },
        {
          text: 'Đồng ý',
          onPress: () => this.setState({
            isClickLogout: true
          }, () => this.props.logout())
        }
      ],
      { cancelable: false }
    );
  }

  // navigateToScreen = (route, queryObject) => () => {
  //   const navigateAction = NavigationActions.navigate({
  //     routeName: route
  //   });
  //   this.props.navigation.dispatch(navigateAction);
  // }

  renderItem = ({ item }) => {
    const { name, matched_count, avatar, type, search_query } = item;
    const { navigation } = this.props;
    let typeSubject = '';

    switch (type) {
      case '1':
        typeSubject = 'NÓNG';
        break;
      case '2':
        typeSubject = 'SỰ KIỆN';
        break;
      case '3':
        typeSubject = 'LÃNH ĐẠO';
        break;
      case '4':
        typeSubject = 'ĐỐI TƯỢNG';
        break;
      case '5':
        typeSubject = 'TỔ CHỨC';
        break;
      case '6':
        typeSubject = 'CÁ NHÂN';
        break;

      default:
        break;
    }

    return (
      <View>
        <Text style={styles.txtTypeSubject}>{typeSubject}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ArticleBySubject', { search_query })}>
          <View style={styles.wrapItemSubject}>
            <Image
              style={{ height: Scale.getSize(40), width: Scale.getSize(40), borderRadius: Scale.getSize(20) }}
              source={{ uri: avatar }}
            />
            <Text style={styles.txtSubjectName}>{name}</Text>
            <Text style={styles.txtSubjectNotif}>{matched_count}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { loading, subjectsData } = this.state;

    return (
      <FullGradient containerStyle={styles.container}>
        <PersonalInfo />
        <FlatList
          data={subjectsData}
          refreshing={loading}
          onRefresh={this.onRefresh}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.footerStyle}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')}>
            <View style={styles.contentFooter}>
              <Icon name='ios-cog' size={Scale.getSize(35)} color={'#fff'} />
              <Text style={styles.txtFooterStyle}>{'Cài đặt'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLogout}>
            <View style={styles.contentFooter}>
              <Icon name='ios-log-out' size={Scale.getSize(35)} color={'#fff'} />
              <Text style={styles.txtFooterStyle}>{'Đăng xuất'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </FullGradient >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: Scale.getSize(5)
  },
  wrapItemSubject: {
    paddingVertical: Scale.getSize(5),
    paddingHorizontal: Scale.getSize(15),
    backgroundColor: '#fff',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Scale.getSize(30)
  },
  txtSubjectName: {
    fontSize: Scale.getSize(18),
    fontWeight: '600'
  },
  txtSubjectNotif: {
    fontSize: Scale.getSize(15),
    fontWeight: '600',
    color: 'red'
  },
  txtTypeSubject: {
    paddingVertical: Scale.getSize(10),
    paddingLeft: Scale.getSize(15),
    fontSize: Scale.getSize(16),
    fontWeight: '700',
    color: '#fff'
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Scale.getSize(15),
    paddingVertical: Scale.getSize(25)
  },
  contentFooter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtFooterStyle: {
    fontSize: Scale.getSize(15),
    color: '#fff',
    paddingLeft: Scale.getSize(10)
  }
});


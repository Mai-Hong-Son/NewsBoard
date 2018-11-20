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
import OneSignal from 'react-native-onesignal';
import I18n from 'react-native-i18n';

import FullGradient from '../Reusables/FullGradient';
import PersonalInfo from './PersonalInfo';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import platform from '../../theme/platform';

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

  async componentDidMount() {
    this.props.getSubjects();
    await this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { subjects: { error, data }, tokenAccess: { error: errLogout } } = nextProps;

    if (!error) {
      this.setState({
        subjectsData: data.filter(item => item.hidden === false),
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
      I18n.t('sidemenu.alertTitle'),
      I18n.t('sidemenu.alertLogout'),
      [
        { text: I18n.t('modal.cancel'), onPress: () => null },
        {
          text: I18n.t('modal.confirm'),
          onPress: () => this.setState({
            isClickLogout: true
          }, () => {
            OneSignal.deleteTag('ip');
            OneSignal.deleteTag('user_id');
            OneSignal.configure();
            this.props.logout();
          })
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
    const { name, matched_count, avatar, search_query, notify } = item;
    const { navigation } = this.props;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ArticleBySubject', { search_query, name: `${name} (${matched_count})` })}>
        <View style={styles.wrapItemSubject}>
          {avatar === '' ?
            (<View style={styles.imageEmpty}>
              <Text style={styles.txtEmpty}>{name.slice(0, 1).toUpperCase()}</Text>
            </View>)
            : <Image
              style={{ height: Scale.getSize(40), width: Scale.getSize(40), borderRadius: Scale.getSize(20) }}
              source={{ uri: avatar }}
            />}
          <Text style={[styles.txtSubjectName, { fontWeight: notify === 1 ? '800' : '500' }]}>{name}</Text>
          <Text style={styles.txtSubjectNotif}>{matched_count}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderGroupItem = ({ item }) => {
    const { subjectsData } = this.state;

    return (
      <View>
        {
          subjectsData.filter(it => it.type === item.id).length === 0 ? null :
            <Text style={styles.txtTypeSubject}>{item.name.toUpperCase()}</Text>
        }
        <FlatList
          data={subjectsData.filter(it => it.type === item.id)}
          renderItem={this.renderItem}
          extraData={subjectsData}
          keyExtractor={(it, index) => index.toString()}
        />
      </View>
    );
  }

  render() {
    const { loading } = this.state;
    const topicData = [
      {
        id: '2',
        name: I18n.t('subjects.eventHot')
      },
      {
        id: '3',
        name: I18n.t('subjects.event')
      },
      {
        id: '6',
        name: I18n.t('subjects.leader')
      },
      {
        id: '5',
        name: I18n.t('subjects.organization')
      },
      {
        id: '4',
        name: I18n.t('subjects.object')
      },
      {
        id: '7',
        name: I18n.t('subjects.personal')
      }
    ];

    return (
      <FullGradient containerStyle={styles.container}>
        <PersonalInfo navigation={this.props.navigation} />
        <FlatList
          data={topicData}
          refreshing={loading}
          onRefresh={this.onRefresh}
          renderItem={this.renderGroupItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.footerStyle}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')}>
            <View style={styles.contentFooter}>
              <Icon name='ios-cog' size={Scale.getSize(35)} color={'#fff'} />
              <Text style={styles.txtFooterStyle}>{I18n.t('sidemenu.setting')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLogout}>
            <View style={styles.contentFooter}>
              <Icon name='ios-log-out' size={Scale.getSize(35)} color={'#fff'} />
              <Text style={styles.txtFooterStyle}>{I18n.t('sidemenu.logout')}</Text>
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
    paddingHorizontal: Scale.getSize(12),
    backgroundColor: '#fff',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: Scale.getSize(8)
  },
  txtSubjectName: {
    fontSize: Scale.getSize(18),
    // fontWeight: '500',
    color: '#000',
    paddingHorizontal: Scale.getSize(20),
    flex: 1
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
  },
  imageEmpty: {
    height: Scale.getSize(40),
    width: Scale.getSize(40),
    borderRadius: Scale.getSize(20),
    backgroundColor: platform.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtEmpty: {
    fontSize: Scale.getSize(15),
    color: '#fff',
    fontWeight: '800'
  }
});


import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from 'react-native-i18n';
import { Gravatar } from 'react-native-gravatar';
// import Modal from 'react-native-modal';

import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';
import * as commonActions from '../../../redux/actions';
import platform from '../../theme/platform';
import Scale from '../../theme/scale';

function getItemsByArrayId(arr1, arr2) {
  const arr3 = [];

  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j].id === arr2[i]) {
        arr3.push(arr1[j]);
      }
    }
  }

  return arr3.length === 0 ? arr1 : arr3;
}

@connect(
  state => ({
    issues: state.issues,
    userInfo: state.userInfo,
    users: state.users,
    updateIssue: state.updateIssue
  }),
  { ...commonActions }
)
export default class Focus extends React.Component {
  state = {
    isFirstime: false,
    isTabLeft: true,
    isTabRight: false,
    data: [],
    loading: true,
    showModal: false
  }

  componentDidMount() {
    // await this.props.getUsers();
    if (!this.state.isFirstime) {
      this.setState({
        isFirstime: true
      }, () => this.onRefresh());
    }
  }

  componentWillReceiveProps(nextProps) {
    const { issues: { data, error }, userInfo: { data: { id } } } = nextProps;
    const { isTabLeft, isTabRight } = this.state;

    if (!error) {
      if (isTabLeft && !isTabRight) {
        this.setState({
          data: data.filter(item => item.created_by !== id && !item.deleted),
          loading: false
        });
      } else if (!isTabLeft && isTabRight) {
        this.setState({
          loading: false,
          data: data.filter(item => item.created_by === id && !item.deleted)
        });
      }
    }
  }

  componentWillUnmount() {
    NavigationEvents.removeEventListener('onWillFocus');
  }

  onRefresh = () => {
    this.setState({
      loading: true
    }, () => this.props.getIssues());
  }

  onChooseTabLeft = () => {
    const { userInfo: { data: { id } }, issues: { data } } = this.props;

    this.setState({
      isTabLeft: true,
      isTabRight: false,
      data: data.filter(item => item.created_by !== id && !item.deleted)
    });
  }

  onChooseTabRight = () => {
    const { userInfo: { data: { id } }, issues: { data } } = this.props;

    this.setState({
      isTabLeft: false,
      isTabRight: true,
      data: data.filter(item => item.created_by === id && !item.deleted)
    });
  }

  onPressAdd = () => {
    const { navigation: { navigate } } = this.props;

    navigate('IssuesDetail', {
      titleHeader: I18n.t('issues.add'),
      dataSaved: {
        title: '',
        description: '',
        created_time: new Date(),
        duedate: new Date(),
        assignees: [],
        completed: false
      },
      type: 'create'
    });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  showModalAsign = () => this.setState({ showModal: !this.state.showModal });

  renderListUserReceive(assignees) {
    const { users: { data: listUser } } = this.props;
    const result = getItemsByArrayId(listUser, assignees);

    return `${result.map(item => (`${this.capitalizeFirstLetter(item.username)}`))}`;
  }

  renderItem = ({ item }) => {
    const { title, created_time, completed, created_by, assignees } = item;
    const { navigation: { navigate }, userInfo: { data }, users: { data: listUser } } = this.props;
    const nameUserCreate = listUser.filter(it => it.id === created_by)[0];

    return (
      <TouchableWithoutFeedback
        onPress={() => navigate('IssuesDetail', {
          titleHeader: I18n.t('issues.update'),
          dataSaved: item,
          type: 'update'
        })}
      >
        <View style={styles.wrapItemView}>
          <View style={styles.contentRightStyle}>
            <Text style={styles.txtContentRight}>{data.username.slice(0, 1).toUpperCase()}</Text>
          </View>
          <View style={styles.wrapItem}>
            <View style={{ paddingRight: 10, flex: 1 }}>
              <Text style={styles.txtTitle}>{title}</Text>
              <View>
                {nameUserCreate ? <Gravatar
                  options={{
                    email: nameUserCreate.email,
                    parameters: { size: '70', d: 'mm' },
                    secure: true
                  }}
                  style={{
                    width: Scale.getSize(15),
                    height: Scale.getSize(15),
                    borderRadius: Scale.getSize(15) / 2
                  }}
                /> : null}
                <Text style={styles.txtTimeTitle} numberOfLines={1}>
                  {nameUserCreate ? this.capitalizeFirstLetter(nameUserCreate.username) : this.renderListUserReceive(assignees)}
                </Text>
              </View>
              <Text style={styles.txtTimeTitle}>{moment(created_time).fromNow()}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {completed ? <Icon name='ios-checkmark-circle' color={'#00cc66'} size={Scale.getSize(25)} /> : null}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { navigation } = this.props;
    const { isTabLeft, isTabRight, data, loading, isFirstime } = this.state;

    return (
      <SafeArea>
        <NavigationEvents
          onWillFocus={() => {
            if (isFirstime) {
              this.onRefresh();
            }
          }}
        />
        <Header
          title={I18n.t('issues.title')}
          navigation={navigation}
          iconName={'plus'}
          onPress={this.onPressAdd}
        />
        <ScrollView
          horizontal
          style={{
            flexGrow: 0,
            flexShrink: 0
          }}
          scrollEnabled={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <TouchableWithoutFeedback onPress={this.onChooseTabLeft}>
            <View style={[styles.tabStyle, { borderBottomColor: isTabLeft ? 'red' : platform.primaryBlue }]}>
              <Text style={styles.txtTabStyle}>{I18n.t('issues.sendToMe').toUpperCase()}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onChooseTabRight}>
            <View style={[styles.tabStyle, { borderBottomColor: isTabRight ? 'red' : platform.primaryBlue }]}>
              <Text style={styles.txtTabStyle}>{I18n.t('issues.sendFromMe').toUpperCase()}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <FlatList
          data={data}
          contentContainerStyle={styles.wrapContentFlatlist}
          keyExtractor={(it, index) => it.id.toString()}
          renderItem={this.renderItem}
          refreshing={loading}
          onRefresh={this.onRefresh}
          showsVerticalScrollIndicator={false}
        />
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff'
  // },
  contentContainerStyle: {
    width: '100%',
    height: 40,
    backgroundColor: platform.primaryBlue
  },
  wrapContentFlatlist: {
    paddingTop: Scale.getSize(10),
    paddingHorizontal: Scale.getSize(15),
    paddingBottom: 60
  },
  wrapItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderBottomColor: 'rgb(237,237,237)',
    // borderBottomWidth: 1,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 15
  },
  txtTitle: {
    paddingBottom: 4,
    fontSize: Scale.getSize(18),
    color: '#000',
    fontWeight: '700'
  },
  txtTimeTitle: {
    color: 'rgb(137,137,137)',
    fontSize: Scale.getSize(15),
    paddingBottom: 4
  },
  tabStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3
  },
  txtTabStyle: {
    color: platform.containerBg,
    fontSize: Scale.getSize(16),
    fontWeight: '700'
  },
  wrapItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Scale.getSize(10),
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#777',
    shadowOpacity: 0.3,
    shadowRadius: Scale.getSize(3),
    elevation: Scale.getSize(1),
    paddingHorizontal: Scale.getSize(10)
  },
  contentRightStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cc66',
    borderRadius: 25,
    height: 50,
    width: 50
  },
  txtContentRight: {
    fontSize: Scale.getSize(25),
    color: '#fff'
  }
});

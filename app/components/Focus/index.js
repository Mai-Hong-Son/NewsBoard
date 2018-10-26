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
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';
import * as commonActions from '../../../redux/actions';
import platform from '../../theme/platform';
import Scale from '../../theme/scale';

@connect(
  state => ({
    issues: state.issues,
    userInfo: state.userInfo
  }),
  { ...commonActions }
)
export default class Focus extends React.Component {
  state = {
    isTabLeft: true,
    isTabRight: false,
    data: [],
    loading: true
  }

  componentDidMount() {
    this.onRefresh();
    this.props.navigation.addListener('willFocus', () => {
      this.onRefresh();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { issues: { data, error }, userInfo: { data: { id } } } = nextProps;
    const { isTabLeft, isTabRight } = this.state;

    if (!error) {
      if (isTabLeft && !isTabRight) {
        this.setState({
          data: data.filter(item => item.created_by !== id),
          loading: false
        });
      } else if (!isTabLeft && isTabRight) {
        this.setState({
          loading: false,
          data: data.filter(item => item.created_by === id)
        });
      }
    }
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
      data: data.filter(item => item.created_by !== id)
    });
  }

  onChooseTabRight = () => {
    const { userInfo: { data: { id } }, issues: { data } } = this.props;

    this.setState({
      isTabLeft: false,
      isTabRight: true,
      data: data.filter(item => item.created_by === id)
    });
  }

  onPressAdd = () => {
    const { navigation: { navigate } } = this.props;

    navigate('IssuesDetail', {
      titleHeader: 'Thêm tiêu điểm',
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

  renderItem = ({ item }) => {
    const { title, description, created_time, completed } = item;
    const { navigation: { navigate }, userInfo: { data } } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => navigate('IssuesDetail', {
          titleHeader: 'Chỉnh sửa tiêu điểm',
          dataSaved: item,
          type: 'update'
        })}
      >
        <View style={styles.wrapItemView}>
          <View style={styles.contentRightStyle}>
            <Text style={styles.txtContentRight}>{data.username.slice(0, 1).toUpperCase()}</Text>
          </View>
          <View style={styles.wrapItem}>
            <View>
              <Text style={styles.txtTitle}>{title}</Text>
              <Text style={styles.txtTimeTitle}>{moment(created_time).fromNow()}</Text>
            </View>
            {completed ? <Icon name='ios-checkmark-circle' color={'#00cc66'} size={Scale.getSize(25)} /> : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { navigation } = this.props;
    const { isTabLeft, isTabRight, data, loading } = this.state;

    return (
      <SafeArea>
        <Header
          title={'Tiêu điểm'}
          navigation={navigation}
          iconName={'plus-square'}
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
              <Text style={styles.txtTabStyle}>{'ĐƯỢC GIAO'}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onChooseTabRight}>
            <View style={[styles.tabStyle, { borderBottomColor: isTabRight ? 'red' : platform.primaryBlue }]}>
              <Text style={styles.txtTabStyle}>{'ĐÃ GIAO'}</Text>
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
    paddingHorizontal: Scale.getSize(15)
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

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
    this.props.navigation.addListener('willFocus', () => {
      this.onRefresh();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { issues: { data, error }, userInfo: { id } } = nextProps;
    const { isTabLeft, isTabRight } = this.state;

    if (!error) {
      if (isTabLeft && !isTabRight) {
        this.setState({
          data: data.filter(item => item.create_by !== id),
          loading: false
        });
      } else if (!isTabLeft && isTabRight) {
        this.setState({
          loading: false,
          data: data.filter(item => item.create_by === id)
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
    const { userInfo: { id }, issues: { data } } = this.props;

    this.setState({
      isTabLeft: true,
      isTabRight: false,
      data: data.filter(item => item.create_by !== id)
    });
  }

  onChooseTabRight = () => {
    const { userInfo: { id }, issues: { data } } = this.props;

    this.setState({
      isTabLeft: false,
      isTabRight: true,
      data: data.filter(item => item.create_by === id)
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
    const { title, description, created_time } = item;
    const { navigation: { navigate } } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => navigate('IssuesDetail', {
          titleHeader: 'Chỉnh sửa tiêu điểm',
          dataSaved: item,
          type: 'update'
        })}
      >
        <View style={styles.wrapItem}>
          <View>
            <Text style={styles.txtTitle}>{title}</Text>
            <Text>{description}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.txtTitle}>{moment(created_time).fromNow()}</Text>
            <Icon name='ios-arrow-forward' color={'rgb(91,91,91)'} size={Scale.getSize(18)} />
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
        <View style={styles.boxFlatlist}>
          <FlatList
            data={data}
            contentContainerStyle={styles.wrapContentFlatlist}
            keyExtractor={(it, index) => index.toString()}
            renderItem={this.renderItem}
            refreshing={loading}
            onRefresh={this.onRefresh}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
    width: platform.deviceWidth,
    height: 40,
    backgroundColor: platform.primaryBlue
  },
  boxFlatlist: {
    paddingHorizontal: Scale.getSize(15)
  },
  wrapContentFlatlist: {
    paddingTop: Scale.getSize(10)
  },
  wrapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgb(237,237,237)',
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  txtTitle: {
    paddingBottom: 4,
    fontSize: Scale.getSize(18),
    color: '#000'
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
  }
});

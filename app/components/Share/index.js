import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
// import moment from 'moment';

import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';
import * as commonActions from '../../../redux/actions';
import platform from '../../theme/platform';
import Scale from '../../theme/scale';
import ArticleLarge from '../News/ArticleView/ArticleLarge';
import ArticleSmall from '../News/ArticleView/ArticleSmall';

@connect(
  state => ({
    articleShareForMe: state.articleShareForMe,
    articleShareByMe: state.articleShareByMe,
    deleteArticleShareByMe: state.deleteArticleShareByMe,
    deleteArticleShareForMe: state.deleteArticleShareForMe
  }),
  { ...commonActions }
)
export default class Share extends React.Component {
  state = {
    isTabLeft: true,
    isTabRight: false,
    data: [],
    loading: true,
    changeView: true,
    onClickDelete: false,
    showModal: false,
    uniqueId: null
  }

  componentDidMount() {
    this.onRefresh();
    this.props.navigation.addListener('willFocus', () => {
      this.onRefresh();
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      articleShareForMe: { data: dataArticleShareForMe, error: errArticleShareForMe },
      articleShareByMe: { data: dataArticleShareByMe, error: errArticleShareByMe },
      deleteArticleShareByMe,
      deleteArticleShareForMe
    } = nextProps;
    const { isTabLeft, isTabRight, onClickDelete } = this.state;

    if (!errArticleShareForMe && !errArticleShareByMe) {
      if (isTabLeft && !isTabRight) {
        this.setState({
          data: dataArticleShareForMe,
          loading: false
        });
      } else if (!isTabLeft && isTabRight) {
        this.setState({
          loading: false,
          data: dataArticleShareByMe
        });
      }
    }

    if (onClickDelete &&
      !deleteArticleShareForMe.error &&
      !deleteArticleShareByMe.error) {
      Alert.alert(
        'Thông báo',
        'Xóa bài thành công',
        [
          {
            text: 'OK',
            onPress: () => this.setState({
              onClickDelete: false
            }, () => this.onRefresh())
          }
        ],
        { cancelable: false }
      );
    }
  }

  onPress = () => {
    this.setState({
      changeView: !this.state.changeView
    });
  }

  onRefresh = () => {
    const { isTabLeft, isTabRight } = this.state;

    this.setState({
      loading: true
    }, () => {
      if (isTabLeft && !isTabRight) {
        this.props.getArticleShareForMe();
      } else if (!isTabLeft && isTabRight) {
        this.props.getArticleShareByMe();
      }
    });
  }

  onChooseTabLeft = () => {
    this.setState({
      isTabLeft: true,
      isTabRight: false,
      loading: true
    }, () => this.props.getArticleShareForMe());
  }

  onChooseTabRight = () => {
    this.setState({
      isTabLeft: false,
      isTabRight: true,
      loading: true
    }, () => this.props.getArticleShareByMe());
  }

  onDeleteArticle = () => {
    const { isTabLeft, isTabRight, uniqueId } = this.state;

    this.setState({
      onClickDelete: true,
      showModal: !this.state.showModal
    }, () => {
      if (isTabLeft && !isTabRight) {
        this.props.deleteArticleShareForMe(uniqueId);
      } else if (!isTabLeft && isTabRight) {
        this.props.deleteArticleShareByMe(uniqueId);
      }
    });
  }

  showModalAsign = () => this.setState({ showModal: !this.state.showModal });

  renderArticleItem = ({ item }) => {
    const { id, unique_id } = item;
    const { navigation: { navigate } } = this.props;

    return (
      <TouchableOpacity
        onPress={() => navigate('NewsDetail', { _id: id })}
        onLongPress={() => {
          this.setState({
            uniqueId: unique_id
          }, () => this.showModalAsign());
        }}
      >
        {this.state.changeView ? <ArticleSmall source={item} /> : <ArticleLarge source={item} />}
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;
    const { isTabLeft, isTabRight, data, loading } = this.state;

    return (
      <SafeArea>
        <Header
          title={'Chia sẻ'}
          navigation={navigation}
          onPress={this.onPress}
          iconName={this.state.changeView ? 'th-list' : 'th-large'}
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
              <Text style={styles.txtTabStyle}>{'ĐƯỢC CHIA SẺ'}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onChooseTabRight}>
            <View style={[styles.tabStyle, { borderBottomColor: isTabRight ? 'red' : platform.primaryBlue }]}>
              <Text style={styles.txtTabStyle}>{'ĐÃ CHIA SẺ'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <FlatList
          data={data}
          renderItem={this.renderArticleItem}
          refreshing={loading}
          onRefresh={this.onRefresh}
          contentContainerStyle={styles.wrapArticle}
          extraData={this.state.changeView}
          numColumns={this.state.changeView ? 1 : 2}
          key={(this.state.changeView ? 'h' : 'v')}
          keyExtractor={(it) => it.id.toString()}
        />
        <Modal
          isVisible={this.state.showModal}
          onBackdropPress={this.showModalAsign}
        >
          <View style={{ backgroundColor: '#fff' }}>
            <TouchableOpacity onPress={this.onDeleteArticle}>
              <Text style={{ fontSize: Scale.getSize(16), color: '#000', padding: Scale.getSize(10) }}>{'Xóa bài chia sẻ'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  },
  wrapArticle: {
    padding: Scale.getSize(15)
  }
});

import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import Header from '../Reusables/Header';
import images from '../../assets/images';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import platform from '../../theme/platform';

const IMAGE_SIZE_HEIGHT = Scale.getSize(80);
const IMAGE_SIZE_WIDTH = Scale.getSize(120);
const TXT_BOX_SIZE = platform.deviceWidth - Scale.getSize(45) - IMAGE_SIZE_WIDTH;

@connect(
  state => ({
    summaries: state.summaries
  }),
  { ...commonActions }
)
export default class Newspaper extends React.Component {
  state = {
    loading: true,
    loadMore: false,
    page: 1,
    data: []
  }

  componentDidMount() {
    this.props.getSummaries(1, 10);
  }

  componentWillReceiveProps(nextProps) {
    const { summaries: { data }, error } = nextProps;

    if (!error) {
      this.setState({
        data,
        loading: false,
        loadMore: false
      });
    }
  }

  onRefresh = () => {
    this.setState({
      loading: true
    }, () => {
      this.props.getSummaries(1, 10);
    });
  }

  onEndReached = () => {
    const { summaries: { hasMore } } = this.props;
    const { loading } = this.state;

    if (loading || !hasMore) return;

    this.setState({
      page: this.state.page + 1,
      loadMore: true
    }, () => {
      this.props.getSummaries(this.state.page, 10);
    });
  }

  renderSummaryItem = ({ item }) => {
    const { title, updated_time, creator } = item;

    return (
      <View style={styles.containerItem}>
        <View style={styles.wrapImage}>
          <Image
            style={styles.image}
            source={images.summaryImage}
          />
        </View>
        <View style={styles.wrapTxtBox}>
          <Text numberOfLines={2} style={styles.titleArticle}>{title}</Text>
          <Text style={styles.txtArticleSrc}>{`Được tạo bởi: ${creator} | ${moment(updated_time).fromNow()}`}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    const { loading, data, loadMore } = this.state;

    return (
      <View style={styles.container}>
        <Header title={'Tin tham khảo'} navigation={navigation} />
        <FlatList
          data={data}
          renderItem={this.renderSummaryItem}
          refreshing={loading}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={platform.platform === 'ios' ? 0 : 0.5}
          onEndReached={this.onEndReached}
          ListFooterComponent={loadMore ? <ActivityIndicator /> : null}
          keyExtractor={(it, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerItem: {
    padding: Scale.getSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrapImage: {
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: Scale.getSize(1) },
    shadowColor: '#777',
    shadowOpacity: 0.3,
    shadowRadius: Scale.getSize(3),
    elevation: Scale.getSize(1)
  },
  image: {
    height: IMAGE_SIZE_HEIGHT,
    width: IMAGE_SIZE_WIDTH,
    borderRadius: 4
  },
  txtEmpty: {
    fontSize: Scale.getSize(20),
    color: platform.primaryBlue,
    fontWeight: '800'
  },
  wrapTxtBox: {
    width: TXT_BOX_SIZE
  },
  titleArticle: {
    width: TXT_BOX_SIZE,
    paddingBottom: Scale.getSize(8),
    fontSize: Scale.getSize(18)
  },
  txtArticleSrc: {
    fontSize: Scale.getSize(12),
    color: platform.borderColor,
    width: TXT_BOX_SIZE
  }
});

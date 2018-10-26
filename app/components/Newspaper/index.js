import React from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';

import Header from '../Reusables/Header';
import images from '../../assets/images';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import platform from '../../theme/platform';
import SafeArea from '../../theme/SafeArea';

const IMAGE_SIZE_HEIGHT = Scale.getSize(50);
const IMAGE_SIZE_WIDTH = Scale.getSize(90);
// const TXT_BOX_SIZE = platform.deviceWidth - Scale.getSize(45) - IMAGE_SIZE_WIDTH;

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
    page: 0,
    data: []
  }

  componentDidMount() {
    this.props.getSummaries(0, 10);
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
      this.props.getSummaries(0, 10);
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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderSummaryItem = ({ item }) => {
    const { title, updated_time, creator, id } = item;
    const { navigation: { navigate } } = this.props;

    return (
      <TouchableOpacity onPress={() => navigate('SummaryDetail', { id })}>
        <View style={styles.containerItem}>
          <View style={styles.wrapImage}>
            <Image
              style={styles.image}
              source={images.summaryImage}
            />
          </View>
          <View style={styles.wrapTxtBox}>
            <Text numberOfLines={2} style={styles.titleArticle}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.txtArticleSrc, { color: '#000' }]}>{`${this.capitalizeFirstLetter(creator)} | `}</Text>
              <Text style={styles.txtArticleSrc}>{moment(updated_time).fromNow()}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;
    const { loading, data, loadMore } = this.state;

    return (
      <SafeArea>
        <Header title={'Tin tham khảo'} navigation={navigation} />
        <FlatList
          data={data}
          renderItem={this.renderSummaryItem}
          contentContainerStyle={{ paddingBottom: 15 }}
          refreshing={loading}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={platform.platform === 'ios' ? 0 : 0.5}
          onEndReached={this.onEndReached}
          ListFooterComponent={loadMore ? <ActivityIndicator /> : null}
          keyExtractor={(it, index) => index.toString()}
        />
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerItem: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomColor: 'rgb(237,237,237)',
    borderBottomWidth: 1
    // justifyContent: 'space-between'
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
    width: '70%',
    paddingLeft: 15
  },
  titleArticle: {
    // width: TXT_BOX_SIZE,
    paddingBottom: Scale.getSize(8),
    fontSize: Scale.getSize(18),
    color: '#000'
  },
  txtArticleSrc: {
    fontSize: Scale.getSize(14),
    color: platform.borderColor
    // width: TXT_BOX_SIZE
  }
});

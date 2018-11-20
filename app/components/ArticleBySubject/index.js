import React from 'react';
import {
  View,
  StyleSheet,
  // ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';

// import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../Reusables/Header';
import ArticleLarge from '../News/ArticleView/ArticleLarge';
import ArticleSmall from '../News/ArticleView/ArticleSmall';
import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import { Loading } from '../Reusables/Loading';
import SafeArea from '../../theme/SafeArea';

@connect(
  state => ({
    articlesSource: state.articlesSource,
    mainRouter: state.mainRouter
  }),
  { ...commonActions }
)
export default class ArticleBySubject extends React.Component {
  state = {
    changeView: true,
    isLoading: true,
    pageNumer: 1,
    isLoadmore: false
  }

  componentDidMount() {
    const { navigation: { state: { params: { search_query } } } } = this.props;
    this.props.getArticlesSource(search_query);
  }

  componentWillReceiveProps(nextProps) {
    const { articlesSource: { error } } = nextProps;

    if (!error) {
      this.setState({
        isLoading: false,
        isLoadmore: false
      });
    }
  }

  onPress = () => {
    this.setState({
      changeView: !this.state.changeView
    });
  }

  onRefresh = () => {
    const { navigation: { state: { params: { search_query } } } } = this.props;
    this.setState({
      isLoading: true
    });

    this.props.getArticlesSource(search_query);
  }

  onEndReached = () => {
    const { state: { params: { search_query } } } = this.props.navigation;
    const {
      domain,
      category,
      country,
      region,
      lang,
      search,
      from,
      to,
      time,
      source } = search_query;

    this.setState({
      pageNumer: this.state.pageNumer + 1,
      isLoadmore: true
    }, () => {
      this.props.getArticlesSource({
        category,
        country,
        domain,
        from,
        lang,
        page_number: this.state.pageNumer,
        region,
        search,
        source,
        time,
        to
      });
    });
  }

  renderArticleItem = ({ item }) => {
    const { id } = item;
    const { navigation: { navigate } } = this.props;

    return (
      <TouchableOpacity onPress={() => navigate('NewsDetail', { _id: id })}>
        {this.state.changeView ? <ArticleSmall source={item} /> : <ArticleLarge source={item} />}
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation, articlesSource: { data }, navigation: { state: { params: { name } } } } = this.props;
    const { isLoading, isLoadmore } = this.state;
    const content = isLoading ? <Loading /> : (<FlatList
      data={data}
      renderItem={this.renderArticleItem}
      refreshing={isLoading}
      onRefresh={this.onRefresh}
      onEndReached={this.onEndReached}
      ListFooterComponent={isLoadmore ? <ActivityIndicator /> : null}
      onEndReachedThreshold={platform.platform === 'ios' ? 0 : 0.5}
      contentContainerStyle={styles.wrapArticle}
      extraData={this.state.changeView}
      numColumns={this.state.changeView ? 1 : 2}
      key={(this.state.changeView ? 'h' : 'v')}
      keyExtractor={(it, index) => index.toString()}
    />);

    return (
      <SafeArea style={styles.container}>
        <Header
          type='stack'
          title={name}
          iconName={this.state.changeView ? 'ios-keypad' : 'ios-list-box'}
          navigation={navigation}
          onPress={this.onPress}
        />
        <View style={styles.contentStyle}>
          {content}
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentStyle: {
    flex: 1,
    backgroundColor: 'rgb(250,250,250)'
  },
  wrapFilterList: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: Scale.getSize(8),
    borderBottomWidth: 1,
    borderBottomColor: platform.borderColor
  },
  btnTimePicker: {
    paddingRight: 5
  },
  wrapChildArtical: {
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: Scale.getSize(3) },
    shadowColor: '#777',
    shadowOpacity: 0.3,
    shadowRadius: Scale.getSize(3),
    elevation: Scale.getSize(1)
  },
  wrapArticle: {
    padding: Scale.getSize(15)
  },
  txtCategoryStyle: {
    paddingLeft: Scale.getSize(10),
    fontSize: Scale.getSize(17),
    paddingTop: Scale.getSize(10),
    fontWeight: '800',
    color: 'rgb(82,82,82)'
  }
});

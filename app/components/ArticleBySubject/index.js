import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Text
} from 'react-native';
import { connect } from 'react-redux';

// import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';
import ArticleLarge from '../News/ArticleView/ArticleLarge';
import ArticleSmall from '../News/ArticleView/ArticleSmall';
import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';

@connect(
  state => ({
    articles: state.articles,
    categories: state.categories,
    mainRouter: state.mainRouter
  }),
  { ...commonActions }
)
export default class ArticleBySubject extends React.Component {
  state = {
    changeView: false,
    isLoading: true
  }

  componentDidMount() {
    const { navigation: { state: { params: { search_query } } } } = this.props;
    this.props.getArticles(search_query);
  }

  componentWillReceiveProps(nextProps) {
    const { articles: { data: dataAticles }, categories: { data: dataCategories } } = nextProps;
    const { isLoading } = this.state;

    if (dataAticles.items && isLoading && dataCategories.length !== 0) {
      this.setState({
        isLoading: false
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
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

    this.props.getArticles(search_query);
  }

  renderArticleItem = ({ item }) => {
    const { _source, _id } = item;
    const { navigation: { navigate } } = this.props;

    return (
      <TouchableOpacity onPress={() => navigate('NewsDetail', { _source, _id })}>
        {this.state.changeView ? <ArticleSmall source={_source} /> : <ArticleLarge source={_source} />}
      </TouchableOpacity>
    );
  }

  renderArticleGroup = ({ item }) => {
    const { posts: { hits: { hits } }, key } = item;
    const { categories: { data } } = this.props;
    const category = data.find(it => it._id === key);

    return (
      <View style={styles.wrapArticle}>
        <View style={styles.wrapChildArtical}>
          <Text style={styles.txtCategoryStyle}>{category.name}</Text>
          <FlatList
            data={hits}
            renderItem={this.renderArticleItem}
            extraData={this.state.changeView}
            numColumns={this.state.changeView ? 1 : 2}
            key={(this.state.changeView ? 'h' : 'v')}
            keyExtractor={(it) => it._id.toString()}
          />
          {/* <TouchableOpacity onPress={() => navigate('ArticlesByCategory', { categoryFilter: { _id: category._id, name: category.name } })}>
            <Text style={styles.txtSeeMoreStyle}>{'Xem thêm...'}</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }

  renderFlatlist = data => (
    <FlatList
      data={data}
      refreshing={this.state.isLoading}
      onRefresh={this.onRefresh}
      key={(this.state.changeView ? 'h' : 'v')}
      ListEmptyComponent={
        (<View style={styles.wrapEmptyArticles}>
          <Text style={styles.txtEmptyArticle}>{'Không có bài tin nào'}</Text>
        </View>)
      }
      renderItem={this.renderArticleGroup}
      keyExtractor={(item) => item.key.toString()}
      extraData={this.state.changeView}
    />
  )

  render() {
    const { navigation, articles: { data } } = this.props;
    const { isLoading } = this.state;
    const content = isLoading ? <ActivityIndicator /> : this.renderFlatlist(data.items);

    return (
      <SafeArea>
        <StatusBar barStyle="light-content" />
        <Header
          title={''}
          type={'stack'}
          iconName={this.state.changeView ? 'th-list' : 'th-large'}
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
  },
  txtSeeMoreStyle: {
    paddingLeft: Scale.getSize(10),
    fontSize: Scale.getSize(14),
    paddingVertical: Scale.getSize(10),
    fontWeight: '800',
    color: platform.primaryBlue
  },
  wrapEmptyArticles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtEmptyArticle: {
    fontSize: Scale.getSize(18),
    fontWeight: '700'
  }
});

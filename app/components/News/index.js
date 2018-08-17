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
import Icon from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../Reusables/Header';
import ButtonFilter from './elements/ButtonFilter';
import ArticleLarge from './ArticleView/ArticleLarge';
import ArticleSmall from './ArticleView/ArticleSmall';
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
export default class News extends React.Component {
  state = {
    changeView: false,
    isLoading: true
  }

  componentDidMount() {
    BackHandler.addEventListener('backPress', () => {
      const { navigation: { dispatch }, mainRouter } = this.props;

      if (mainRouter.index === 0) return false;
      dispatch({ type: 'Navigation/BACK' });
      return true;
    });

    this.props.getArticles({
      source: [],
      domain: [],
      category: [],
      country: [],
      region: [],
      lang: [],
      search: '',
      from: '',
      to: '',
      page_number: 1,
      time: ''
    });

    this.props.getCategories();
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
    this.setState({
      isLoading: true
    });

    this.props.getArticles({
      source: [],
      domain: [],
      category: [],
      country: [],
      region: [],
      lang: [],
      search: '',
      from: '',
      to: '',
      page_number: 1,
      time: ''
    });
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
    const categoryName = data.find(it => it._id === key);

    return (
      <View style={styles.wrapArticle}>
        <View style={styles.wrapChildArtical}>
          <Text style={styles.txtCategoryStyle}>{categoryName.name}</Text>
          <FlatList
            data={hits}
            renderItem={this.renderArticleItem}
            extraData={this.state.changeView}
            numColumns={this.state.changeView ? 1 : 2}
            key={(this.state.changeView ? 'h' : 'v')}
            keyExtractor={(it) => it._id.toString()}
          />
        </View>
      </View>
    );
  }

  render() {
    const { navigation, articles: { data } } = this.props;
    const { isLoading } = this.state;
    const content = isLoading ? <ActivityIndicator /> : (<FlatList
      data={data.items}
      refreshing={isLoading}
      onRefresh={this.onRefresh}
      renderItem={this.renderArticleGroup}
      keyExtractor={(item) => item.key.toString()}
      extraData={this.state.changeView}
    />);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          title={'Tin tức'}
          iconName={this.state.changeView ? 'th-list' : 'th-large'}
          navigation={navigation}
          onPress={this.onPress}
        />
        <View style={styles.contentStyle}>
          <View style={styles.wrapFilterList}>
            <TouchableOpacity onPress={() => null}>
              <View style={styles.btnTimePicker}>
                <Icon name='ios-alarm' size={24} color={platform.primaryBlue} />
              </View>
            </TouchableOpacity>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <ButtonFilter title='Ngôn ngữ' onPress={() => null} />
              <ButtonFilter title='Quốc gia' onPress={() => null} />
              <ButtonFilter title='Khu vực' onPress={() => null} />
              <ButtonFilter title='Loại nguồn' onPress={() => null} />
            </ScrollView>
          </View>
          {content}
        </View>
      </View>
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

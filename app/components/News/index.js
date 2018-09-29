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
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

// import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';
import ButtonFilter from './elements/ButtonFilter';
import ArticleLarge from './ArticleView/ArticleLarge';
import ArticleSmall from './ArticleView/ArticleSmall';
import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';

const LANGUAGE_FILTER = 'Ngôn ngữ';
const NATION_FILTER = 'Quốc gia';
const AREA_FILTER = 'Khu vực';
const SOURCE_FILTER = 'Loại nguồn';
const SEARCH = 'Tìm kiếm';

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
    isLoading: true,
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    toggleButtonPicker: true,

    fromDate: '',
    toDate: '',
    source: [],
    domain: [],
    category: [],
    country: [],
    region: [],
    lang: [],
    search: '',
    time: ''
  }

  async componentDidMount() {
    BackHandler.addEventListener('backPress', () => {
      const { navigation: { dispatch }, mainRouter } = this.props;

      if (mainRouter.index === 0) return false;
      dispatch({ type: 'Navigation/BACK' });
      return true;
    });

    await this.props.getCategories();

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

  onNavigateFilter = (title) => {
    switch (title) {
      case LANGUAGE_FILTER:
        this.props.navigation.navigate('Filter', {
          title,
          dataFilter: this.state.lang,
          onSubmit: (lang) => {
            const {
              fromDate: from,
              toDate: to,
              source,
              domain,
              category,
              country,
              region,
              search,
              time
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time);
          }
        });
        break;
      case NATION_FILTER:
        this.props.navigation.navigate('Filter', {
          title,
          dataFilter: this.state.country,
          onSubmit: (country) => {
            const {
              fromDate: from,
              toDate: to,
              source,
              domain,
              category,
              lang,
              region,
              search,
              time
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time);
          }
        });
        break;
      case AREA_FILTER:
        this.props.navigation.navigate('Filter', {
          title,
          dataFilter: this.state.region,
          onSubmit: (region) => {
            const {
              fromDate: from,
              toDate: to,
              source,
              domain,
              category,
              country,
              lang,
              search,
              time
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time);
          }
        });
        break;
      case SOURCE_FILTER:
        this.props.navigation.navigate('Filter', {
          title,
          dataFilter: this.state.source,
          onSubmit: (source) => {
            const {
              fromDate: from,
              toDate: to,
              region,
              domain,
              category,
              country,
              lang,
              search,
              time
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time);
          }
        });
        break;
      case SEARCH:
        this.props.navigation.navigate('SearchArticle', {
          onSubmit: (search) => {
            const {
              fromDate: from,
              toDate: to,
              region,
              domain,
              category,
              country,
              lang,
              source,
              time
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time);
          }
        });
        break;

      default:
        break;
    }
  }

  getAticlesAfterFilter = (source, domain, category, country, region, lang, search, from, to, time) => {
    this.setState({
      isLoading: true,
      fromDate: from,
      toDate: to,
      source,
      domain,
      category,
      country,
      region,
      lang,
      search,
      time
    }, () => {
      const {
        fromDate,
        toDate,
        source: sourceArticles,
        domain: domainArticles,
        category: categoryArticles,
        country: countryArticles,
        region: regionArticles,
        lang: langArticles,
        search: searchArticles,
        time: timeArticles
      } = this.state;

      this.props.getArticles({
        source: sourceArticles,
        domain: domainArticles,
        category: categoryArticles,
        country: countryArticles,
        region: regionArticles,
        lang: langArticles,
        search: searchArticles,
        from: fromDate,
        to: toDate,
        page_number: 1,
        time: timeArticles
      });
    });
  }

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = (date) => {
    this.setState({
      fromDate: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
      toggleButtonPicker: !this.state.toggleButtonPicker
    });

    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = (date) => {
    this.setState({
      toDate: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
      toggleButtonPicker: !this.state.toggleButtonPicker
    }, () => {
      const {
        fromDate,
        toDate,
        source,
        domain,
        category,
        country,
        region,
        lang,
        search,
        time
      } = this.state;

      this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, fromDate, toDate, time);
    });

    this.hideEndDateTimePicker();
  };

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
    const { categories: { data }, navigation: { navigate } } = this.props;
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
          <TouchableOpacity onPress={() => navigate('ArticlesByCategory', { categoryFilter: { _id: category._id, name: category.name } })}>
            <Text style={styles.txtSeeMoreStyle}>{'Xem thêm...'}</Text>
          </TouchableOpacity>
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
    const { isLoading, toggleButtonPicker } = this.state;
    const content = isLoading ? (
      <View style={{ marginTop: 25 }}>
        <ActivityIndicator size='large' />
      </View>
    ) : this.renderFlatlist(data.items);

    return (
      <SafeArea>
        <StatusBar barStyle="light-content" />
        <Header
          title={'Tin tức'}
          iconName={this.state.changeView ? 'th-list' : 'th-large'}
          navigation={navigation}
          hasSearch
          onSearch={() => this.onNavigateFilter(SEARCH)}
          onPress={this.onPress}
        />
        <View style={styles.contentStyle}>
          <View style={styles.wrapFilterList}>
            <TouchableOpacity onPress={toggleButtonPicker ? this.showStartDateTimePicker : this.showEndDateTimePicker}>
              <View style={styles.btnTimePicker}>
                <Icon name='ios-alarm' size={24} color={platform.primaryBlue} />
              </View>
            </TouchableOpacity>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <ButtonFilter title={LANGUAGE_FILTER} onPress={() => this.onNavigateFilter(LANGUAGE_FILTER)} />
              <ButtonFilter title={NATION_FILTER} onPress={() => this.onNavigateFilter(NATION_FILTER)} />
              <ButtonFilter title={AREA_FILTER} onPress={() => this.onNavigateFilter(AREA_FILTER)} />
              <ButtonFilter title={SOURCE_FILTER} onPress={() => this.onNavigateFilter(SOURCE_FILTER)} />
            </ScrollView>
          </View>
          {content}
        </View>
        <DateTimePicker
          titleIOS={'Chọn thời gian bắt đầu'}
          confirmTextIOS={'Xác nhận'}
          cancelTextIOS={'Hủy'}
          isVisible={this.state.startDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
        />
        <DateTimePicker
          titleIOS={'Chọn thời gian kết thúc'}
          confirmTextIOS={'Xác nhận'}
          cancelTextIOS={'Hủy'}
          isVisible={this.state.endDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
        />
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

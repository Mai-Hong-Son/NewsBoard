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
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import I18n from 'react-native-i18n';

// import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';
import ButtonFilter from './elements/ButtonFilter';
import ArticleLarge from './ArticleView/ArticleLarge';
import ArticleSmall from './ArticleView/ArticleSmall';
import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import { buildHeaders } from '../../../redux/utils';

@connect(
  state => ({
    categories: state.categories,
    mainRouter: state.mainRouter,
    localhost: state.localhost,
    tokenAccess: state.tokenAccess
    // language: state.language
  }),
  { ...commonActions }
)
export default class News extends React.PureComponent {
  state = {
    changeView: true,
    isLoading: true,
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    dataArticles: null,

    fromDate: '',
    toDate: '',
    source: [],
    domain: [],
    category: [],
    country: [],
    region: [],
    lang: [],
    search: '',
    time: '',
    sourcetype: []
  }

  async componentDidMount() {
    BackHandler.addEventListener('backPress', () => {
      const { navigation: { dispatch }, mainRouter } = this.props;

      if (mainRouter.index === 0) return false;
      dispatch({ type: 'Navigation/BACK' });
      return true;
    });

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
      time: timeArticles,
      sourcetype
    } = this.state;

    await this.props.getCategories();

    this.getArticles({
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
      time: timeArticles,
      sourcetype
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   const { language: { reloadScreen: prevReloaded } } = this.props;
  //   const { language: { reloadScreen: nextReloaded } } = nextProps;

  //   if (prevReloaded !== nextReloaded) this.onRefresh();
  // }

  componentWillUnmount() {
    BackHandler.removeEventListener('backPress');
    // clearInterval(this.interval);
  }

  onPress = () => {
    this.setState({
      changeView: !this.state.changeView
    });
  }

  onRefresh = () => {
    const {
      source: sourceArticles,
      domain: domainArticles,
      category: categoryArticles,
      country: countryArticles,
      region: regionArticles,
      lang: langArticles,
      search: searchArticles,
      time: timeArticles,
      sourcetype,
      fromDate,
      toDate
    } = this.state;
  
    this.setState({
      isLoading: true
    }, () => this.getArticles({
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
      time: timeArticles,
      sourcetype
    }));
  }

  onNavigateFilter = (title) => {
    const LANGUAGE_FILTER = I18n.t('filterMenu.language');
    const NATION_FILTER = I18n.t('filterMenu.country');
    const AREA_FILTER = I18n.t('filterMenu.region');
    const SOURCE_FILTER = I18n.t('filterMenu.source');
    const SEARCH = I18n.t('filterMenu.search');
    const SOURCE_TYPE_FILTER = I18n.t('filterMenu.sourceType');
    
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
              time,
              sourcetype
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time, sourcetype);
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
              time,
              sourcetype
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time, sourcetype);
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
              time,
              sourcetype
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time, sourcetype);
          }
        });
        break;
      case SOURCE_FILTER:
        this.props.navigation.navigate('Filter', {
          title,
          dataFilter: this.state.source,
          dataAccess: {
            category: this.state.category.map(element => element._id),
            lang: this.state.lang.map(element => element._id),
            region: this.state.region.map(element => element._id),
            country: this.state.country.map(element => element._id),
            sourcetype: this.state.sourcetype.map(element => element._id)
          },
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
              time,
              sourcetype
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time, sourcetype);
          }
        });
        break;
      case SEARCH:
        this.props.navigation.navigate('SearchArticle', {
          textSearch: this.state.search,
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
              time,
              sourcetype
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search.replace('“', '"').replace('”', '"'), from, to, time, sourcetype);
          }
        });
        break;
      case SOURCE_TYPE_FILTER:
        this.props.navigation.navigate('Filter', {
          title,
          dataFilter: this.state.sourcetype,
          onSubmit: (sourcetype) => {
            const {
              fromDate: from,
              toDate: to,
              region,
              search,
              domain,
              category,
              country,
              lang,
              source,
              time
            } = this.state;
            this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, from, to, time, sourcetype);
          }
        });
        break;

      default:
        break;
    }
  }

  getArticles = async ({
    source,
    domain,
    category,
    country,
    region,
    lang,
    search,
    from,
    to,
    page_number,
    time,
    sourcetype
  }) => {
    const { payload } = this.props.localhost.data;
    const { categories: { data: dataCategories } } = this.props;

    await fetch(`${payload}/search/aggs`, {
      body: JSON.stringify({
        source,
        domain,
        category,
        country,
        region,
        lang,
        search,
        from,
        to,
        page_number,
        time,
        sourcetype
      }),
      method: 'POST',
      headers: buildHeaders(this.props)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataArticles: responseJson,
          isLoading: dataCategories.length === 0
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAticlesAfterFilter = (source, domain, category, country, region, lang, search, from, to, time, sourcetype) => {
    // clearInterval(this.interval);
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
      time,
      sourcetype
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
        time: timeArticles,
        sourcetype
      } = this.state;

      this.getArticles({
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
        time: timeArticles,
        sourcetype
      });
    });
  }

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = (date) => {
    this.setState({
      fromDate: moment(date).format('YYYY-MM-DDTHH:mm:ss')
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
        time,
        sourcetype
      } = this.state;

      this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, fromDate, toDate, time, sourcetype);
    });

    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = (date) => {
    this.setState({
      toDate: moment(date).format('YYYY-MM-DDTHH:mm:ss')
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
        time,
        sourcetype
      } = this.state;

      this.getAticlesAfterFilter(source, domain, category, country, region, lang, search, fromDate, toDate, time, sourcetype);
    });

    this.hideEndDateTimePicker();
  };

  renderArticleItem = ({ item }) => {
    const { _source, _id } = item;
    const { navigation: { navigate } } = this.props;

    return (
      <TouchableOpacity onPress={() => navigate('NewsDetail', { _id })}>
        {this.state.changeView ? <ArticleSmall source={_source} /> : <ArticleLarge source={_source} />}
      </TouchableOpacity>
    );
  }

  renderArticleGroup = ({ item }) => {
    const { posts: { hits: { hits } }, key } = item;
    const { categories: { data }, navigation: { navigate } } = this.props;
    const category = data.find(it => it._id === key);
    const {
      fromDate,
      toDate,
      source,
      domain,
      lang,
      country,
      region,
      search,
      time,
      sourcetype
    } = this.state;

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
          <TouchableOpacity onPress={() => 
            navigate('ArticlesByCategory', {
              categoryFilter: {
                _id: category._id,
                name: category.name
              },
              dataFilter: {
                source,
                domain,
                country,
                region,
                lang,
                search,
                fromDate,
                toDate,
                time,
                sourcetype
              }
            })}
          >
            <Text style={styles.txtSeeMoreStyle}>{I18n.t('seeMore')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderFlatlist = data => (
    <FlatList
      data={data}
      refreshing={this.state.isLoading}
      // contentContainerStyle={{ padding: 15 }}
      onRefresh={this.onRefresh}
      key={(this.state.changeView ? 'h' : 'v')}
      ListEmptyComponent={
        (<View style={styles.wrapEmptyArticles}>
          <Text style={styles.txtEmptyArticle}>{I18n.t('emptyScreen')}</Text>
          <Image
            style={{ height: 100, width: 100 }}
            source={require('../../assets/images/image.png')}
          />
        </View>)
      }
      renderItem={this.renderArticleGroup}
      keyExtractor={(item) => item.key.toString()}
      extraData={this.state.changeView}
    />
  )

  render() {
    const LANGUAGE_FILTER = I18n.t('filterMenu.language');
    const NATION_FILTER = I18n.t('filterMenu.country');
    const AREA_FILTER = I18n.t('filterMenu.region');
    const SOURCE_FILTER = I18n.t('filterMenu.source');
    const SEARCH = I18n.t('filterMenu.search');
    const SOURCE_TYPE_FILTER = I18n.t('filterMenu.sourceType');
    const { navigation } = this.props;
    const { isLoading, dataArticles } = this.state;
    const content = isLoading ? (
      <View style={{ marginTop: 25 }}>
        <ActivityIndicator size='large' />
      </View>
    ) : this.renderFlatlist(dataArticles.items);

    return (
      <SafeArea>
        <StatusBar barStyle={platform.isIphoneX ? 'dark-content' : 'light-content'} />
        <Header
          title={I18n.t('tabBar.news')}
          iconName={this.state.changeView ? 'th' : 'list'}
          navigation={navigation}
          hasSearch
          onSearch={() => this.onNavigateFilter(SEARCH)}
          onPress={this.onPress}
        />
        <View style={styles.contentStyle}>
          <View style={styles.wrapFilterList}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <ButtonFilter title={LANGUAGE_FILTER} onPress={() => this.onNavigateFilter(LANGUAGE_FILTER)} />
              <ButtonFilter title={NATION_FILTER} onPress={() => this.onNavigateFilter(NATION_FILTER)} />
              <ButtonFilter title={AREA_FILTER} onPress={() => this.onNavigateFilter(AREA_FILTER)} />
              <ButtonFilter title={SOURCE_TYPE_FILTER} onPress={() => this.onNavigateFilter(SOURCE_TYPE_FILTER)} />
              <ButtonFilter title={SOURCE_FILTER} onPress={() => this.onNavigateFilter(SOURCE_FILTER)} />
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={this.showStartDateTimePicker}
              >
                <View style={styles.wrapDateTime}>
                  <Icon name='ios-alarm' size={15} color={platform.primaryBlue} style={{ marginRight: 5 }} />
                  <Text style={{ fontSize: 13 }}>
                    {this.state.fromDate === '' ?
                      I18n.t('filterMenu.fromDate') :
                      moment(this.state.fromDate).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </TouchableOpacity>
              <Icon name='ios-arrow-round-forward' size={24} style={{ marginHorizontal: Scale.getSize(7) }} />
              <TouchableOpacity onPress={this.showEndDateTimePicker}>
                <View style={styles.wrapDateTime}>
                  <Icon name='ios-alarm' size={15} color={platform.primaryBlue} style={{ marginRight: 5 }} />
                  <Text style={{ fontSize: 13 }}>
                    {this.state.toDate === '' ?
                      I18n.t('filterMenu.toDate') :
                      moment(this.state.toDate).format('DD/MM/YYYY')}
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {content}
        </View>
        <DateTimePicker
          titleIOS={I18n.t('filterMenu.fromDate')}
          confirmTextIOS={I18n.t('modal.confirm')}
          cancelTextIOS={I18n.t('modal.cancel')}
          isVisible={this.state.startDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
        />
        <DateTimePicker
          titleIOS={I18n.t('filterMenu.toDate')}
          confirmTextIOS={I18n.t('modal.confirm')}
          cancelTextIOS={I18n.t('modal.cancel')}
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
    backgroundColor: 'rgb(250,250,250)',
    paddingBottom: 60
  },
  wrapFilterList: {
    flexDirection: 'row',
    paddingRight: 15,
    paddingVertical: Scale.getSize(8),
    borderBottomWidth: 1,
    borderBottomColor: platform.borderColor,
    alignItems: 'center'
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
    padding: 15
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
    alignItems: 'center',
    paddingTop: 15
  },
  txtEmptyArticle: {
    fontSize: Scale.getSize(18),
    fontWeight: '700',
    color: '#000',
    paddingVertical: Scale.getSize(20)
  },
  wrapDateTime: {
    flexDirection: 'row',
    padding: Scale.getSize(3),
    borderColor: 'rgb(137,137,137)',
    borderRadius: 5,
    borderWidth: 1
  }
});

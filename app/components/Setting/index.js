import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import { connect } from 'react-redux';

import * as commonActions from '../../../redux/actions';
import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';
import ItemView from './elements/ItemView';
import Scale from '../../theme/scale';
import { buildHeaders } from '../../../redux/utils';
// import { Loading } from '../../components/Reusables/Loading';

const sourceTypeData = [
  {
    _id: 'facebook',
    name: 'Facebook'
  },
  {
    _id: 'google',
    name: 'Google'
  },
  {
    _id: 'youtube',
    name: 'Youtube'
  },
  {
    _id: 'website',
    name: 'Website'
  },
  {
    _id: 'minds',
    name: 'Minds'
  }
];

const LANGUAGE_FILTER = 'Ngôn ngữ';
const NATION_FILTER = 'Quốc gia';
const AREA_FILTER = 'Khu vực';
const CATEGORIES_FILTER = 'Danh mục';
const SOURCE_TYPE_FILTER = 'Loại nguồn';

export function getItemsByArrayId(arr1, arr2) {
  const arr3 = [];

  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j]._id === arr2[i]) {
        arr3.push(arr1[j]);
      }
    }
  }

  return arr3.length === 0 ? arr1 : arr3;
}

const eNotInArray = (array, e) => {
  for (let i = 0; i < array.length; ++i) {
    if (e === array[i]) {
      return false;
    }
  }
  return true;
};

const filter = (sourceArray, keyArray) => {
  const result = [];
  for (let i = 0; i < sourceArray.length; ++i) {
    const element = sourceArray[i]._id;
    if (eNotInArray(keyArray, element)) {
      result.push(sourceArray[i]);
    }
  }
  return result;
};

@connect(
  state => ({
    userInfo: state.userInfo,
    languagesSetting: state.languagesSetting,
    countriesSetting: state.countriesSetting,
    regionsSetting: state.regionsSetting,
    categoriesSetting: state.categoriesSetting,
    subjects: state.subjects,
    localhost: state.localhost,
    tokenAccess: state.tokenAccess
  }),
  { ...commonActions }
)
export default class Setting extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      countries: [],
      languages: [],
      regions: [],
      sourcetype: [],
      subjects: [],
      loading: true
    };
  }

  componentDidMount() {
    this.props.getUserInfo();
    const { payload } = this.props.localhost.data;

    fetch(`${payload}/setting_notify`, {
      method: 'GET',
      headers: buildHeaders(this.props)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          subjects: filter(this.props.subjects.data, responseJson)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    const { userInfo: { error, data } } = nextProps;

    if (!error && this.state.loading) {
      const {
        languagesSetting,
        countriesSetting,
        regionsSetting,
        categoriesSetting
      } = this.props;
      const { settings } = data;

      this.setState({
        loading: false,
        categories: getItemsByArrayId(categoriesSetting.data, settings.category),
        countries: getItemsByArrayId(countriesSetting.data, settings.country),
        languages: getItemsByArrayId(languagesSetting.data, settings.lang),
        regions: getItemsByArrayId(regionsSetting.data, settings.region),
        sourcetype: getItemsByArrayId(sourceTypeData, settings.sourcetype)
      });
    }
  }

  onNavigateFilter = (title) => {
    switch (title) {
      case LANGUAGE_FILTER:
        this.props.navigation.navigate('FilterSetting', {
          title,
          dataFilter: this.state.languages,
          onSubmit: (languages) => {
            const {
              categories,
              countries,
              regions,
              sourcetype
            } = this.state;
            this.setState({
              languages
            }, () => this.props.postSettings({
              category: categories.map(item => item._id),
              country: countries.map(item => item._id),
              lang: languages.map(item => item._id),
              region: regions.map(item => item._id),
              sourcetype: sourcetype.map(item => item._id),
              source: [],
              domain: [],
              search: '',
              from: '',
              to: '',
              page_number: 1,
              time: ''
            }));
          }
        });
        break;
      case NATION_FILTER:
        this.props.navigation.navigate('FilterSetting', {
          title,
          dataFilter: this.state.countries,
          onSubmit: (countries) => {
            const {
              categories,
              languages,
              regions,
              sourcetype
            } = this.state;
            this.setState({
              countries
            }, () => this.props.postSettings({
              category: categories.map(item => item._id),
              country: countries.map(item => item._id),
              lang: languages.map(item => item._id),
              region: regions.map(item => item._id),
              sourcetype: sourcetype.map(item => item._id),
              source: [],
              domain: [],
              search: '',
              from: '',
              to: '',
              page_number: 1,
              time: ''
            }));
          }
        });
        break;
      case AREA_FILTER:
        this.props.navigation.navigate('FilterSetting', {
          title,
          dataFilter: this.state.regions,
          onSubmit: (regions) => {
            const {
              categories,
              languages,
              countries,
              sourcetype
            } = this.state;
            this.setState({
              regions
            }, () => this.props.postSettings({
              category: categories.map(item => item._id),
              country: countries.map(item => item._id),
              lang: languages.map(item => item._id),
              region: regions.map(item => item._id),
              sourcetype: sourcetype.map(item => item._id),
              source: [],
              domain: [],
              search: '',
              from: '',
              to: '',
              page_number: 1,
              time: ''
            }));
          }
        });
        break;
      case CATEGORIES_FILTER:
        this.props.navigation.navigate('FilterSetting', {
          title,
          dataFilter: this.state.categories,
          onSubmit: (categories) => {
            const {
              regions,
              languages,
              countries,
              sourcetype
            } = this.state;
            this.setState({
              categories
            }, () => this.props.postSettings({
              category: categories.map(item => item._id),
              country: countries.map(item => item._id),
              lang: languages.map(item => item._id),
              region: regions.map(item => item._id),
              sourcetype: sourcetype.map(item => item._id),
              source: [],
              domain: [],
              search: '',
              from: '',
              to: '',
              page_number: 1,
              time: ''
            }));
          }
        });
        break;
      case SOURCE_TYPE_FILTER:
        this.props.navigation.navigate('FilterSetting', {
          title,
          dataFilter: this.state.sourcetype,
          onSubmit: (sourcetype) => {
            const {
              regions,
              languages,
              countries,
              categories
            } = this.state;
            this.setState({
              sourcetype
            }, () => this.props.postSettings({
              category: categories.map(item => item._id),
              country: countries.map(item => item._id),
              lang: languages.map(item => item._id),
              region: regions.map(item => item._id),
              sourcetype: sourcetype.map(item => item._id),
              source: [],
              domain: [],
              search: '',
              from: '',
              to: '',
              page_number: 1,
              time: ''
            }));
          }
        });
        break;
      case 'Danh mục nhận thông báo':
        this.props.navigation.navigate('FilterSetting', {
          title,
          dataFilter: this.state.subjects,
          onSubmit: (subjects) => {
            const data = filter(this.props.subjects.data, subjects.map(item => item._id)).map(item => item._id);
            this.setState({
              subjects
            }, () => this.props.postSettingNotify(data));
          }
        });
        break;

      default:
        break;
    }
  }

  render() {
    const { navigation } = this.props;
    const { countries, languages, regions, sourcetype, categories, subjects } = this.state;

    return (
      <SafeArea style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title={'Cài đặt'}
          type='stack'
          navigation={navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Text style={styles.txtContentTitle}>{'Nội dung'}</Text>
          <View>
            <ItemView title={CATEGORIES_FILTER} data={categories} onPress={() => this.onNavigateFilter(CATEGORIES_FILTER)} />
            <ItemView title={LANGUAGE_FILTER} data={languages} onPress={() => this.onNavigateFilter(LANGUAGE_FILTER)} />
            <ItemView title={NATION_FILTER} data={countries} onPress={() => this.onNavigateFilter(NATION_FILTER)} />
            <ItemView title={AREA_FILTER} data={regions} onPress={() => this.onNavigateFilter(AREA_FILTER)} />
            <ItemView title={SOURCE_TYPE_FILTER} data={sourcetype} onPress={() => this.onNavigateFilter(SOURCE_TYPE_FILTER)} />
          </View>
          <Text style={[styles.txtContentTitle, { paddingTop: Scale.getSize(15) }]}>{'Thông báo'}</Text>
          <View>
            <ItemView title={'Danh mục nhận thông báo'} data={subjects} onPress={() => this.onNavigateFilter('Danh mục nhận thông báo')} />
          </View>
        </ScrollView>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: Scale.getSize(15)
  },
  txtContentTitle: {
    fontSize: Scale.getSize(18),
    fontWeight: '800',
    color: '#EE82EE'
    // borderBottomColor: 'rgb(237,237,237)',
    // borderBottomWidth: 1
  }
});

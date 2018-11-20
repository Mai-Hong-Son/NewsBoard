import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import RadioForm from 'react-native-simple-radio-button';
import moment from 'moment';
import 'moment/locale/en-au';
import 'moment/locale/vi';
import { StackActions, NavigationActions } from 'react-navigation';

import * as commonActions from '../../../redux/actions';
import Header from '../Reusables/Header';
import SafeArea from '../../theme/SafeArea';
import ItemView from './elements/ItemView';
import Scale from '../../theme/scale';
import { buildHeaders } from '../../../redux/utils';
import platform from '../../theme/platform';
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
    tokenAccess: state.tokenAccess,
    language: state.language
  }),
  { ...commonActions }
)
export default class Setting extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      onCLickChangeLanguage: false,
      languageResult: props.language.data,
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
    const { userInfo: { error, data }, language } = nextProps;
    const { onCLickChangeLanguage } = this.state;

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

    if (onCLickChangeLanguage) {
      I18n.locale = language.data;
      moment.locale(language.data);
      this.setState({
        onCLickChangeLanguage: false
      }, () => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'HomeTab' })]
        });
        this.props.navigation.dispatch(resetAction);
      });
    }
  }

  onShowModalPriority = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  onNavigateFilter = (title) => {
    const LANGUAGE_FILTER = I18n.t('filterMenu.language');
    const NATION_FILTER = I18n.t('filterMenu.country');
    const AREA_FILTER = I18n.t('filterMenu.region');
    const CATEGORIES_FILTER = I18n.t('filterMenu.category');
    const SOURCE_TYPE_FILTER = I18n.t('filterMenu.sourceType');

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
      case I18n.t('filterMenu.subjectNotif'):
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
    const { navigation, language: { data } } = this.props;
    const { countries, languages, regions, sourcetype, categories, subjects, languageResult } = this.state;
    const LANGUAGE_FILTER = I18n.t('filterMenu.language');
    const NATION_FILTER = I18n.t('filterMenu.country');
    const AREA_FILTER = I18n.t('filterMenu.region');
    const CATEGORIES_FILTER = I18n.t('filterMenu.category');
    const SOURCE_TYPE_FILTER = I18n.t('filterMenu.sourceType');
    const languageOptions = [
      {
        value: 'vi',
        label: I18n.t('setting.vietnamese')
      },
      {
        value: 'en',
        label: I18n.t('setting.english')
      }
    ];

    return (
      <SafeArea style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title={I18n.t('setting.title')}
          type='stack'
          navigation={navigation}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Text style={styles.txtContentTitle}>{I18n.t('setting.content')}</Text>
          <View>
            <ItemView title={CATEGORIES_FILTER} data={categories} onPress={() => this.onNavigateFilter(CATEGORIES_FILTER)} />
            <ItemView title={LANGUAGE_FILTER} data={languages} onPress={() => this.onNavigateFilter(LANGUAGE_FILTER)} />
            <ItemView title={NATION_FILTER} data={countries} onPress={() => this.onNavigateFilter(NATION_FILTER)} />
            <ItemView title={AREA_FILTER} data={regions} onPress={() => this.onNavigateFilter(AREA_FILTER)} />
            <ItemView title={SOURCE_TYPE_FILTER} data={sourcetype} onPress={() => this.onNavigateFilter(SOURCE_TYPE_FILTER)} />
          </View>
          <Text style={[styles.txtContentTitle, { paddingTop: Scale.getSize(15) }]}>{I18n.t('setting.notification')}</Text>
          <View>
            <ItemView
              title={I18n.t('filterMenu.subjectNotif')}
              data={subjects}
              onPress={() => this.onNavigateFilter(I18n.t('filterMenu.subjectNotif'))}
            />
          </View>
          <Text style={[styles.txtContentTitle, { paddingTop: Scale.getSize(15) }]}>{I18n.t('setting.more')}</Text>
          <View>
            <TouchableOpacity onPress={this.onShowModalPriority}>
              <View style={styles.wrapItem}>
                <Text style={styles.txtTitle}>{I18n.t('setting.changeLanguage')}</Text>
                <Text style={styles.txtContent}>
                  {languageOptions.filter(it => it.value === data)[0].label}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          isVisible={this.state.showModal}
          onBackdropPress={this.onShowModalPriority}
        >
          <View style={{ backgroundColor: '#fff', borderRadius: 5, padding: Scale.getSize(15) }}>
            <Text style={styles.txtCheckbox}>{I18n.t('setting.chooseLanguage')}</Text>
            <View style={{ paddingVertical: 15 }}>
              <RadioForm
                radio_props={languageOptions}
                initial={data === 'vi' ? 0 : 1}
                formHorizontal
                style={{ justifyContent: 'space-between' }}
                labelStyle={styles.txtCheckbox}
                buttonColor={platform.primaryBlue}
                onPress={(value) => { this.setState({ languageResult: value }); }}
              />
            </View>
            <View style={{ alignItems: 'flex-end', paddingTop: Scale.getSize(15) }}>
              <TouchableOpacity onPress={() => {
                this.setState({
                  onCLickChangeLanguage: true
                }, () => this.props.changeLanguage(languageResult));
                this.onShowModalPriority();
              }}
              >
                <View
                  style={{
                    backgroundColor: platform.primaryBlue,
                    paddingVertical: Scale.getSize(7),
                    paddingHorizontal: Scale.getSize(15),
                    borderRadius: 5
                  }}
                >
                  <Text
                    style={{
                      fontSize: Scale.getSize(18),
                      fontWeight: '700',
                      color: '#fff'
                    }}
                  >{I18n.t('modal.done')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  },
  txtCheckbox: {
    fontSize: Scale.getSize(18),
    fontWeight: '600'
  },
  wrapItem: {
    paddingVertical: Scale.getSize(10),
    borderBottomColor: 'rgb(237,237,237)',
    borderBottomWidth: 1
  },
  txtTitle: {
    fontSize: Scale.getSize(17),
    color: '#000',
    paddingBottom: Scale.getSize(8)
  },
  txtContent: {
    fontSize: Scale.getSize(16),
    color: 'rgb(137,137,137)',
    paddingBottom: Scale.getSize(8)
  }
});

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
// import { NavigationEvents } from 'react-navigation';
import I18n from 'react-native-i18n';
// import Icon from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../Reusables/Header';
import ArticleLarge from '../News/ArticleView/ArticleLarge';
import ArticleSmall from '../News/ArticleView/ArticleSmall';
import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import SafeArea from '../../theme/SafeArea';
import { buildHeaders } from '../../../redux/utils';

@connect(
  state => ({
    myArticles: state.myArticles,
    localhost: state.localhost,
    tokenAccess: state.tokenAccess
  }),
  { ...commonActions }
)
export default class Save extends React.Component {
  state = {
    isFirstime: false,
    changeView: true,
    isLoading: true
  }

  componentDidMount() {
    if (!this.state.isFirstime) {
      this.setState({
        isFirstime: true
      }, () => this.onRefresh());
    }

    this.willFocus = this.props.navigation.addListener(
      'willFocus',
      () => {
        if (this.state.isFirstime) {
          this.onRefresh();
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    const { myArticles: { data: dataAticles } } = nextProps;
    const { isLoading } = this.state;

    if (dataAticles.results && isLoading) {
      this.setState({
        isLoading: false
      });
    }
  }

  componentWillUnmount() {
    this.willFocus.remove();
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

    this.props.getMyArticles();
  }

  deleteAll = () => {
    const { payload } = this.props.localhost.data;

    fetch(`${payload}/v4/cart/clear`, {
      method: 'GET',
      headers: buildHeaders(this.props)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status) {
          Alert.alert(
            I18n.t('alert.success'),
            I18n.t('alert.deleteStoredSuccess'),
            [
              {
                text: 'OK',
                onPress: () => this.onRefresh()
              }
            ],
            { cancelable: false }
          );
        }
      })
      .catch((error) => {
        console.error(error);
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
    const { navigation, myArticles: { data: { results } } } = this.props;
    const { isLoading } = this.state;
    const content = isLoading ? (
      <View style={{ marginTop: 25 }}>
        <ActivityIndicator size='large' />
      </View>
    ) : (<FlatList
      data={results}
      renderItem={this.renderArticleItem}
      refreshing={isLoading}
      onRefresh={this.onRefresh}
      contentContainerStyle={styles.wrapArticle}
      extraData={this.state.changeView}
      numColumns={this.state.changeView ? 1 : 2}
      key={(this.state.changeView ? 'h' : 'v')}
      keyExtractor={(it) => it.id.toString()}
    />);

    return (
      <SafeArea>
        {/* <NavigationEvents
          onWillFocus={() => {
            if (isFirstime) {
              this.onRefresh();
            }
          }}
        /> */}
        <Header
          title={I18n.t('save.title')}
          iconName={this.state.changeView ? 'th' : 'list'}
          navigation={navigation}
          iconMenu
          type={'stored'}
          deleteAll={this.deleteAll}
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
    backgroundColor: '#fff'
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
    paddingTop: Scale.getSize(15),
    paddingHorizontal: Scale.getSize(15),
    paddingBottom: 60
  },
  txtCategoryStyle: {
    paddingLeft: Scale.getSize(10),
    fontSize: Scale.getSize(17),
    paddingTop: Scale.getSize(10),
    fontWeight: '800',
    color: 'rgb(82,82,82)'
  }
});

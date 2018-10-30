import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../Reusables/Header';
import ArticleLarge from '../News/ArticleView/ArticleLarge';
import ArticleSmall from '../News/ArticleView/ArticleSmall';
import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import SafeArea from '../../theme/SafeArea';

@connect(
  state => ({
    myArticles: state.myArticles
  }),
  { ...commonActions }
)
export default class Save extends React.Component {
  state = {
    changeView: true,
    isLoading: true
  }

  componentDidMount() {
    this.onRefresh();
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
        <NavigationEvents
          onWillFocus={() => this.onRefresh()}
        />
        <Header
          title={'Lưu trữ'}
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

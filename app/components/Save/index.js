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
// import Icon from 'react-native-vector-icons/Ionicons';
// import DateTimePicker from 'react-native-modal-datetime-picker';

import Header from '../Reusables/Header';
import ArticleLarge from '../News/ArticleView/ArticleLarge';
import ArticleSmall from '../News/ArticleView/ArticleSmall';
import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';

@connect(
  state => ({
    myArticles: state.myArticles
  }),
  { ...commonActions }
)
export default class Save extends React.Component {
  state = {
    changeView: false,
    isLoading: true
  }

  componentDidMount() {
    this.props.getMyArticles();
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
    const content = isLoading ? <ActivityIndicator /> : (<FlatList
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
      <View style={styles.container}>
        <Header
          title={'Lưu trữ'}
          iconName={this.state.changeView ? 'th-list' : 'th-large'}
          navigation={navigation}
          onPress={this.onPress}
        />
        <View style={styles.contentStyle}>
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

import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Linking,
  Clipboard
} from 'react-native';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import _ from 'lodash';
import I18n from 'react-native-i18n';

import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
// import SafeArea from '../../theme/SafeArea';
import Header from '../Reusables/Header';
import { Loading } from '../Reusables/Loading';
import { emptyImage } from '../News/ArticleView/ArticleLarge';
import images from '../../assets/images';

@connect(
  state => ({
    postDetail: state.postDetail,
    saveArticleStatus: state.saveArticleStatus,
    categories: state.categories,
    shareArticleStatus: state.shareArticleStatus,
    myArticles: state.myArticles,
    deleteArticleStatus: state.deleteArticleStatus
  }),
  { ...commonActions }
)
export default class NewsDetail extends React.PureComponent {
  state = {
    loading: true,
    failed: false,
    isClickSave: false,
    onClickShare: false,
    isTranslate: false,
    subContent: '',
    colorSave: false
  }

  async componentDidMount() {
    const { navigation: { state: { params: { _id } } } } = this.props;

    await this.props.getMyArticles();
    await this.props.getPostDetail(_id);
  }

  componentWillReceiveProps(nextProps) {
    const {
      postDetail: { data: currentPostDetail },
      myArticles: { data: myArticlesData },
      saveArticleStatus: { error },
      shareArticleStatus: { error: errShare },
      deleteArticleStatus: { error: errDelete }
    } = nextProps;
    const { postDetail: { data: prevPostDetail } } = this.props;

    if (currentPostDetail !== prevPostDetail && myArticlesData !== {} && this.state.loading) {
      const { subcontent, id } = currentPostDetail;
      const { results } = myArticlesData;

      this.setState({
        loading: false,
        subContent: subcontent,
        colorSave: _.some(results, { 'id': id })
      });
    }

    if (!error && this.state.isClickSave && !this.state.colorSave) {
      Alert.alert(
        I18n.t('alert.success'),
        I18n.t('alert.saveArticle'),
        [
          {
            text: 'OK',
            onPress: () => this.setState({
              isClickSave: false,
              colorSave: true
            })
          }
        ],
        { cancelable: false }
      );
    }

    if (!errDelete && this.state.isClickSave && this.state.colorSave) {
      Alert.alert(
        I18n.t('alert.success'),
        I18n.t('alert.deleteSaveArticle'),
        [
          {
            text: 'OK',
            onPress: () => {
              this.setState({
                isClickSave: false,
                colorSave: false
              });
            }
          }
        ],
        { cancelable: false }
      );
    }

    if (!errShare && this.state.onClickShare) {
      Alert.alert(
        I18n.t('alert.success'),
        I18n.t('alert.shareContent'),
        [
          {
            text: 'OK',
            onPress: () => this.setState({
              onClickShare: false
            })
          }
        ],
        { cancelable: false }
      );
    }

    if (errShare && this.state.onClickShare) {
      Alert.alert(
        I18n.t('alert.title'),
        I18n.t('alert.dontShareContent'),
        [
          {
            text: 'OK',
            onPress: () => this.setState({
              onClickShare: false
            })
          }
        ],
        { cancelable: false }
      );
    }
  }

  onSaveAricle = () => {
    const { navigation: { state: { params: { _id } } }, postDetail: { data } } = this.props;
    const {
      body,
      lang,
      domain,
      logo,
      image,
      url,
      time,
      collected_time,
      category,
      country,
      region,
      source,
      title
    } = data;
    const { colorSave } = this.state;

    this.setState({
      isClickSave: true
    });

    if (!colorSave) {
      this.props.saveArticle({
        id: _id,
        lang,
        title,
        domain,
        logo,
        image,
        url,
        time,
        collected_time,
        body,
        category,
        country,
        region,
        source
      });
    } else {
      const { saveArticleStatus: { data: dataSave }, myArticles: { data: { results } } } = this.props;

      const checkExsistDataSave = results.some(it => it.id === _id);
      if (checkExsistDataSave) {
        this.props.deleteArticleSave(results.filter(it => it.id === _id)[0].unique_id);
      } else {
        this.props.deleteArticleSave(dataSave[0].unique_id);
      }
    }
  }

  onLinking = (link) => {
    Linking.openURL(link);
  }

  onShare = (priority, shares) => {
    const { postDetail: { data: { id, collected_time, domain, logo, title } } } = this.props;

    this.setState({
      onClickShare: true
    });

    this.props.shareArticle({
      id,
      title,
      domain,
      logo,
      collected_time,
      priority,
      shares
    });
  }

  // onTranslate = (text) => {
  //  const textChanged = text.replace(/<(?:.|\n)*?>/gm, '');

  //  this.setState({
  //  isTranslate: true
  //  }, () => {
  //  fetch(`https://api.mymemory.translated.net/get?q=${textChanged}&langpair=vi|en`)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //    const { responseData: { translatedText } } = responseJson;

  //    this.setState({
  //    subContent: textChanged === '' ? '' : translatedText,
  //    isTranslate: false
  //    });
  //   })
  //   .catch((error) => {
  //    console.error(error);
  //   });
  //  });
  // }

  writeToClipboard = async (text) => {
    await Clipboard.setString(text);
  };

  render() {
    const { loading, subContent, colorSave, failed } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <Header
            title=''
            type='stack'
            navigation={navigation}
            iconName='ios-bookmark'
            colorSave={colorSave}
            iconMenu
            onPress={this.onSaveAricle}
            onShare={(priority, shares) => this.onShare(priority, shares)}
            // onTranslate={() => this.onTranslate(subcontent)}
            onCopy={() => this.writeToClipboard(url)}
          />
          <Loading />
        </View>
      );
    }

    const {
      postDetail: { data: { body, domain, title, logo, time, category, url, image } },
      navigation,
      categories
    } = this.props;
    const categoryName = categories.data.find(it => it._id === category);

    const typeBody = domain === 'www.youtube.com' ?
      `<iframe src="${body.replace(/<(?:.|\n)*?>/gm, '')}" frameborder="0" allowfullscreen></iframe>` :
      body;

    return (
      <View style={styles.container}>
        <Header
          title=''
          type='stack'
          navigation={navigation}
          iconName='ios-bookmark'
          colorSave={colorSave}
          iconMenu
          onPress={this.onSaveAricle}
          onShare={(priority, shares) => this.onShare(priority, shares)}
          // onTranslate={() => this.onTranslate(subcontent)}
          onCopy={() => this.writeToClipboard(url)}
        />
        <View style={{ overflow: 'hidden' }}>
          <ParallaxScrollView
            keyboardShouldPersistTaps="always"
            maskColor="transparent"
            parallaxHeaderHeight={250}
            renderBackground={() => (
              <Image 
                style={{ height: 250, width: '100%' }}
                resizeMode='cover'
                source={{
                  uri: (image === undefined || image === '') ? emptyImage : image,
                  height: 250
                }}
              />)}
          >
            <View style={styles.wrapContentStyle}>
              <View style={styles.wrapTag}>
                <Text style={styles.txtName}>{categoryName.name}</Text>
              </View>
              <Text style={styles.titleStyle}>{title.trim()}</Text>
              <View style={styles.wrapSourceStyle}>
                <Image
                  style={styles.logoImage}
                  source={failed ? images.logoApp : { uri: logo }}
                  onError={() => {
                    this.setState({
                      failed: true
                    });
                  }}
                />
                <TouchableOpacity onPress={() => (url === null ? null : this.onLinking(url))}>
                  <Text style={[styles.txtSourceStyle, { paddingLeft: 10 }]}>{domain.trim()}</Text>
                </TouchableOpacity>
                <Text numberOfLines={2} style={styles.txtSourceStyle}>{` - ${time.trim().replace('|', '')}`}</Text>
              </View>
              <Text style={styles.txtSubContentStyle}>{subContent.replace(/<(?:.|\n)*?>/gm, '').trim()}</Text>
              {typeBody.trim() === '' ? <Text /> : <HTML
                html={typeBody.replace('block', '').replace('inline-block', '').replace('inline-', '').replace('fixed', 'absolute')}
                imagesMaxWidth={platform.deviceWidth - 100}
                baseFontStyle={{ fontSize: Scale.getSize(24), color: '#000' }}
                ignoredStyles={['display', 'font-family', 'letter-spacing', 'mso-bidi-font-style']}
                tagsStyles={{
                  p: {
                    paddingTop: Scale.getSize(10),
                    paddingBottom: Scale.getSize(10),
                    color: '#000',
                    textAlign: 'justify'
                  },
                  img: { overflow: 'visible' },
                  div: { alignItems: 'center' },
                  iframe: { width: '100%' }
                }}
              />}
            </View>
          </ParallaxScrollView>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: platform.isIphoneX ? 40 : 0,
    paddingBottom: platform.isIphoneX ? 10 : 0
  },
  titleStyle: {
    fontSize: Scale.getSize(26),
    fontWeight: '700',
    color: '#000'
  },
  wrapContentStyle: {
    width: '100%',
    paddingHorizontal: Scale.getSize(15),
    paddingTop: Scale.getSize(15),
    paddingBottom: 100
  },
  wrapSourceStyle: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center'
  },
  logoImage: {
    height: Scale.getSize(18),
    width: Scale.getSize(18)
  },
  txtSourceStyle: {
    fontSize: Scale.getSize(16),
    color: 'rgb(137,137,137)',
    paddingVertical: 5
  },
  txtSubContentStyle: {
    fontSize: Scale.getSize(24),
    fontWeight: '600',
    color: '#000',
    textAlign: 'justify'
  },
  wrapTag: {
    marginVertical: Scale.getSize(5),
    borderRadius: 5,
    alignItems: 'flex-start'
  },
  txtName: {
    color: '#fff',
    fontWeight: '700',
    backgroundColor: '#cc0099',
    paddingVertical: Scale.getSize(5),
    paddingHorizontal: Scale.getSize(10)
  }
});

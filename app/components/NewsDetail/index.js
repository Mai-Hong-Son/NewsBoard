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
import MyWebView from 'react-native-webview-autoheight';
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
    failedImageCover: false,
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
        colorSave: _.some(results, { id })
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
      this.setState({
        onClickShare: false
      });
      console.warn('success');
      // Alert.alert(
      //   I18n.t('alert.success'),
      //   I18n.t('alert.shareContent'),
      //   [
      //     {
      //       text: 'OK',
      //       onPress: () => this.setState({
      //         onClickShare: false
      //       })
      //     }
      //   ],
      //   { cancelable: false }
      // );
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
    const { loading, subContent, colorSave, failed, failedImageCover } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <Header
            title=''
            type='stack'
            navigation={this.props.navigation}
            iconName='bookmark'
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
    const htmlStyle = `<style>
                        div {
                          width:100%;
                          text-align: justify;
                          font-family: Arial;
                          font-size: 24px;
                        }
                        h1 {
                          font-size: 35px;
                        }
                        h2 {
                          font-size: 32px;
                        }
                        p {
                          font-size: 24px;
                        }
                        h3 {
                          font-size: 30px
                        }
                        img {
                          width:100%;
                        }
                        video {
                          width:100%;
                        }
                        iframe {
                          width:100%;
                          height: 300px;
                        }
                        td {
                          font-size: 22px;
                        }
               </style>`;

    const typeBody = domain === 'www.youtube.com' ?
      `<iframe src="${body.replace(/<(?:.|\n)*?>/gm, '')}" frameborder="0" allowfullscreen></iframe>` :
      body;

    return (
      <View style={styles.container}>
        <Header
          title=''
          type='stack'
          navigation={navigation}
          iconName='bookmark'
          colorSave={colorSave}
          iconMenu
          onPress={this.onSaveAricle}
          onShare={(priority, shares) => this.onShare(priority, shares)}
          // onTranslate={() => this.onTranslate(subcontent)}
          onCopy={() => this.writeToClipboard(url)}
        />
        <View
          style={{
            overflow: 'hidden',
            width: '100%',
            height: '100%'
          }}
        >
          <ParallaxScrollView
            keyboardShouldPersistTaps="always"
            maskColor="transparent"
            fadeOutForeground
            parallaxHeaderHeight={300}
            backgroundScrollSpeed={2}
            renderBackground={() => {
              const contentHeader = domain === 'www.youtube.com' ?
                (<View style={{ height: 300, width: '100%' }}>
                  <MyWebView
                    javaScriptEnabled
                    startInLoadingState
                    width={'100%'}
                    scalesPageToFit={platform.platform !== 'ios'}
                    source={{ html: htmlStyle + typeBody }}
                  />
                </View>) :
                (<Image
                  style={{ height: 300, width: '100%' }}
                  resizeMode='cover'
                  source={{
                    uri: failedImageCover || !image ? emptyImage : image,
                    height: 300
                  }}
                  onError={() => {
                    this.setState({
                      failedImageCover: true
                    });
                  }}
                />);
              return contentHeader;
            }}
          >
            <View style={styles.wrapContentStyle}>
              <View style={styles.wrapTag}>
                <Text style={styles.txtName}>{categoryName.name}</Text>
              </View>
              <Text style={styles.titleStyle}>{title.trim()}</Text>
              <View style={styles.wrapSourceStyle}>
                <Image
                  style={styles.logoImage}
                  source={failed || !images.logoApp ? images.logoApp : { uri: logo }}
                  onError={() => {
                    this.setState({
                      failed: true
                    });
                  }}
                />
                <TouchableOpacity onPress={() => (url === null ? null : this.onLinking(url))}>
                  <Text style={[styles.txtSourceStyle, { paddingLeft: 10 }]}>{domain.trim()}</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={[styles.txtSourceStyle, { width: 300 }]}>{` - ${time.trim().replace('|', '')}`}</Text>
              </View>
              {domain !== 'www.youtube.com' ? <Text style={styles.txtSubContentStyle}>{subContent.replace(/<(?:.|\n)*?>/gm, '').trim()}</Text>
                : <MyWebView
                  // style={{ height: 300 }}
                  startInLoadingState
                  width={'100%'}
                  source={{ html: subContent }}
                />
              }
              {typeBody.trim() === '' || domain === 'www.youtube.com' ? <Text /> : <View style={{ flex: 1 }}>
                <MyWebView
                  javaScriptEnabled
                  startInLoadingState
                  width={'100%'}
                  scalesPageToFit={platform.platform !== 'ios'}
                  source={{ html: htmlStyle + typeBody }}
                />
              </View>}
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
    fontSize: 26,
    paddingHorizontal: 8,
    fontWeight: '700',
    color: '#000'
  },
  wrapContentStyle: {
    width: '100%',
    paddingHorizontal: Scale.getSize(7),
    paddingTop: Scale.getSize(15),
    paddingBottom: 100
  },
  wrapSourceStyle: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 8
  },
  logoImage: {
    height: Scale.getSize(18),
    width: Scale.getSize(18)
  },
  txtSourceStyle: {
    fontSize: 16,
    color: 'rgb(137,137,137)',
    paddingVertical: 5
  },
  txtSubContentStyle: {
    fontSize: 24,
    paddingHorizontal: Scale.getSize(7),
    fontWeight: '600',
    color: '#000',
    textAlign: 'justify'
  },
  wrapTag: {
    marginVertical: Scale.getSize(5),
    paddingHorizontal: 8,
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

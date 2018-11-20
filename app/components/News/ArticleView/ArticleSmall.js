import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import moment from 'moment';
// import _ from 'lodash';

import Scale from '../../../theme/scale';
import platform from '../../../theme/platform';
import { emptyImage } from './ArticleLarge';
// import imageUrl from '../../../assets/images';

const IMAGE_SIZE = Scale.getSize(70);
// const TXT_BOX_SIZE = platform.deviceWidth - Scale.getSize(65) - IMAGE_SIZE;

export default class ArticleSmall extends React.PureComponent {
  state = {
    failed: false
  }

  render() {
    const { source: { image, title, domain, collected_time } } = this.props;
    // let isEmptyImage = true;

    // if (_.endsWith(image, '.png') ||
    // _.endsWith(image, '.jpg')) {
    //   if (image === '/static/news.jpg' || _.startsWith(image, 'http://35.196.179.240/static')) {
    //     isEmptyImage = true;
    //   } else {
    //     isEmptyImage = false;
    //   }
    // }

    return (
      <View style={styles.container}>
        <View style={styles.wrapImage}>
          <Image
            style={styles.image}
            source={{ uri: this.state.failed || !image ? emptyImage : image }}
            onError={() => {
              this.setState({
                failed: true
              });
            }}
          />
        </View>
        <View style={styles.wrapTxtBox}>
          <Text numberOfLines={2} style={styles.titleArticle}>{title}</Text>
          <Text style={styles.txtArticleSrc}>{`${domain} | ${moment(collected_time).fromNow()}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Scale.getSize(10),
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'rgb(237,237,237)',
    borderBottomWidth: 1
  },
  wrapImage: {
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: Scale.getSize(1) },
    shadowColor: '#777',
    shadowOpacity: 0.3,
    shadowRadius: Scale.getSize(3),
    elevation: Scale.getSize(1)
  },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 4
  },
  imageEmpty: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtEmpty: {
    fontSize: Scale.getSize(20),
    color: platform.primaryBlue,
    fontWeight: '800'
  },
  wrapTxtBox: {
    width: '85%',
    paddingLeft: 15
  },
  titleArticle: {
    // width: '100%',
    paddingBottom: Scale.getSize(8),
    fontSize: Scale.getSize(20),
    color: '#000',
    paddingRight: 15
  },
  txtArticleSrc: {
    fontSize: Scale.getSize(14),
    color: platform.borderColor
    // width: TXT_BOX_SIZE
  }
});

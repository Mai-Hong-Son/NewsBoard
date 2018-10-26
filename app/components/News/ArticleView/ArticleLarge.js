import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
// import moment from 'moment';
import _ from 'lodash';

import Scale from '../../../theme/scale';
import platform from '../../../theme/platform';
// import imageUrl from '../../../assets/images';

const IMAGE_SIZE = (platform.deviceWidth - Scale.getSize(70)) / 2;

export default class ArticleLarge extends React.PureComponent {
  render() {
    const { source: { image, title } } = this.props;
    let isEmptyImage = false;
    const emptyImage = 'data:image/png;base64,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';

    if (_.endsWith(image, '.png') ||
      _.endsWith(image, '.jpg')) {
      if (image === '/static/news.jpg') {
        isEmptyImage = true;
      } else {
        isEmptyImage = false;
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrapImage}>
          <Image
            style={styles.image}
            source={{ uri: isEmptyImage ? emptyImage : image }}
          />
        </View>
        <View>
          <Text numberOfLines={2} style={styles.titleArticle}>{title}</Text>
          {/* <Text style={styles.txtArticleSrc}>{`${domain} | ${moment(collected_time).fromNow()}`}</Text> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Scale.getSize(10)
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
    fontSize: Scale.getSize(40),
    color: platform.primaryBlue,
    fontWeight: '800'
  },
  titleArticle: {
    width: IMAGE_SIZE,
    paddingVertical: Scale.getSize(8),
    fontSize: Scale.getSize(20),
    color: '#000'
  },
  txtArticleSrc: {
    fontSize: Scale.getSize(14),
    color: platform.borderColor,
    width: IMAGE_SIZE
  }
});

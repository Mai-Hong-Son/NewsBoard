import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import moment from 'moment';

import Scale from '../../../theme/scale';
import platform from '../../../theme/platform';
import imageUrl from '../../../assets/images';

const IMAGE_SIZE = Scale.getSize(80);
const TXT_BOX_SIZE = platform.deviceWidth - Scale.getSize(65) - IMAGE_SIZE;

export default class ArticleSmall extends React.PureComponent {
  render() {
    const { source: { image, title, domain, collected_time } } = this.props;
    let isEmptyImage = false;

    if (image === 'file:///static/news.jpg' || image === undefined) {
      isEmptyImage = true;
    }

    return (
      <View style={styles.container}>
        <View style={styles.wrapImage}>
          {isEmptyImage ?
            (<View style={styles.imageEmpty}>
              <Text style={styles.txtEmpty}>{domain.slice(0, 2).toUpperCase()}</Text>
            </View>) :
            (<Image
              style={styles.image}
              source={{ uri: image === null ? imageUrl.emptyImage : image }}
            />)}
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
    justifyContent: 'space-between'
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
    backgroundColor: '#00FFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtEmpty: {
    fontSize: Scale.getSize(20),
    color: platform.primaryBlue,
    fontWeight: '800'
  },
  wrapTxtBox: {
    width: TXT_BOX_SIZE
  },
  titleArticle: {
    width: TXT_BOX_SIZE,
    paddingBottom: Scale.getSize(8),
    fontSize: Scale.getSize(25),
    color: '#000'
  },
  txtArticleSrc: {
    fontSize: Scale.getSize(14),
    color: platform.borderColor,
    width: TXT_BOX_SIZE
  }
});

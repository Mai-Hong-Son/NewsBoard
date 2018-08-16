import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import moment from 'moment';

import Scale from '../../../theme/scale';
import platform from '../../../theme/platform';
import imageUrl from '../../../assets/images';

const IMAGE_SIZE = (platform.deviceWidth - Scale.getSize(70)) / 2;

export default class ArticleLarge extends React.PureComponent {
  prevTime = time => {
    if (time.asSeconds() <= 60) return `${Math.ceil(time.asSeconds())} giây trước`;
    if (time.asMinutes() <= 60) return `${Math.ceil(time.asMinutes())} phút trước`;

    return `${Math.ceil(time.asHours())} giờ trước`;
  }
  render() {
    const { source: { image, title, domain, collected_time } } = this.props;
    const timeFomat = moment.duration(moment().diff(moment(collected_time)));
    let date = null;
    // console.warn(timeFomat.asHours());
    if (timeFomat.asHours() > 24) {
      date = moment(collected_time).format('DD/MM/YYYY');
    } else {
      date = this.prevTime(timeFomat);
    }

    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={{ uri: image === null ? imageUrl.emptyImage : image }}
          />
        </View>
        <View>
          <Text numberOfLines={2} style={styles.titleArticle}>{title}</Text>
          <Text style={styles.txtArticleSrc}>{`${domain} | ${date}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Scale.getSize(10)
  },
  // wrapImage: {
  //   shadowOffset: { width: 0, height: Scale.getSize(1) },
  //   shadowColor: '#777',
  //   shadowOpacity: 0.3,
  //   shadowRadius: Scale.getSize(3),
  //   elevation: Scale.getSize(1)
  // },
  image: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderRadius: 4
  },
  titleArticle: {
    width: IMAGE_SIZE,
    paddingVertical: Scale.getSize(8)
  },
  txtArticleSrc: {
    fontSize: Scale.getSize(10),
    color: platform.borderColor,
    width: IMAGE_SIZE
  }
});

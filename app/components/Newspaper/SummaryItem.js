import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import moment from 'moment';

import Scale from '../../theme/scale';
import { emptyImage } from '../News/ArticleView/ArticleLarge';
import platform from '../../theme/platform';

const IMAGE_SIZE_HEIGHT = Scale.getSize(50);
const IMAGE_SIZE_WIDTH = Scale.getSize(90);

export default class SummaryItem extends React.PureComponent {
  state = {
    failed: false
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { image, title, userCreate, userData, creator, updated_time } = this.props;

    return (
      <View style={styles.containerItem}>
        <View style={styles.wrapImage}>
          <Image
            style={styles.image}
            source={{ uri: this.state.failed || !image ? emptyImage : image }}
            onError={() => {
              this.setState({
                failed: true
              });
            }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.wrapTxtBox}>
          <Text numberOfLines={2} style={styles.titleArticle}>{title}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Gravatar
              options={{
                email: userCreate ? userCreate.email : userData.email,
                parameters: { size: '70', d: 'mm' },
                secure: true
              }}
              style={{
                width: Scale.getSize(15),
                height: Scale.getSize(15),
                borderRadius: Scale.getSize(15) / 2,
                marginRight: 5
              }}
            />
            <Text style={[styles.txtArticleSrc, { color: '#000' }]}>{`${this.capitalizeFirstLetter(creator)} | `}</Text>
            <Text style={styles.txtArticleSrc}>{moment(updated_time).fromNow()}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomColor: 'rgb(237,237,237)',
    borderBottomWidth: 1
    // justifyContent: 'space-between'
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
    height: IMAGE_SIZE_HEIGHT,
    width: IMAGE_SIZE_WIDTH,
    borderRadius: 4
  },
  wrapTxtBox: {
    width: '70%',
    paddingLeft: 15
  },
  titleArticle: {
    // width: TXT_BOX_SIZE,
    paddingBottom: Scale.getSize(8),
    fontSize: Scale.getSize(18),
    color: '#000'
  },
  txtArticleSrc: {
    fontSize: Scale.getSize(14),
    color: platform.borderColor
    // width: TXT_BOX_SIZE
  }
})
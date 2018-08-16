import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';

import platform from '../../theme/platform';
import * as commonActions from '../../../redux/actions';
import Scale from '../../theme/scale';
import Header from '../Reusables/Header';

@connect(
  state => ({
    postDetail: state.postDetail
  }),
  { ...commonActions }
)
export default class NewsDetail extends React.PureComponent {
  state = {
    loading: true
  }

  componentDidMount() {
    const { navigation: { state: { params: { idPost } } } } = this.props;

    this.props.getPostDetail(idPost);
  }

  componentWillReceiveProps(nextProps) {
    const { postDetail: { data } } = nextProps;

    this.setState({
      loading: false
    });
  }

  render() {
    const { loading } = this.state;

    if (loading) return <ActivityIndicator />;

    const { postDetail: { data: { body, domain, title, logo, time, subcontent } }, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Header title='' type='stack' navigation={navigation} iconName='flag' />
        <ScrollView>
          <View style={styles.wrapContentStyle}>
            <Text style={styles.titleStyle}>{title}</Text>
            <View style={styles.wrapSourceStyle}>
              <Image style={styles.logoImage} source={{ uri: logo }} />
              <Text style={styles.txtSourceStyle}>{`${domain} - ${time}`}</Text>
            </View>
            <Text style={styles.txtSubContentStyle}>{subcontent}</Text>
            <HTML
              html={body}
              imagesMaxWidth={platform.deviceWidth - 100}
              baseFontStyle={{ fontSize: Scale.getSize(19) }}
              tagsStyles={{
                p: {
                  paddingTop: Scale.getSize(10),
                  paddingBottom: Scale.getSize(10)
                },
                img: { overflow: 'visible' },
                div: { alignItems: 'center' }
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleStyle: {
    fontSize: Scale.getSize(22),
    fontWeight: '700'
  },
  wrapContentStyle: {
    width: platform.deviceWidth,
    paddingHorizontal: Scale.getSize(15),
    paddingTop: Scale.getSize(15)
  },
  wrapSourceStyle: {
    flexDirection: 'row',
    paddingVertical: Scale.getSize(5)
  },
  logoImage: {
    height: Scale.getSize(18),
    width: Scale.getSize(18)
  },
  txtSourceStyle: {
    fontSize: Scale.getSize(14),
    color: 'rgb(137,137,137)',
    paddingLeft: Scale.getSize(10)
  },
  txtSubContentStyle: {
    fontSize: Scale.getSize(19),
    fontWeight: '600'
  }
});

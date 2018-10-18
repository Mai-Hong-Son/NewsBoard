import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';

import Header from '../../Reusables/Header';
import platform from '../../../theme/platform';
import SafeArea from '../../../theme/SafeArea';
import * as commonActions from '../../../../redux/actions';
import Scale from '../../../theme/scale';
import { Loading } from '../../Reusables/Loading';

@connect(
  state => ({
    summaryDetail: state.summaryDetail
  }),
  { ...commonActions }
)
export default class SummaryDetail extends React.PureComponent {
  state = {
    loading: true,
    summaryDetail: {}
  }

  componentDidMount() {
    const { state: { params: { id } } } = this.props.navigation;

    this.props.getSummaryDetail(id);
  }

  componentWillReceiveProps(nextProps) {
    const { summaryDetail: { error, data } } = nextProps;

    if (!error) {
      this.setState({
        summaryDetail: data,
        loading: false
      });
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, summaryDetail } = this.state;
    let content = <Loading />;

    if (!loading) {
      const { title, description, creator, updated_time } = summaryDetail;
      // console.warn(description);
      content = (
        <ScrollView>
          <View style={styles.wrapContentStyle}>
            <View style={styles.wrapTag}>
              <Text style={styles.txtName}>{creator}</Text>
            </View>
            <Text style={styles.titleStyle}>{title}</Text>
            <View style={styles.wrapSourceStyle}>
              <Text style={styles.txtSourceStyle}>{updated_time}</Text>
            </View>
            <HTML
              html={description.trim()}
              imagesMaxWidth={platform.deviceWidth - 100}
              baseFontStyle={{ fontSize: Scale.getSize(24) }}
              ignoredStyles={['font-family', 'letter-spacing', 'Times New Roman', 'serif', 'normal']}
              tagsStyles={{
                p: {
                  paddingTop: Scale.getSize(10),
                  paddingBottom: Scale.getSize(10)
                },
                h1: {
                  fontSize: Scale.getSize(24),
                  paddingTop: Scale.getSize(10),
                  paddingBottom: 0
                },
                span: {
                  fontSize: Scale.getSize(24),
                  paddingBottom: 0
                },
                img: { overflow: 'visible' },
                div: { alignItems: 'center' }
              }}
            />
          </View>
        </ScrollView>
      );
    }

    return (
      <SafeArea>
        <Header
          title={''}
          navigation={navigation}
          type={'stack'}
        />
        {content}
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  titleStyle: {
    fontSize: Scale.getSize(27),
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
    fontSize: Scale.getSize(16),
    color: 'rgb(137,137,137)'
  },
  txtSubContentStyle: {
    fontSize: Scale.getSize(25),
    fontWeight: '600'
  },
  wrapTag: {
    padding: Scale.getSize(5),
    marginVertical: Scale.getSize(5),
    borderRadius: 5,
    backgroundColor: '#cc0099',
    width: 80,
    alignItems: 'center'
  },
  txtName: {
    color: '#fff',
    fontWeight: '700'
  }
});


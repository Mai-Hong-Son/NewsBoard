import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Gravatar } from 'react-native-gravatar';
import MyWebView from 'react-native-webview-autoheight';

import Header from '../../Reusables/Header';
import SafeArea from '../../../theme/SafeArea';
import * as commonActions from '../../../../redux/actions';
import Scale from '../../../theme/scale';
import { Loading } from '../../Reusables/Loading';

@connect(
  state => ({
    summaryDetail: state.summaryDetail,
    users: state.users,
    userInfo: state.userInfo
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
    const { navigation, users: { data: listUser }, userInfo: { data: userData } } = this.props;
    const { loading, summaryDetail } = this.state;
    const htmlStyle = `<style>
                        div {
                          width:100%;
                          font-family: Arial;
                        }
                        h2 {
                          font-size: 48px;
                        }
                        h1 {
                          font-size: 30px;
                        }
                        p {
                          font-size: 25px;
                        }
                        h3 {
                          font-size: 32px
                        }
                        img {
                          width:98%;
                        }
               </style>`;
    let content = <Loading />;

    if (!loading) {
      const { title, description, creator, updated_time } = summaryDetail;
      const userCreate = listUser.filter(it => it.username === creator)[0];

      content = (
        <ScrollView>
          <View style={styles.wrapContentStyle}>
            <Text style={styles.titleStyle}>{title}</Text>
            <View style={styles.wrapSourceStyle}>
              <View style={styles.wrapTag}>
                <Gravatar
                  options={{
                    email: userCreate ? userCreate.email : userData.email,
                    parameters: { size: '70', d: 'mm' },
                    secure: true
                  }}
                  style={{
                    width: Scale.getSize(15),
                    height: Scale.getSize(15),
                    borderRadius: Scale.getSize(15) / 2
                  }}
                />
                <Text style={styles.txtName}>{creator}</Text>
              </View>
              <Text style={styles.txtSourceStyle}>{` - ${moment(updated_time).format('DD/MM/YYYY - hh:mm:ss')}`}</Text>
            </View>
            <MyWebView
              startInLoadingState
              width={'100%'}
              source={{ html: htmlStyle + description }}
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
    fontSize: 27,
    paddingHorizontal: 8,
    fontWeight: '700',
    color: '#000'
  },
  wrapContentStyle: {
    width: '100%',
    paddingHorizontal: Scale.getSize(7),
    paddingTop: Scale.getSize(15)
  },
  wrapSourceStyle: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: Scale.getSize(5),
    alignItems: 'center'
  },
  logoImage: {
    height: Scale.getSize(18),
    width: Scale.getSize(18)
  },
  txtSourceStyle: {
    fontSize: 16,
    color: 'rgb(137,137,137)'
  },
  txtSubContentStyle: {
    fontSize: 25,
    fontWeight: '600'
  },
  wrapTag: {
    padding: Scale.getSize(7),
    marginVertical: Scale.getSize(5),
    borderRadius: 5,
    backgroundColor: '#cc0099',
    width: 80,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  txtName: {
    color: '#fff',
    fontWeight: '700'
  }
});


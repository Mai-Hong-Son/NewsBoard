import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import SafeArea from '../../../theme/SafeArea';
import * as commonActions from '../../../../redux/actions';
import Scale from '../../../theme/scale';
import platform from '../../../theme/platform';

@connect(
  state => ({
    languages: state.languages,
    regions: state.regions,
    countries: state.countries
  }),
  { ...commonActions }
)
export default class Filter extends React.PureComponent {
  constructor(props) {
    super(props);
    const { navigation: { state: { params: { dataFilter } } } } = this.props;

    this.state = {
      loading: true,
      data: dataFilter,
      dataSource: []
    };
  }

  componentDidMount() {
    const { state: { params: { title } } } = this.props.navigation;

    switch (title) {
      case 'Ngôn ngữ':
        this.props.getLanguages();
        break;
      case 'Quốc gia':
        this.props.getCountries();
        break;
      case 'Khu vực':
        this.props.getRegions();
        break;
      default:
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { navigation: { state: { params: { title } } } } = nextProps;
    let dataTemp = [];

    switch (title) {
      case 'Ngôn ngữ':
        {
          const { languages: { data } } = nextProps;
          dataTemp = data;
        }
        break;
      case 'Quốc gia':
        {
          const { countries: { data } } = nextProps;
          dataTemp = data;
        }
        break;
      case 'Khu vực':
        {
          const { regions: { data } } = nextProps;
          dataTemp = data;
        }
        break;
      default:
        break;
    }

    this.setState({
      loading: false,
      dataSource: dataTemp
    });
  }

  onClick = (data, checkExsist) => {
    if (data.checked === undefined) {
      data.checked = !checkExsist;
    } else {
      data.checked = !data.checked;
    }
    if (data.checked) {
      this.setState({
        data: [...this.state.data, ...[{ _id: data._id, name: data.name }]]
      });
    } else {
      this.setState({
        data: this.state.data.length !== 0 ? this.state.data.filter(item => item._id !== data._id) : []
      });
    }
  }

  onSubmit = () => {
    const { navigation: { state: { params: { onSubmit } } } } = this.props;
    const { data } = this.state;

    onSubmit && onSubmit(data);
    this.props.navigation.goBack();
  }

  renderItem = ({ item }) => {
    const rightText = item.name;
    const { navigation: { state: { params: { dataFilter } } } } = this.props;
    const checkExsist = dataFilter.some((el) => el._id === item._id);

    return (
      <CheckBox
        style={{ padding: Scale.getSize(15), width: platform.deviceWidth / 2 }}
        onClick={() => this.onClick(item, checkExsist)}
        checkBoxColor={platform.checkboxBgColor}
        rightTextStyle={styles.txtCheckbox}
        isChecked={checkExsist}
        rightText={rightText}
      />
    );
  }

  renderFlatlist = data => (
    <FlatList
      data={data}
      renderItem={this.renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
    />
  )

  render() {
    const { navigation } = this.props;
    const { loading, dataSource } = this.state;
    const { state: { params: { title } } } = navigation;
    const content = loading ? <ActivityIndicator color={platform.containerBg} /> : this.renderFlatlist(dataSource);

    return (
      <SafeArea>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='angle-left' size={Scale.getSize(40)} color={platform.containerBg} />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.wrapTitle}>
            <Text style={styles.txtTitle}>{title}</Text>
          </View>
          {content}
          <View style={styles.containerFooter}>
            <TouchableOpacity onPress={this.onSubmit}>
              <View style={styles.buttonOk}>
                <Text style={styles.txtOK}>{'Xác nhận'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33ccff',
    justifyContent: 'flex-end'
  },
  wrapTitle: {
    paddingVertical: Scale.getSize(20),
    paddingHorizontal: Scale.getSize(15)
  },
  txtTitle: {
    fontSize: Scale.getSize(20),
    fontWeight: '800',
    color: platform.containerBg
  },
  headerContainer: {
    height: Scale.getSize(80),
    width: platform.deviceWidth,
    justifyContent: 'flex-end',
    paddingBottom: Scale.getSize(15),
    backgroundColor: '#33ccff',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff'
  },
  txtCheckbox: {
    color: platform.checkboxLeftColor,
    fontSize: Scale.getSize(18),
    fontWeight: '700'
  },
  containerFooter: {
    backgroundColor: '#33ccff',
    paddingHorizontal: Scale.getSize(15),
    paddingBottom: Scale.getSize(25),
    paddingTop: Scale.getSize(10),
    width: '100%',
    position: 'absolute'
  },
  buttonOk: {
    backgroundColor: platform.checkboxBgColor,
    paddingVertical: Scale.getSize(25),
    borderRadius: Scale.getSize(50),
    alignItems: 'center'
  },
  txtOK: {
    fontSize: Scale.getSize(20),
    fontWeight: '700',
    color: '#fff'
  }
});
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import SafeArea from '../../../theme/SafeArea';
import FullGradient from '../../Reusables/FullGradient';
import platform from '../../../theme/platform';
import Scale from '../../../theme/scale';
import * as commonActions from '../../../../redux/actions';

@connect(
  state => ({
    users: state.users,
    updateIssue: state.updateIssue,
    createIssue: state.createIssue
  }),
  { ...commonActions }
)
export default class IssuesDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    const { state: { params: { dataSaved } } } = props.navigation;

    this.state = {
      startDateTimePickerVisible: false,
      endDateTimePickerVisible: false,
      showModal: false,
      loadUsers: true,
      isClick: false,

      title: dataSaved.title,
      description: dataSaved.description,
      fromDate: dataSaved.created_time,
      toDate: dataSaved.duedate,
      peopleAsign: dataSaved.assignees,
      isComplete: dataSaved.completed
    };
  }

  async componentDidMount() {
    await this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    const { updateIssue: { error: errUpdate }, createIssue: { error: errCreate } } = nextProps;
    const { isClick } = this.state;

    if (!errUpdate && isClick && !errCreate) {
      Alert.alert(
        'Thông báo',
        'Lưu thành công!',
        [
          {
            text: 'OK',
            onPress: () => {
              this.setState({
                isClick: false
              });
              this.props.navigation.goBack();
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  onClick = (data, checkExsist) => {
    if (data.checked === undefined) {
      data.checked = !checkExsist;
    } else {
      data.checked = !data.checked;
    }

    if (data.checked) {
      this.setState({
        peopleAsign: [...this.state.peopleAsign, ...[data.id]]
      });
    } else {
      this.setState({
        peopleAsign: this.state.peopleAsign.length !== 0 ? this.state.peopleAsign.filter(item => item !== data.id) : []
      });
    }
  }

  onSave = () => {
    const { state: { params: { dataSaved, type } } } = this.props.navigation;
    const { fromDate, toDate, peopleAsign, isComplete, title, description } = this.state;

    switch (type) {
      case 'update':
        this.setState({
          isClick: true
        }, () => this.props.updateIssues(dataSaved.id, {
          id: '',
          title,
          description,
          created_time: moment(fromDate).format('YYYY-MM-DDThh:mm:ss.sssZ'),
          duedate: moment(toDate).format('YYYY-MM-DDThh:mm:ss.sssZ'),
          completed: isComplete,
          starred: false,
          important: false,
          deleted: false,
          tags: [],
          assignees: peopleAsign
        }));
        break;
      case 'create':
        this.setState({
          isClick: true
        }, () => this.props.createIssues({
          id: '',
          title,
          description,
          created_time: moment(fromDate).format('YYYY-MM-DDThh:mm:ss.sssZ'),
          duedate: moment(toDate).format('YYYY-MM-DDThh:mm:ss.sssZ'),
          completed: isComplete,
          starred: false,
          important: false,
          deleted: false,
          tags: [],
          assignees: peopleAsign
        }));
        break;

      default:
        break;
    }
  }

  showModalAsign = () => this.setState({ showModal: !this.state.showModal });

  showStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: true });

  showEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: true });

  hideStartDateTimePicker = () => this.setState({ startDateTimePickerVisible: false });

  hideEndDateTimePicker = () => this.setState({ endDateTimePickerVisible: false });

  handleStartDatePicked = (date) => {
    this.setState({
      fromDate: date
    });

    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = (date) => {
    this.setState({
      toDate: date
    });

    this.hideEndDateTimePicker();
  };

  renderCheckbox = ({ item }) => {
    const { username } = item;
    const { state: { params: { dataSaved } } } = this.props.navigation;
    const checkExsist = dataSaved.assignees.some((el) => el === item.id);

    return (
      <CheckBox
        key={item.id}
        style={{ padding: Scale.getSize(15), width: platform.deviceWidth / 2 }}
        onClick={() => this.onClick(item, checkExsist)}
        checkBoxColor={platform.checkboxBgColor}
        rightTextStyle={styles.txtCheckbox}
        isChecked={checkExsist}
        rightText={username}
      />
    );
  }

  render() {
    const { navigation, users } = this.props;
    const { state: { params: { titleHeader, type } } } = navigation;
    const { fromDate, toDate, showModal, peopleAsign, isComplete, title, description } = this.state;

    return (
      <SafeArea>
        <FullGradient containerStyle={styles.headerContainer}>
          <View style={styles.wrapContentHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name='angle-left' size={Scale.getSize(40)} color={platform.containerBg} />
            </TouchableOpacity>
            <Text style={styles.txtTitleHeader}>{titleHeader}</Text>
            <TouchableOpacity onPress={this.onSave}>
              <Icon name='save' size={Scale.getSize(30)} color={platform.containerBg} />
            </TouchableOpacity>
          </View>
        </FullGradient>

        <ScrollView contentContainerStyle={styles.wrapForm}>
          <View style={styles.wrapTextinput}>
            <Text style={styles.txtTitleTextInput}>{'Tiêu đề:'}</Text>
            <TextInput
              onChangeText={(text) => this.setState({ title: text })}
              value={title}
              style={styles.textInputStyle}
              multiline
            />
          </View>
          <View style={styles.wrapDate}>
            <Text style={styles.txtTitleTextInput}>{'Ngày bắt đầu: '}</Text>
            <View style={styles.boxTxtDate}>
              <Text style={styles.txtTitleDate}>{moment(fromDate).format('DD/MM/YYYY')}</Text>
            </View>
            <TouchableOpacity onPress={this.showStartDateTimePicker}>
              <Icon name='calendar' size={18} color={platform.primaryBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapDate}>
            <Text style={styles.txtTitleTextInput}>{'Ngày kết thúc: '}</Text>
            <View style={styles.boxTxtDate}>
              <Text style={styles.txtTitleDate}>{moment(toDate).format('DD/MM/YYYY')}</Text>
            </View>
            <TouchableOpacity onPress={this.showEndDateTimePicker}>
              <Icon name='calendar' size={18} color={platform.primaryBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapDate}>
            <Text style={styles.txtTitleTextInput}>{'Giao cho: '}</Text>
            <View style={styles.boxTxtDate}>
              {peopleAsign.map(item =>
                (
                  <Text key={item.id} style={styles.txtTitleDate}>{
                    users.data.length !== 0 && users.data.filter(it => it.id === item)[0] ?
                      users.data.filter(it => it.id === item)[0].username : ''
                  }</Text>
                )
              )}
            </View>
            <TouchableOpacity onPress={this.showModalAsign}>
              <Icon name='edit' size={30} color={platform.primaryBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapTextinput}>
            <Text style={styles.txtTitleTextInput}>{'Mô tả:'}</Text>
            <TextInput
              onChangeText={(text) => this.setState({ description: text })}
              value={description}
              style={styles.textInputStyle}
              multiline
            />
          </View>
          {type === 'create' ? null : (<View style={styles.wrapDate}>
            <Text style={styles.txtTitleTextInput}>{'Hoàn thành: '}</Text>
            <CheckBox
              style={{ padding: Scale.getSize(15), width: platform.deviceWidth / 2 }}
              onClick={() => this.setState({ isComplete: !isComplete })}
              checkBoxColor={platform.primaryBlue}
              rightTextStyle={styles.txtCheckbox}
              isChecked={isComplete}
            />
          </View>)}
        </ScrollView>
        <DateTimePicker
          titleIOS={'Chọn thời gian bắt đầu'}
          confirmTextIOS={'Xác nhận'}
          cancelTextIOS={'Hủy'}
          isVisible={this.state.startDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
        />
        <DateTimePicker
          titleIOS={'Chọn thời gian kết thúc'}
          confirmTextIOS={'Xác nhận'}
          cancelTextIOS={'Hủy'}
          isVisible={this.state.endDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
        />
        <Modal
          isVisible={showModal}
          onBackdropPress={this.showModalAsign}
        >
          <View style={{ backgroundColor: '#fff' }}>
            <FlatList
              data={users.data}
              renderItem={this.renderCheckbox}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </Modal>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: platform.platform === 'ios' ? Scale.getSize(80) : Scale.getSize(60),
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: Scale.getSize(15)
  },
  txtTitleHeader: {
    fontSize: Scale.getSize(18),
    fontWeight: '700',
    color: '#fff'
  },
  wrapContentHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  wrapForm: {
    paddingHorizontal: Scale.getSize(15),
    paddingTop: Scale.getSize(15)
  },
  wrapDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Scale.getSize(10),
    alignItems: 'center',
    borderColor: 'rgb(240,240,240)',
    borderWidth: 1,
    borderRadius: 4,
    marginVertical: Scale.getSize(10),
    paddingHorizontal: Scale.getSize(10)
  },
  txtTitleDate: {
    fontSize: Scale.getSize(18)
  },
  txtCheckbox: {
    fontSize: Scale.getSize(18),
    fontWeight: '700'
  },
  txtLabel: {
    color: '#000',
    fontSize: Scale.getSize(18),
    fontWeight: '100'
  },
  wrapTextinput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: Scale.getSize(10),
    paddingHorizontal: Scale.getSize(10),
    borderColor: 'rgb(240,240,240)'
  },
  txtTitleTextInput: {
    color: 'rgb(137,137,137)',
    fontSize: Scale.getSize(18),
    paddingRight: 15
  },
  textInputStyle: {
    fontSize: Scale.getSize(18),
    color: '#000',
    width: platform.deviceWidth - Scale.getSize(160)
  }
});


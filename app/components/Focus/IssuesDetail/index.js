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
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CheckBox from 'react-native-check-box';
import moment from 'moment';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Gravatar } from 'react-native-gravatar';

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
      isClickDelete: false,

      title: dataSaved.title,
      description: dataSaved.description,
      fromDate: dataSaved.created_time === null ? new Date() : dataSaved.created_time,
      toDate: dataSaved.duedate === null ? new Date() : dataSaved.duedate,
      peopleAsign: dataSaved.assignees,
      isComplete: dataSaved.completed,
      starred: dataSaved.starred,
      important: dataSaved.important,
      tags: dataSaved.tags
    };
  }

  componentWillReceiveProps(nextProps) {
    const { updateIssue: { error: errUpdate }, createIssue: { error: errCreate } } = nextProps;
    const { isClick, isClickDelete } = this.state;

    if (!errUpdate && isClick && !errCreate && !isClickDelete) {
      Alert.alert(
        I18n.t('alert.success'),
        I18n.t('alert.saveIssueContent'),
        [
          {
            text: 'OK',
            onPress: () => {
              this.setState({
                isClick: false
              }, () => this.props.navigation.goBack());
            }
          }
        ],
        { cancelable: false }
      );
    }

    if (!errUpdate && isClickDelete) {
      Alert.alert(
        I18n.t('alert.success'),
        I18n.t('alert.deleteIssueSuccess'),
        [
          {
            text: 'OK',
            onPress: () => {
              this.setState({
                isClickDelete: false
              }, () => this.props.navigation.goBack());
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

  onSave = (isDelete) => {
    const { state: { params: { dataSaved, type } } } = this.props.navigation;
    const {
      fromDate,
      toDate,
      peopleAsign,
      isComplete,
      title,
      description,
      starred,
      important,
      tags
    } = this.state;

    switch (type) {
      case 'update':
        this.setState({
          isClick: true,
          isClickDelete: isDelete
        }, () => this.props.updateIssues(dataSaved.id, {
          id: '',
          title,
          description,
          created_time: moment(fromDate).format('YYYY-MM-DDThh:mm:ss.sssZ'),
          duedate: moment(toDate).format('YYYY-MM-DDThh:mm:ss.sssZ'),
          completed: isComplete,
          starred,
          important,
          deleted: isDelete,
          tags,
          assignees: peopleAsign
        }));
        break;
      case 'create':
        this.setState({
          isClick: true,
          isClickDelete: isDelete
        }, () => this.props.createIssues({
          id: '',
          title,
          description,
          created_time: moment(fromDate).format('YYYY-MM-DDThh:mm:ss.sssZ'),
          duedate: moment(toDate).format('YYYY-MM-DDThh:mm:ss.sssZ'),
          completed: isComplete,
          starred,
          important,
          deleted: isDelete,
          tags,
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
    const { username, email } = item;
    // const { state: { params: { dataSaved } } } = this.props.navigation;
    const checkExsist = this.state.peopleAsign.some((el) => el === item.id);

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Gravatar
          options={{
            email,
            parameters: { size: '70', d: 'mm' },
            secure: true
          }}
          style={{
            width: 20,
            height: 20,
            borderRadius: 10
          }}
        />
        <CheckBox
          key={item.id}
          style={{ padding: Scale.getSize(15), width: platform.deviceWidth / 2 }}
          onClick={() => this.onClick(item, checkExsist)}
          checkBoxColor={platform.checkboxBgColor}
          leftTextStyle={styles.txtCheckbox}
          isChecked={checkExsist}
          leftText={username}
        />
      </View>
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
            <TouchableOpacity style={{ paddingRight: 10 }} onPress={() => navigation.goBack()}>
              <Icon name='ios-arrow-back' size={35} color={platform.containerBg} />
            </TouchableOpacity>
            <Text style={styles.txtTitleHeader}>{titleHeader}</Text>
            <TouchableOpacity onPress={() => this.onSave(false)}>
              <Icon name='ios-bookmarks' size={30} color={platform.containerBg} />
            </TouchableOpacity>
          </View>
        </FullGradient>

        <ScrollView contentContainerStyle={styles.wrapForm}>
          <View style={styles.wrapTextinput}>
            <Text style={styles.txtTitleTextInput}>{I18n.t('issueDetail.title')}</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({ title: text })}
              value={title}
              style={styles.textInputStyle}
              multiline
            />
          </View>
          <View style={styles.wrapDate}>
            <Text style={styles.txtTitleTextInput}>{I18n.t('issueDetail.fromDate')}</Text>
            <View style={styles.boxTxtDate}>
              <Text style={styles.txtTitleDate}>{moment(fromDate).format('DD/MM/YYYY')}</Text>
            </View>
            <TouchableOpacity onPress={this.showStartDateTimePicker}>
              <Icon name='ios-calendar' size={20} color={platform.primaryBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapDate}>
            <Text style={styles.txtTitleTextInput}>{I18n.t('issueDetail.toDate')}</Text>
            <View style={styles.boxTxtDate}>
              <Text style={styles.txtTitleDate}>{moment(toDate).format('DD/MM/YYYY')}</Text>
            </View>
            <TouchableOpacity onPress={this.showEndDateTimePicker}>
              <Icon name='ios-calendar' size={20} color={platform.primaryBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapDate}>
            <Text style={styles.txtTitleTextInput}>{I18n.t('issueDetail.sendTo')}</Text>
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
            <TouchableOpacity onPress={() => {
              if (users.data.length === 0) {
                Alert.alert(
                  I18n.t('alert.title'),
                  I18n.t('alert.emptyUsers'),
                  [
                    {
                      text: 'OK',
                      onPress: () => null
                    }
                  ],
                  { cancelable: false }
                );
                return;
              }
              this.showModalAsign();
            }}
            >
              <Icon name='ios-person-add' size={30} color={platform.primaryBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapTextinput}>
            <Text style={styles.txtTitleTextInput}>{I18n.t('issueDetail.description')}</Text>
            <TextInput
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({ description: text })}
              value={description}
              style={[styles.textInputStyle, { height: 250 }]}
              multiline
            />
          </View>
          {type === 'create' ? null :
            (
              <View>
                <View style={styles.wrapDate}>
                  <Text style={styles.txtTitleTextInput}>{I18n.t('issueDetail.complicate')}</Text>
                  <CheckBox
                    style={{ padding: Scale.getSize(15), width: platform.deviceWidth / 2 }}
                    onClick={() => this.setState({ isComplete: !isComplete })}
                    checkBoxColor={platform.primaryBlue}
                    rightTextStyle={styles.txtCheckbox}
                    isChecked={isComplete}
                  />
                </View>
                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    I18n.t('alert.title'),
                    I18n.t('alert.confirmDeleteIssue'),
                    [
                      {
                        text: I18n.t('modal.cancel'),
                        onPress: () => null
                      },
                      {
                        text: I18n.t('modal.confirm'),
                        onPress: () => this.onSave(true)
                      }
                    ],
                    { cancelable: false }
                  );
                }}
                >
                  <View style={[styles.wrapDate, { justifyContent: 'center', backgroundColor: 'red' }]}>
                    <Icon name='ios-trash' size={30} color={'#fff'} />
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </ScrollView>
        <DateTimePicker
          titleIOS={I18n.t('filterMenu.fromDate')}
          confirmTextIOS={I18n.t('modal.confirm')}
          cancelTextIOS={I18n.t('modal.cancel')}
          isVisible={this.state.startDateTimePickerVisible}
          onConfirm={this.handleStartDatePicked}
          onCancel={this.hideStartDateTimePicker}
        />
        <DateTimePicker
          titleIOS={I18n.t('filterMenu.toDate')}
          confirmTextIOS={I18n.t('modal.confirm')}
          cancelTextIOS={I18n.t('modal.cancel')}
          isVisible={this.state.endDateTimePickerVisible}
          onConfirm={this.handleEndDatePicked}
          onCancel={this.hideEndDateTimePicker}
        />
        <Modal
          isVisible={showModal}
          onBackdropPress={this.showModalAsign}
        >
          <View style={{ backgroundColor: '#fff', maxHeight: '40%', borderRadius: 5 }}>
            <View style={{ paddingLeft: Scale.getSize(15), paddingVertical: Scale.getSize(15) }}>
              <Text style={{
                fontSize: Scale.getSize(18),
                fontWeight: '700',
                color: platform.primaryBlue
              }}
              >{I18n.t('issueDetail.sendTo')}</Text>
            </View>

            <FlatList
              data={users.data}
              contentContainerStyle={{ paddingLeft: Scale.getSize(15) }}
              renderItem={this.renderCheckbox}
              // numColumns={2}
              keyExtractor={(item) => item.id.toString()}
            />
            
            <View style={{ alignItems: 'flex-end', paddingRight: Scale.getSize(15), paddingVertical: Scale.getSize(15) }}>
              <TouchableOpacity onPress={this.showModalAsign}>
                <View
                  style={{
                    backgroundColor: platform.primaryBlue,
                    paddingVertical: Scale.getSize(7),
                    paddingHorizontal: Scale.getSize(15),
                    borderRadius: 5
                  }}
                >
                  <Text 
                    style={{
                      fontSize: Scale.getSize(18),
                      fontWeight: '700',
                      color: '#fff' 
                    }}
                  >{I18n.t('modal.done')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeArea>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: platform.platform === 'ios' ? 80 : 60,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 10
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
    alignItems: 'flex-start',
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
    width: platform.deviceWidth - Scale.getSize(160),
    padding: 0,
    paddingTop: 0,
    justifyContent: 'flex-start',
    textAlignVertical: 'top'
  }
});


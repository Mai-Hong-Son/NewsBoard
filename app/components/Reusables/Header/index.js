import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from 'react-native-popup-menu';
import { connect } from 'react-redux';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';
import RadioForm from 'react-native-simple-radio-button';

import FullGradient from '../FullGradient';

// theme component
import platform from '../../../theme/platform';
import Scale from '../../../theme/scale';
import * as commonActions from '../../../../redux/actions';

const priorityData = [
  {
    value: 1,
    label: 'Tin lưu ý'
  },
  {
    value: 3,
    label: 'Tin khẩn cấp'
  },
  {
    value: 2,
    label: 'Tin nghiêm trọng'
  }
];

@connect(
  state => ({
    users: state.users
  }),
  { ...commonActions }
)
export default class Header extends React.PureComponent {
  state = {
    showModal: false,
    peopleAsign: [],
    priority: priorityData[0].value
  }

  onShowModalPriority = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  onClickUser = (data) => {
    data.checked = !data.checked;

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

  onShareArticle = () => {
    const { priority, peopleAsign } = this.state;

    this.props.onShare(priority, peopleAsign);
    this.onShowModalPriority();
  }

  renderCheckboxUser = ({ item }) => {
    const { username } = item;
    item.checked = false;

    return (
      <CheckBox
        key={item.id}
        style={{ paddingVertical: Scale.getSize(15), width: (platform.deviceWidth - 60) / 2 }}
        onClick={() => this.onClickUser(item)}
        checkBoxColor={platform.checkboxBgColor}
        rightTextStyle={styles.txtCheckbox}
        isChecked={item.checked}
        rightText={username}
      />
    );
  }

  render() {
    const { navigation, title, iconName, type, hasSearch, iconMenu, users } = this.props;
    const { showModal } = this.state;
    const iconLeft = type !== 'stack' ? 'align-justify' : 'angle-left';
    const sizeBtnLeft = type !== 'stack' ? Scale.getSize(25) : Scale.getSize(40);

    return (
      <FullGradient
        containerStyle={styles.container}
      >
        <View style={styles.wrapContentHeader}>
          <View style={styles.wrapBoxLeft}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => (type !== 'stack' ? navigation.openDrawer() : navigation.goBack())}
            >
              <Icon
                name={iconLeft}
                color={platform.containerBg}
                size={sizeBtnLeft}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.txtNews}>{title.toUpperCase()}</Text>
          <View style={styles.wrapBoxRight}>
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => { this.props.onSearch(); }}
            >
              <Icon
                name={hasSearch ? 'search' : null}
                color={platform.containerBg}
                size={Scale.getSize(21)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <Icon
                name={iconName}
                color={platform.containerBg}
                size={Scale.getSize(25)}
              />
            </TouchableOpacity>
            {iconMenu ? (
              <Menu>
                <MenuTrigger>
                  <View style={{ paddingLeft: 30 }}>
                    <Icon
                      name='ellipsis-v'
                      color={platform.containerBg}
                      size={Scale.getSize(35)}
                    />
                  </View>
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption onSelect={this.onShowModalPriority}>
                    <Text style={styles.txtOptionMenu}>{'Chia sẻ'}</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => null}>
                    <Text style={styles.txtOptionMenu}>{'Sao chép liên kết'}</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => this.props.onTranslate()}>
                    <Text style={styles.txtOptionMenu}>{'Dịch sang tiếng anh'}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>) : null}
          </View>
        </View>
        <Modal
          isVisible={showModal}
          onBackdropPress={this.onShowModalPriority}
        >
          <View style={styles.wrapModalBox}>
            <Text style={styles.txtCheckboxGroup}>{'Chọn mức độ: '}</Text>
            <View style={{ paddingVertical: 15 }}>
              <RadioForm
                radio_props={priorityData}
                initial={0}
                labelStyle={styles.txtCheckbox}
                buttonColor={platform.primaryBlue}
                onPress={(value) => { this.setState({ priority: value }); }}
              />
            </View>
            <Text style={styles.txtCheckboxGroup}>{'Chia sẻ tới: '}</Text>
            <FlatList
              data={users.data}
              numColumns={2}
              renderItem={this.renderCheckboxUser}
              keyExtractor={(item) => item.id.toString()}
            />

            <View style={styles.footerModal}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.onShowModalPriority}>
                  <Text style={styles.txtButtonConfirm}>{'Hủy'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onShareArticle}>
                  <Text style={styles.txtButtonConfirm}>{'OK'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </FullGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: platform.platform === 'ios' ? Scale.getSize(80) : Scale.getSize(60),
    width: platform.deviceWidth,
    justifyContent: 'flex-end',
    paddingBottom: Scale.getSize(15)
  },
  wrapContentHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  txtNews: {
    color: platform.containerBg,
    fontWeight: platform.fontWeightTitle,
    fontSize: Scale.getSize(16)
  },
  wrapBoxLeft: {
    flex: 1
  },
  wrapBoxRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  txtOptionMenu: {
    fontSize: Scale.getSize(18),
    paddingVertical: 7
  },
  wrapModalBox: {
    backgroundColor: '#fff',
    padding: 15
  },
  txtCheckbox: {
    fontSize: Scale.getSize(18),
    fontWeight: '600'
  },
  txtCheckboxGroup: {
    fontSize: Scale.getSize(18),
    fontWeight: '600',
    color: platform.primaryBlue
  },
  txtButtonConfirm: {
    fontSize: Scale.getSize(18),
    fontWeight: '600',
    color: platform.primaryBlue,
    paddingHorizontal: Scale.getSize(15),
    marginRight: 8
  },
  footerModal: {
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingBottom: 10
  }
});

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
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
import I18n from 'react-native-i18n';
import { Gravatar } from 'react-native-gravatar';

import FullGradient from '../FullGradient';

// theme component
import platform from '../../../theme/platform';
import Scale from '../../../theme/scale';
import * as commonActions from '../../../../redux/actions';

@connect(
  state => ({
    users: state.users
  }),
  { ...commonActions }
)
export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    const priorityData = [
      {
        value: 1,
        label: I18n.t('share.normal')
      },
      {
        value: 3,
        label: I18n.t('share.critical')
      },
      {
        value: 2,
        label: I18n.t('share.important')
      }
    ];

    this.state = {
      showModal: false,
      peopleAsign: [],
      priority: priorityData[0].value
    };
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
    const { username, email } = item;
    // item.checked = false;

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
          style={{
            paddingHorizontal: Scale.getSize(15),
            width: platform.deviceWidth / 2,
            paddingVertical: Scale.getSize(7)
          }}
          onClick={() => this.onClickUser(item)}
          checkBoxColor={platform.checkboxBgColor}
          leftTextStyle={styles.txtCheckbox}
          isChecked={item.checked}
          leftText={username}
        />
      </View>
    );
  }

  render() {
    const { navigation, title, iconName, type, hasSearch, iconMenu, users, colorSave } = this.props;
    const { showModal } = this.state;
    const iconLeft = type !== 'stack' ? 'ios-menu' : 'ios-arrow-back';
    const sizeBtnLeft = Scale.getSize(35);
    const priorityData = [
      {
        value: 1,
        label: I18n.t('share.normal')
      },
      {
        value: 3,
        label: I18n.t('share.critical')
      },
      {
        value: 2,
        label: I18n.t('share.important')
      }
    ];

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
                name={hasSearch ? 'ios-search' : null}
                color={platform.containerBg}
                size={Scale.getSize(21)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <Icon2
                name={iconName}
                color={!!colorSave && colorSave ? 'yellow' : platform.containerBg}
                size={Scale.getSize(26)}
              />
            </TouchableOpacity>
            {iconMenu ? (
              <Menu>
                <MenuTrigger>
                  <View style={{ paddingLeft: 30 }}>
                    <Icon
                      name='ios-more'
                      color={platform.containerBg}
                      size={Scale.getSize(35)}
                    />
                  </View>
                </MenuTrigger>
                {this.props.type === 'stored' ? 
                  <MenuOptions>
                    <MenuOption onSelect={() => this.props.deleteAll()}>
                      <Text style={styles.txtOptionMenu}>{I18n.t('save.deleteAll')}</Text>
                    </MenuOption>
                  </MenuOptions> : <MenuOptions>
                    <MenuOption onSelect={this.onShowModalPriority}>
                      <Text style={styles.txtOptionMenu}>{I18n.t('share.title')}</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => this.props.onCopy()}>
                      <Text style={styles.txtOptionMenu}>{I18n.t('copyLink.content')}</Text>
                    </MenuOption>
                    {/* <MenuOption onSelect={() => this.props.onTranslate()}>
                      <Text style={styles.txtOptionMenu}>{'Dịch sang tiếng anh'}</Text>
                    </MenuOption> */}
                  </MenuOptions>}
              </Menu>) : null}
          </View>
        </View>
        <Modal
          isVisible={showModal}
          onBackdropPress={this.onShowModalPriority}
        >
          <View style={styles.wrapModalBox}>
            <Text style={styles.txtCheckboxGroup}>{I18n.t('modal.level')}</Text>
            <View style={{ paddingVertical: 10 }}>
              <RadioForm
                radio_props={priorityData}
                initial={0}
                labelStyle={styles.txtCheckbox}
                buttonColor={platform.primaryBlue}
                buttonSize={15}
                onPress={(value) => { this.setState({ priority: value }); }}
              />
            </View>
            <Text style={[styles.txtCheckboxGroup, { paddingBottom: 10 }]}>{I18n.t('modal.shareTo')}</Text>
            <FlatList
              data={users.data}
              // numColumns={2}
              renderItem={this.renderCheckboxUser}
              ListEmptyComponent={
                <Text style={{ fontSize: Scale.getSize(16), color: 'red' }}>
                  {I18n.t('alert.emptyUsers')}
                </Text>
              }
              keyExtractor={(item) => item.id.toString()}
            />

            <View style={styles.footerModal}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.onShowModalPriority}>
                  <Text style={styles.txtButtonConfirm}>{I18n.t('modal.cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onShareArticle}>
                  <Text style={styles.txtButtonConfirm}>{I18n.t('modal.confirm')}</Text>
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
    height: (platform.platform === 'ios' && !platform.isIphoneX) ? Scale.getSize(80) : Scale.getSize(60),
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: Scale.getSize(10)
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
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  txtOptionMenu: {
    fontSize: Scale.getSize(18),
    paddingVertical: 7,
    color: '#000'
  },
  wrapModalBox: {
    backgroundColor: '#fff',
    padding: 15,
    maxHeight: '70%',
    borderRadius: 5
  },
  txtCheckbox: {
    fontSize: Scale.getSize(18),
    fontWeight: '600'
  },
  txtCheckboxGroup: {
    fontSize: Scale.getSize(18),
    fontWeight: '600',
    color: platform.primaryBlue
    // paddingBottom: Scale.getSize(15)
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

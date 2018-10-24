import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import platform from '../../../theme/platform';

export default class FullGradient extends React.PureComponent {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    backgroundColor: PropTypes.array
  };

  static defaultProps = {
    containerStyle: {},
    backgroundColor: [platform.primaryBlue, platform.primaryBlue]
  };
  render() {
    const { containerStyle, children, backgroundColor } = this.props;

    return (
      <LinearGradient
        colors={backgroundColor}
        style={containerStyle}
      >
        {children}
      </LinearGradient>
    );
  }
}

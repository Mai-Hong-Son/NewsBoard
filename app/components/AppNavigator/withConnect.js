import { connect } from 'react-redux';
import { AppNavigator } from './index';

const mapStateToProps = (state) => ({
    state: state.navReducer
});

export const AppWithNavigationState = connect(mapStateToProps)(AppNavigator);

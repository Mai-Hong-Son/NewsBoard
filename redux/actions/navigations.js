import { NavigationActions } from 'react-navigation';
import _ from 'lodash';

const MAIN_TABS = ['Research', 'Warning', 'QRCode', 'Category', 'Contact'];

export function navigateMainTab(tabName) {
  return (dispatch, getState) => {
    const { mainRouter: { routes } } = getState();

    // Get 2 first routes in stack
    const [firstRoute, secondRoute] = routes;

    // Popping back before switching tab
    if (!_.isEmpty(secondRoute)) {
      const { key } = secondRoute;
      dispatch(NavigationActions.back({ key }));
    }

    // No `tabName` specified, remain to current main tab
    if (tabName == null) return;

    const { index, routeName } = firstRoute;

    // Switch tab if currently in a tab other than `tabName`
    if (routeName === 'HomeTab' && index !== _.indexOf(MAIN_TABS, tabName))
      dispatch(NavigationActions.navigate({ routeName: tabName }));
  };
}

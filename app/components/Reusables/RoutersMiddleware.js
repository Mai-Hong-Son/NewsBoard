import Singleton from 'singleton';
import _ from 'lodash';

class RoutersMiddleware extends Singleton {
  constructor() {
    super();
    this.lastActions = {};
    this.lastDispatchTimes = {};
  }

  duplicatedNavigate(action, routerName) {
    // Only watch for 'Navigation/' prefixed actions, others are allowed
    if (!_.startsWith(action.type, 'Navigation/')) return false;

    const dispatchTime = Date.now();
    const actionString = JSON.stringify(action);

    const { [routerName]: lastActionString } = this.lastActions;
    const { [routerName]: lastDispatchTime } = this.lastDispatchTimes;
    
    if (actionString === lastActionString &&
        lastDispatchTime + 1000 >= dispatchTime) {
      if (false) console.log('Duplicated navigate action', action);
      return true;
    }

    this.lastActions[routerName] = actionString;
    this.lastDispatchTimes[routerName] = dispatchTime;
    return false;
  }
}

export default RoutersMiddleware.get();

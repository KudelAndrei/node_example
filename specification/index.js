import * as statusName from '../models/entityStatus';

export default {
  isDisable(status) {
    if (statusName.DISABLE === Number(status)) {
      return true;
    }
    return false;
  },
  isActive(status) {
    if (statusName.ACTIVE === Number(status)) {
      return true;
    }
    return false;
  },
  isDelited(status) {
    if (statusName.DELETED === Number(status)) {
      return true;
    }
    return false;
  }
};

import Model from './Model';
import User from "./User";

class PayCalc extends Model {
  constructor(props) {
    super(props);
  }

  initialize(props) {
    super.initialize(props);
    this.parkingTime = props.parkingTime || 0;
    this.freeTime = props.freeTime || 0;
    this.timeDep = props.timeDep || 0;
    this.exitCheck = props.exitCheck || 0;
    this.user = new User(props.userByUserId || {});
    this.pushEvents = (props.pushEventsJson || []).map(pushEvent => {
      return pushEvent.type
    }).filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
  }
}

export default PayCalc;
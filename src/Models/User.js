import Model from './Model';
import CheckIn from "./CheckIn";
import Fare from "./Fare";

class User extends Model {
  constructor(props) {
    super(props);
  }

  initialize(props) {
    super.initialize(props);

    this.number = props.number || null;
    this.token = props.token || null;
    this.pushToken = props.pushToken || null;
    this.fare = new Fare(props.fareByFare || {});
    this.checkIns = (props.checkInsByUserIdList || []).map(checkIn => {
        return new CheckIn(checkIn || {});
    });
  }
}

export default User;
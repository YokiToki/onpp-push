import Model from './Model';
import User from "./User";

class CheckIn extends Model {
  constructor(props) {
    super(props);
  }

  initialize(props) {
    super.initialize(props);

    this.userId = props.userId || 0;
    this.user = new User(props.userByUserId || {});
    this.timeArr = props.timeArr || 0;
    this.timeDep = props.timeDep || 0;
    this.fare = props.fare || 0;

  }
}

export default CheckIn;
import Model from './Model';

class Fare extends Model {
  constructor(props) {
    super(props);
  }

  initialize(props) {
    super.initialize(props);

    this.freeTime = props.freeTime || null;
    this.type = props.type || null;
    this.cost = props.cost || 0;
    this.parking = props.parking || 0;
  }
}

export default Fare;
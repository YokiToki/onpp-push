class Model {
  constructor(props) {
    this.initialize(props)
  }

  initialize(props) {
    if (props.id) {
      this.id = props.id && Number(props.id) || null;
    }
  }

  toJson() {
    return Object.assign({}, this);
  }
}

module.exports = Model;
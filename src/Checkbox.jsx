import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      isChecked: false
    }
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, bookCode } = this.props;
    this.setState(({ isChecked }) => { isChecked: !isChecked });    
    handleCheckboxChange(bookCode);
  }

  render() {
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            className="bookList"
            value={this.props.bookCode}
            checked={this.state.isChecked}
            onChange={this.toggleCheckboxChange}
          />
          {this.props.label}
        </label>&nbsp;
        <b title={this.props.tc + ' Tokens Remaining'}>{this.props.p}</b>
      </div>
    );
  }
}

export default Checkbox;

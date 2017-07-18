import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  state = {
    isChecked: false
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, bookCode } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));    
    handleCheckboxChange(bookCode);
  }

  render() {
    return (
      <div className="checkbox" >
        <label>
          <input type="checkbox" className="bookList" value={this.props.bookCode} checked={this.state.isChecked} onChange={this.toggleCheckboxChange} />
          {this.props.label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;

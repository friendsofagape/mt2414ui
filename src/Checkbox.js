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
    const { label, bookCode } = this.props;
    const { isChecked } = this.state;
    return (
      <div className="checkbox" >
        <label>
          <input type="checkbox" value={bookCode} checked={isChecked} onChange={this.toggleCheckboxChange} />
          {label}
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

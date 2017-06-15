import React, { Component } from 'react';
import Checkbox from './Checkbox';

const booksName = [
  'GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'RUT', '1SA', '2SA', '1KI', '2KI', '1CH', '2CH', 'EZR', 'NEH', 'EST', 'JOB',
  'PSA', 'PRO', 'ECC', 'SNG', 'ISA', 'JER', 'LAM', 'EZK', 'DAN', 'HOS', 'JOL', 'AMO', 'OBA', 'JON', 'MIC', 'NAM', 'HAB', 'ZEP',
  'HAG', 'ZEC', 'MAL', 'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH', 'PHP', 'COL', '1TH', '2TH', '1TI',
  '2TI', 'TIT', 'PHM', 'HEB', 'JAS', '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV'
];

class BookName extends Component {
  componentWillMount = () => {
    console.log(new Set())
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(this.selectedCheckboxes);
      console.log(checkbox, 'Book is selected.');
    }
  }

  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    booksName.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <label className="bookHeader"><strong>Include Books</strong></label>
            <form className="myCheck" onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
            <button className="btn btn-default" type="submit">Save</button>
            </form>
          </div>
          <div className="col-sm-6">
            <label className="bookHeader"><strong>Exclude Books</strong></label>
            <form className="myCheck" onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
            <button className="btn btn-default" type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BookName;
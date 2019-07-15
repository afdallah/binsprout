import React, { Component } from 'react';
import { Select } from '@shopify/polaris';

let options = [{ label: 'Random', value: 'random'}]
let initYear = new Date().getFullYear()

for (var i = 0; i <= 8; i++) {
  let value = initYear

  if (i > 0) {
    value = ++initYear
  }

  options.push({ label: value.toString(), value: value.toString() })
}

class YearField extends React.Component {
  state = {
    selected: 'random',
  };

  handleChange = (newValue) => {
    this.setState({selected: newValue});
  };

  render() {
    return (
      <Select
        label="Year"
        options={options}
        onChange={this.handleChange}
        value={this.state.selected}
      />
    );
  }
}

export default YearField;
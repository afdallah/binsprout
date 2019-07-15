import React from 'react';
import { TextField } from '@shopify/polaris';

class CCVField extends React.Component {
  state = {
    value: null,
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render() {
    return (
      <TextField
        label="CCV"
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        minLength={3}
        maxLength={3}
      />
    );
  }
}

export default CCVField;
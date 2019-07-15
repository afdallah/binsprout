import React from 'react';
import { Form, FormLayout, Checkbox, TextField, Select, Button, Card } from '@shopify/polaris';
import YearField from './YearField';
import CCVField from './CCVField';
import axios from 'axios';

import { generateMonths, generateYears, generateCvc, formatCreditCard, isAllowedChar, randomize } from './utils'


const months = generateMonths()
const years = generateYears()
class FormGen extends React.Component {
  state = {
    bin: '',
    month: 'random',
    year: 'random',
    cvc: '',
    quantity: 15,
    generated: {
      number: '',
      month: '',
      year: '',
      cvc: '',
      result: ''
    }
  }

  handleSubmit = (event) => {
    const { bin } = this.state

    let binArr = bin.split('')

    if (bin.length < 16) {
      for (let i = bin.length; i < 16; i++) {
        binArr.push('x')
      }
    }

    this.props.generate({...this.state, binArr})


    this.setState({
      bin: binArr.join(''),
    })

    // this.validateNumber({number, month: newMonth, year: newYear, cvc: newCvc})

  };

  handleChange = (field) => {
    return (value) => {
      if ((field === 'bin') && isAllowedChar(value)) return

      if ((field === 'cvc') && value !== '' && !value.match(/[0-9]+$/i)) return
      this.setState({[field]: value})
    }
  };

  handleClearButtonClick = () => {
    this.setState({ bin: '' })
  }

  render() {
    const { number, result, month, year } = this.state.generated

    return (
      <Card  title="Easy bin generation" sectioned>
        <Form onSubmit={this.handleSubmit}>
          <FormLayout>
            <h2>{formatCreditCard(number)}</h2>
            <TextField
              label="BIN"
              value={this.state.bin}
              onChange={this.handleChange('bin')}
              type="text"
              placeholder="e.g. 847264xxxxxxxxxx"
              maxLength={16}
              clearButton
              onClearButtonClick={this.handleClearButtonClick}
              helpText="Hint: Only digit and 'x' character are allowed"
              showCharacterCount={true}
            />
            <FormLayout.Group condensed>
              <Select
                label="Month"
                options={months}
                onChange={this.handleChange('month')}
                value={this.state.month}
              />
              <Select
                label="Year"
                options={years}
                onChange={this.handleChange('year')}
                value={this.state.year}
              />
            </FormLayout.Group>
            <FormLayout.Group condensed>
              <TextField
                label="CVC"
                type="text"
                value={this.state.cvc}
                onChange={this.handleChange('cvc')}
                maxLength={4}
                placeholder="Leave it blank to randomize"
              />
              <TextField
                onChange={this.handleChange('quantity')}
                label="Quantity"
                type="number"
                value={this.state.quantity}
              />
            </FormLayout.Group>
            <Button submit primary size="large" fullWidth>Generate CC</Button>
          </FormLayout>
        </Form>
      </Card>

    );
  }
}

export default FormGen;
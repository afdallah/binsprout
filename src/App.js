import React from "react";
import FormGen from './FormGen';

import axios from "axios";
import { AppProvider, Page, Layout, EmptyState } from "@shopify/polaris";
import '@shopify/polaris/styles.css';
import TableResult from "./TableResult";

import {
  generateMonths,
  generateYears,
  generateCvc,
  formatCreditCard,
  isAllowedChar,
  randomize,
  luhn
} from './utils'


const months = generateMonths()
const years = generateYears()

class App extends React.Component {
  state = {
    data: null,
    generated: []
  };

  handleGenerate = async (obj) => {
    const { bin, month, year, cvc, quantity, binArr } = obj
    let generated = []

    for (let i = 0; i < quantity; i++) {
      let number = []
      binArr.forEach((char, n) => {
        let digit = Math.floor(Math.random() * 9)

        if (char.toLowerCase() !== 'x') {
          digit = char
        }

        if (n === binArr.length - 1) {
          digit = luhn(number.join(''))
          number.push(digit.toString());
        } else {
          number.push(digit.toString());
        }
      })

      number = number.join('')

      // Randomize Month and year
      const min = (arr) => arr[1].value
      const max = (arr) => arr[arr.length -1].value
      const newMonth = month === 'random' ? randomize(min(months), max(months)).padStart(2, '0') : month
      const newYear = year === 'random' ? randomize(min(years), max(years)) : year
      const newCvc = cvc === '' ? generateCvc().join('') : cvc

      // const status = await this.validateNumber({number, month: newMonth, year: newYear, cvc: newCvc})
      generated.push({
        number,
        month: newMonth,
        year: newYear,
        cvc: newCvc,
        // status
      })

      this.setState({
        generated
      })
    }


  }

  validateNumber = async ({number, month, year, cvc}) => {
    const url = "https://databusterz.com/check/api.php";
    const formData = new FormData()
    formData.set('data', `${number}|${month}|${year}|${cvc}`)

    try {
      const res = await axios({
        method: "post",
        url: `https://cors-anywhere.herokuapp.com/${url}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          "Accept": "*/*"
        },
        data: formData,
        crossdomain: true
      })

      return res.data.error
    } catch(err) {
      throw new Error(err)
    }
  }

  render() {
    return (
      <AppProvider>
        <Page
          title="CC Generator"
        >
          <Layout>
            <Layout.Section oneHalf>
              <FormGen generate={this.handleGenerate}/>
            </Layout.Section>
            <Layout.Section oneHalf>
              <TableResult generated={this.state.generated} />
            </Layout.Section>
          </Layout>
        </Page>
      </AppProvider>
    );
  }
}

export default App;
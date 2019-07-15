import React from 'react';
import { Page, Card, DataTable, EmptyState, Scrollable, Icon } from '@shopify/polaris';
import {TickSmallMinor, CancelSmallMinor} from '@shopify/polaris-icons';
import axios from 'axios';

class TableResult extends React.Component {

  render() {
    // const rows = [
    //   ['Emerald ', '$875.00', 124689, 140, '$122,500.00'],
    //   ['Mauve ', '$230.00', 124533, 83, '$19,090.00'],
    //   [
    //     'Navy Merino ',
    //     '$445.00',
    //     124518,
    //     32,
    //     '$14,240.00',
    //   ],
    // ];

    const { generated } = this.props

    const rows = []
    generated.map(item => {
    // rows.push([item.number, item.month, item.year, item.cvc, <Icon source={item.status === 1 ? TickSmallMinor : CancelSmallMinor} />])
    rows.push([item.number, item.month, item.year, item.cvc])
    })

    if (generated.length <= 0) {
      return (
        <EmptyState
          heading="To begin, hit generate button"
          // action={{content: 'Add transfer'}}
          // secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
          image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
        >
          <p>Track and receive your incoming inventory from suppliers.</p>
        </EmptyState>
      )
    }

    return (
        <Card>
        <Scrollable shadow style={{height: '380px'}}>

          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
              'text',
              // 'text',
            ]}
            headings={[
              'Number',
              'Month',
              'Year',
              'Cvc',
              // 'Status',
            ]}
            rows={rows}
          />
        </Scrollable>
        </Card>
      // <ul>
      //   {generated.map((card, id) => {
      //     return <li key={id}>{`${card.number}|${card.month}|${card.year}|${card.cvc}`}</li>
      //     }
      //   )}

      // </ul>

    );
  }
}

export default TableResult
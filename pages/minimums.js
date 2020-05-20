import React, { useState, useEffect } from 'react';

import { Page, Layout, TextStyle, EmptyState } from '@shopify/polaris';

import { TitleBar } from '@shopify/app-bridge-react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const GET_RESTRICTIONS = gql`
//   # Queryable fields for a restriction
//   type Restriction {
//     zip: String
//     minimum: String
//     name: String
//   }
//   query restrictions() {
//     zip
//     minimum
//     name
//     id
//   }
// `;

const Minimums = (props) => {
  const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

  const [zipCodes, setZipCodes] = useState([]);

  useEffect(() => {
    // hit the API to fetch zipCodes for this store
    // fetch('/graphql')
    //   .then((response) => response.json())
    //   .then((json) => console.log(json))
    //   .catch((error) => console.log(error));
    fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ restrictions { zip } }' }),
    })
      .then(res => res.json())
      .then(res => console.log(res.data));
    }, []);

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: 'Add Zip Code',
        }}
      />
      { zipCodes && zipCodes.length ?
        <Layout>
        <Query query={GET_PRODUCTS_BY_ID}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading…</div>;
            if (error) return <div>{error.message}</div>;
            console.log(data);
            return (
              <Card>
                <p>stuff here</p>
              </Card>
            );
          }}
        </Query>
          <h1>Minimum By Zip {props.key}</h1>
          <button>add a zip code</button>
          <h2>Zip Codes</h2>
          <ul>
            <li>
              <p>Zip code Name</p>
              <p>Zip code Zip</p>
              <p>Minimum</p>
            </li>
            <li>
              <p>La Habra Heights</p>
              <p>92620</p>
              <p>60</p>
            </li>
          </ul>
        </Layout>
      :
        <Layout>
          <EmptyState
            heading="Set Minimum Orders by Zip Code"
            action={{
              content: 'Add a Zip Code',
              onAction: () => console.log('clicked'),
            }}
            image={img}
          >
            <p>Add zip codes to set their minimum orders.</p>
          </EmptyState>
        </Layout>
      }
    </Page>
  )
}

export default Minimums;

import React, { useState, useEffect } from 'react';

import { Page, Layout, TextStyle, EmptyState } from '@shopify/polaris';

const Minimums = (props) => {
  const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

  const [zipCodes, setZipCodes] = useState([]);

  // useEffect(() => {
  //   // hit the API to fetch zipCodes for this store
  //   fetch('/api')
  //     .then((response) => response.json())
  //     .then((json) => setZipCodes(json))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <Page>
      { zipCodes && zipCodes.length ?
        <Layout>
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

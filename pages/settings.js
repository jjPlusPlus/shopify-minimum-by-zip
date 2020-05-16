import React, { useState } from 'react';

import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  Stack,
  TextField,
  SettingToggle,
  TextStyle,
} from '@shopify/polaris';

const Settings = () => {

  const [ minimum, setMinimum ] = useState("60.00");
  const [ enabled, setEnabled ] = useState(false);

  const contentStatus = enabled ? 'Disable' : 'Enable';
  const textStatus = enabled ? 'enabled' : 'disabled';

  const handleSubmit = (value) => {
    // POST to api with new default minimum
    console.log('updating default minimum to ', minimum);
  }

  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection title="Default minimum" description="When you add a zip code, minimum order will automatically set to" >
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={minimum}
                  onChange={(value) => setMinimum(value)}
                  label="Minimum"
                  type="text"
                />
                <Stack distribution="trailing">
                  <Button primary submit>
                    Save
                  </Button>
                </Stack>
              </FormLayout>
            </Form>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection title="Minimum Orders" description="Temporarily disable all Minimum Orders" >
            <SettingToggle
              action={{
                content: contentStatus,
                onAction: () => setEnabled(!enabled),
              }}
              enabled={enabled}
            >
              This setting is{' '}
              <TextStyle variation="strong">{textStatus}</TextStyle>.
            </SettingToggle>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  )
};

export default Settings;

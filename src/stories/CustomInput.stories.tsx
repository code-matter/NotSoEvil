import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CustomInput from '../components/CustomInput';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/CustomInput',
  component: CustomInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    id: {
      name: 'id',
      type: { name: 'string', required: true },
      defaultValue: '532e381d-294e-4d93-b9b4-8781d8fcd9a7',
      description: 'Automatically generated ID',
      control: { type: 'text' }
    },
    label: {
      name: 'label',
      type: { name: 'string', required: true },
      defaultValue: 'Custom Label',
      description: 'Label for the custom input',
      control: { type: 'text' }
    },
    subLabel: {
      name: 'subLabel',
      type: { name: 'string', required: false },
      defaultValue: 'Custom Label',
      description: 'Sublabel for the custom input.',
      control: { type: 'text' }
    },
    isRequired: {
      name: 'isRequired',
      type: { name: 'boolean', required: false },
      defaultValue: false,
      description: 'Should the field be required for the form.',
      control: { type: 'boolean' }
    },
    darkTheme: {
      name: 'darkTheme',
      type: { name: 'boolean', required: false },
      defaultValue: false,
      description: 'If true, sets the text color to white.',
      control: { type: 'boolean' }
    },
    hide: {
      name: 'hide',
      type: { name: 'boolean', required: false },
      defaultValue: false,
      description: 'If true, shows the input field.',
      control: { type: 'boolean' }
    },
  },
} as ComponentMeta<typeof CustomInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomInput> = (args) => {
  return (
    <>
      <CustomInput {...args} />
      {/* <div>
        <h2>CustomInput</h2>
        <p>This component is used to take string inputs.</p>
      </div> */}
    </>
  )
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Default.args = {
//   id: '532e381d-294e-4d93-b9b4-8781d8fcd9a7',
//   label: 'Custom Label',
// };

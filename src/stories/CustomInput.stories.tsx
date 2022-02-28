import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CustomInput from '../components/CustomInput';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CustomInput',
  component: CustomInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CustomInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomInput> = (args) => <CustomInput {...args} />;

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
  id: '532e381d-294e-4d93-b9b4-8781d8fcd9a7',
  label: 'Custom Label',
};

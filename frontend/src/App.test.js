import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
  const wrapper = mount(<App />)
  console.log(wrapper.debug())
});

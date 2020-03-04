import React from 'react';
import { shallow } from 'enzyme';
import AsciiFacesPage from './';

describe('AsciiFacesPage', () => {
  it('renders without crashing', () => {
     shallow(<AsciiFacesPage />);
  })
  
  it('fetch product on app mount', () => {
    const props = {
      page: 0,
      sort: "id",
      resetList: false,
      loading: false,
      setLoading: jest.fn(),
      handleReset: jest.fn()
    }
    const wrapper = shallow(<AsciiFacesPage {...props} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'getProduct'); 
    instance.componentDidMount();
    expect(instance.getProduct).toHaveBeenCalledTimes(2)
  })
});

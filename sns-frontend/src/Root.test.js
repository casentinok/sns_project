import React from 'react';
import { shallow } from 'enzyme';
import Root from './Root';
import './setupTest';
describe('App', () => {
  let component = null;
  
  it('renders correctly', () => {
    component = shallow(<Root />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
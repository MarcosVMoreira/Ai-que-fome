import { Button, TextField } from '@material-ui/core';
import { createMount } from '@material-ui/core/test-utils';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../../store/reducers/index';
import { Login } from './Login';

configure({ adapter: new Adapter() });

describe('<Login /> Email', () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
    jest.clearAllMocks();
  });

  it('should render email input on first load', () => {
    const mockStore = createStore(rootReducer);
    const wrapper = mount(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );
    const textField = wrapper.find(TextField);

    expect(textField.find({ label: 'Email' }).exists()).toBe(true);
    expect(textField.find({ label: 'Senha' }).exists()).toBe(false);
  });

  it('should show invalid email if input empty', () => {
    const mockStore = createStore(rootReducer);

    const wrapper = mount(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

    expect(wrapper.find(TextField).props().helperText).toBe(false);
    wrapper.find(Button).simulate('submit');
    expect(wrapper.find(TextField).props().helperText).toBe('Email inválido!');
  });

  it('should show invalid email if input has invalid email', () => {
    const mockStore = createStore(rootReducer);

    const wrapper = mount(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

    wrapper.find(TextField).props().value = 'otavio@otavio';
    expect(wrapper.find(TextField).props().value).toBe('otavio@otavio');
    expect(wrapper.find(TextField).props().helperText).toBe(false);

    wrapper.find(Button).simulate('submit');
    expect(wrapper.find(TextField).props().helperText).toBe('Email inválido!');
  });
});

describe('<Login /> Password', () => {
  const initialState = {
    auth: {
      error: null,
      loading: false,
      token: null,
      registered: true,
      authenticated: false,
    },
  };
  let mount;

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render password input on user entered valid email', () => {
    const mockStore = createStore(rootReducer, { ...initialState });

    const wrapper = mount(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

    const textField = wrapper.find(TextField);
    expect(textField.find({ label: 'Email' }).exists()).toBe(false);
    expect(textField.find({ label: 'Senha' }).exists()).toBe(true);
  });

  it('should show invalid password if input empty or less than 5 chars', () => {
    const mockStore = createStore(rootReducer, { ...initialState });

    const wrapper = mount(
      <Provider store={mockStore}>
        <Login />
      </Provider>,
    );

    expect(wrapper.find(TextField).props().helperText).toBe(false);
    wrapper.find(Button).simulate('submit');
    expect(wrapper.find(TextField).props().helperText).toBe('Senha inválida!');
  });
});

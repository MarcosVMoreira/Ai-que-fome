import { unmask } from './unmask';

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

export const validatePassword = password => {
  const re = /^.{5,}$/;
  return re.test(password.toLowerCase());
};

export const validateName = name => {
  const re = /^.{5,}$/;
  return re.test(name.toLowerCase());
};

export const validateNumber = number => {
  const re = /^\d+$/;
  return re.test(number.toLowerCase());
};

export const validateDocument = document => {
  const re = /^\d{11}$/;
  return re.test(unmask(document));
};

export const validateCompanyDocument = document => {
  const re = /^\d{14}$/;
  return re.test(unmask(document));
};

export const validatePhone = phone => {
  const re = /^\d{11}$/;
  return re.test(unmask(phone.replace(/[ ]/g, '')));
};

export const validatePostalCode = postalCode => {
  const re = /^[0-9]{5}-[0-9]{3}$/;
  return re.test(postalCode);
};

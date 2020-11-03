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
  const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return re.test(document);
};

export const validatePhone = phone => {
  const re = /(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/;
  return re.test(phone.replace(/[ ]/g, ''));
};

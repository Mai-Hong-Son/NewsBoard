export const isPhoneNumber = phonenumber => {
  const phoneRe = /(09|01[2|6|8|9])+([0-9]{8})\b/g;
  const digits = phonenumber.replace(/\D/g, '');

  return phoneRe.test(digits);
};

export const isEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

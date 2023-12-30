const whitespaceRegExp = /^$|\s+/;

export const loginValidate = (credentials, setErr) => {
  return new Promise((resolve, reject) => {
    try {
      let flag = false;
      if (!whitespaceRegExp.test(credentials.credential)) {
        if (!whitespaceRegExp.test(credentials.password)) {
          flag = true;
        } else {
          setErr("Password can't contain whitespace");
        }
      } else {
        setErr("Username or email can't contain whitespace");
      }

      resolve(flag);
    } catch (error) {
      setErr(error?.message);
      resolve(false);
    }
  });
};

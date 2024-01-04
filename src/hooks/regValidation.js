const checkEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const checkUsername = (username) => {
  const isValidFormat = /^[a-zA-Z0-9_]+$/.test(username);

  const doesNotStartWithNumber = /^[0-9]/.test(username);

  return isValidFormat && !doesNotStartWithNumber;
};

const checkName = (name) => {
  const isValidFormat = /^[a-zA-Z]+$/.test(name);
  const containsOnlySpaces = /^\s+$/.test(name);

  return isValidFormat && !containsOnlySpaces;
};

const checkEmpty = (email, username, password, fName, lName) => {
  let flag = false,
    setErr;

  if (fName && lName) {
    if (email) {
      if (username && username.length >= 4) {
        if (password && password.length >= 6) {
          flag = true;
        } else {
          setErr = "Password should have a minimum length of 6 characters.";
        }
      } else {
        setErr = "The username must consist of a minimum of four characters.";
      }
    } else {
      setErr = "Please provide a valid email address.";
    }
  } else {
    setErr = "Please provide Full Name";
  }

  return { flag, setErr };
};

export const regValidate = async ({
  fName,
  lName,
  email,
  username,
  password,
  password2,
  setErr,
  
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const empty = checkEmpty(email, username, password, fName, lName);
      if (!empty.flag) {
        setErr(empty.setErr);
        resolve(false);
      }

      let flag = false;

      if (checkName(fName)) {
        if (checkName(lName)) {
          if (checkUsername(username)) {
            if (checkEmail(email)) {
              if (password === password2) {
                flag = true;
              } else {
                setErr("Passwords do not match");
              }
            } else {
              setErr("Enter a valid email address");
            }
          } else {
            setErr(
              "Invalid Username. Username should only contain\nletters, numbers, and '_', and should not start with a number."
            );
          }
        } else {
          setErr("Invalid Last Name. Name should only contain\nLetters");
        }
      } else {
        setErr("Invalid First Name. Name should only contain\nLetters");
      }

      resolve(flag);
    } catch (error) {
      setErr(error?.message);
      resolve(false);
    }
  });
};

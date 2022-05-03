export const setValue = (key, value) => {
  const sessionStorage = window.sessionStorage;
  
  if (value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  } 
};

export const removeValue = (keys) => {
  const sessionStorage = window.sessionStorage;

  keys.forEach((key) => {
    if (sessionStorage.getItem(key)) {
      sessionStorage.removeItem(key);
    }
  });
};

export const getValue = (key) => {
  const sessionStorage = window.sessionStorage;

  if (sessionStorage.getItem(key)) {
    return JSON.parse(sessionStorage.getItem(key));
  } else {
    return null;
  }
};

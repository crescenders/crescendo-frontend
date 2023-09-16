export const setCookie = (key: string, value: string, days = 1) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = days ? date.toUTCString() : '';
  document.cookie = `${key}=${
    encodeURIComponent(value) || ''
  }; path=/; expires=${expires}; `;
};

export const getCookie = (key: string) => {
  const cookieArr = document.cookie.split('; ');

  for (let i = 0; i < cookieArr.length; i++) {
    const splitCookie = cookieArr[i].split('=');
    if (key === splitCookie[0]) {
      return decodeURIComponent(splitCookie[1]);
    }
  }

  return null;
};

export const deleteCookie = (key: string) => {
  document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

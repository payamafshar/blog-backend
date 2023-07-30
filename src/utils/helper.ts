import { Request } from 'express';

export const randomNumberGenerator = () => {
  return Math.floor(Math.random() * 10000 + 10000);
};

export function parseCookies(request: Request): any {
  const list = {};
  const cookieHeader = request?.headers?.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });
  return list;
}

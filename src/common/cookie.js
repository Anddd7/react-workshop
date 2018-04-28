/**
 * 设置cookie ,默认保留30分钟
 * @param key,val key:value
 * @param expire 过期时间(s)
 */
export function setCookie(key, val, expire) {
  const expireTime = new Date();
  if (expire) {
    expireTime.setSeconds(expireTime.getSeconds() + expire);
  } else {
    expireTime.setSeconds(expireTime.getSeconds() + 1800);
  }

  document.cookie = `${key}=${encodeURI(val)};expires=${expireTime.toUTCString()}`;
  console.debug('setCookie', document.cookie);
}

export function getCookie(key) {
  let valueStr = '';
  if (document.cookie.length > 0) {
    let startIndex = document.cookie.indexOf(`${key}=`);
    if (startIndex > -1) {
      startIndex = startIndex + key.length + 1;
      let endIndex = document.cookie.indexOf(';', startIndex);
      if (endIndex === -1) {
        endIndex = document.cookie.length;
      }
      valueStr = decodeURI(document.cookie.substring(startIndex, endIndex));
    }
  }
  console.debug('getCookie', valueStr);
  return valueStr;
}

export function delCookie(key) {
  setCookie(key, '', -1);
}

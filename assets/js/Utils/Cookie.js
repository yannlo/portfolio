/**
 * 
 * @param {string} name 
 * @returns {string|null}
 */
export function getCookie(name){
    const cookies =document.cookie.split("; ");
    const value = cookies
        .find( c => c.startsWith(name))
        ?.split("=")[1]
    if(value === undefined){
        return null;
    }
    return decodeURIComponent(value);
}


/**
 * 
 * @param {string} name 
 * @param {string} value 
 * @param {number} days 
 * @param {string} sameSite 
 */
export function setCookie(name, value, days, sameSite="Strict", path="/"){
    const date = new Date();
    date.setDate(date.getDate() + days)
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; SameSite=${sameSite}; path=${path};`
}

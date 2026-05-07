/* --- It contents all the helper function, mostly for authentication related logics --- */

// Remove all cookies
export const removeAllCookies = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Strict`;
    }
};

// Set a cookie for a given number of days (default 7)
export const setCookie = (key, value, days = 7) => {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${key}=${value};${expires};path=/;SameSite=Strict`;
};

// Get a cookie by key
export const getCookie = (key) => {
    const name = key + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
};

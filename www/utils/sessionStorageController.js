export const getData = (key) => {
    const res = JSON.parse(sessionStorage.getItem(key));
    return res ? res : [];
}

export const setData = (key, arr) => {
    try {
        sessionStorage.setItem(key, JSON.stringify(arr));
    } catch (error) {
        console.log(error);
    }
}

export const deleteCollection = (key) => {
    sessionStorage.removeItem(key);
}

export const getSessionData = (key) => JSON.parse(sessionStorage.getItem(key));
export const setSessionData = (key, value) => sessionStorage.setItem(key, JSON.stringify(value));
export const deleteSessionData = (key) => sessionStorage.removeItem(key);
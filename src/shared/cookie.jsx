import Cookies from 'universal-cookie';

export const setStorage = (name, value) => {
    localStorage.setItem(name, value)
}

export const clearStorage = () => {

    localStorage.clear()
}

export const getStorage = () => {

    return { [type]: localStorage.getItem(type) }
}

export const cookies = new Cookies();
import Cookies from 'universal-cookie';

export const setStorage = (name, value) => {
    localStorage.setItem(name, value)
}

export const clearStorage = () => {

    localStorage.clear()

    // document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'
    // document.cookie = 'pwd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'
    // document.cookie = 'pwdCheck=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'
    // document.cookie = 'generation=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'

    // document.cookie = 'insight=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'
    // document.cookie = 'lifePattern=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'
    // document.cookie = 'judgement=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'
    // document.cookie = 'energy=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'

    // document.cookie = 'mbtiRes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup/making;'

}

export const getStorage = (type = 'all') => {

    switch (type) {
        case 'mbti':
            let mbti = { mbtiRes: localStorage.getItem('mbtiRes') }

            return mbti

        case 'all':
            let store = {
                username: localStorage.getItem('username'),
                pwd: localStorage.getItem('pwd'),
                generation: localStorage.getItem('generation'),
                energy: localStorage.getItem('energy'),
                insight: localStorage.getItem('insight'),
                judgement: localStorage.getItem('judgement'),
                lifePattern: localStorage.getItem('lifePattern'),
            }

            return store

        default:
            return { [type]: localStorage.getItem(type) }
    }
    // return CookieList
}

export const cookies = new Cookies();
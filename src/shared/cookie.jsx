import Cookies from 'universal-cookie';

export const setCookie = (name, value) => {
    document.cookie = `${name}=${value}`
}

export const signUpCookie = () => {

    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'
    document.cookie = 'pwd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'
    document.cookie = 'pwdCheck=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'
    document.cookie = 'generation=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'

    document.cookie = 'insight=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'
    document.cookie = 'lifePattern=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'
    document.cookie = 'judgement=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'
    document.cookie = 'energy=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'
    
    document.cookie = 'mbtiRes=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup;'
}

export const getCookie = () => {
    let Cookies = document.cookie.split('; ')
    let CookieList = {}
    
    Cookies.map((v)=>{
        let vsp = v.split('=')
        CookieList = {...CookieList, [vsp[0]]: vsp[1]}
    })

    return CookieList
}

export const cookies = new Cookies();
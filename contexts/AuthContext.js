import {createContext, useEffect, useState} from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";

import {api} from "../services/api";
import {toast} from "react-toastify";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {

    const { 'whydo-token': token, 'whydo-email': email } = parseCookies()

    if(token) {
      api.get(`/users/auth?email=${email}`).then(response => {
        const newUser = response.data[0]
        setUser(newUser)
      })
    }

  },[accessToken])

  async function signIn({email, password}) {
    try {
      setIsLoading(true)
      const {data: {access_token}} = await api.post('/users/authenticate', {
        email,
        password
      })
      setCookie(undefined, 'whydo-token', access_token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

      localStorage.setItem("whydo:accessToken", access_token);

      setCookie(undefined, 'whydo-email', email, {
        maxAge: 60 * 60 * 1, // 1 hour
      })


      setUser(email)
      setAccessToken(access_token)
      setIsLoading(false)
      setLoginError(false)
      Router.push('/admin/dashboard')
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      setLoginError(true)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated,isLoading, loginError, signIn }}>
      {children}
    </AuthContext.Provider>

  )
}

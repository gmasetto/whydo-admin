import {createContext, useEffect, useState} from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router";

import {api} from "../services/api";
import {toast} from "react-toastify";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'whydo-token': token, 'whydo-email': email } = parseCookies()

    if(token) {
      api.get(`/users/auth?email=${email}`).then(response => {
        const newUser = response.data[0]
        setUser(newUser)

      })
    }

  },[])

  async function signIn({email, password}) {
    try {
      const {data: {access_token}} = await api.post('/users/authenticate', {
        email,
        password
      })
      setCookie(undefined, 'whydo-token', access_token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

      setCookie(undefined, 'whydo-email', email, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

      setUser(email)

      Router.push('/admin/dashboard')
    } catch (e) {
      console.log(e)
      toast.error('Login ou senha incorretos', {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>

  )
}
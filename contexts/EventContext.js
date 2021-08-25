import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext";

export const EventContext = createContext({});

export function EventProvider({ children }) {
  const { user } = useContext(AuthContext || null)
  const [event, setEvent] = useState(0);

  useEffect(() => {
    if(user){
      setEvent(user?.id_event)
    }

  },[user])

  async function handleChangeEvent(e) {
    setEvent(e)
  }

  return (
    <EventContext.Provider value={{ handleChangeEvent, event }}>
      {children}
    </EventContext.Provider>

  )
}

import React, { createContext, useEffect, useState } from "react";

export const Authcontext = createContext()

const ContextAPI=({ children })=>{
    const [user, setUser] = useState("")

    useEffect(() => {
        const userdata = sessionStorage.getItem('user');
        if (userdata) {
            setUser(JSON.parse(userdata));
        }
    },[])
    
    return (
        <Authcontext.Provider value={{user, setUser}}>
            {children}
        </Authcontext.Provider>
    )
}
export default ContextAPI

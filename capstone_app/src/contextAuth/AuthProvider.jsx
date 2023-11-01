import { createContext, useState } from "react";

const AuthContext = createContext({})
/* need to configure this component to work with our backend */
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  return(
    <>
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
    </>
  )
}

export default AuthContext;
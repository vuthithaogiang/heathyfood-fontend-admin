import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProovider = ({ children }) => {
    const [auth, setAuth] = useState({});

    console.log(auth);

    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

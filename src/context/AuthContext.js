import { createContext, useState, useEffect, useContext } from "react";
// import { useState } from "react/cjs/react.production.min"
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";


const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
        const [authUser, setAuthUser] = useState(null);
        const [dbUser, setDBUser] = useState(null);
        const sub = authUser?.attributes?.sub;


        useEffect(() => {
                Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
        }, []);

        useEffect(() => {
                DataStore.query(User, (user) => user.sub.eq(sub)).then((users) =>
                        setDBUser(users[0]));
        }, [sub]);



        return (
                <AuthContext.Provider value={{ authUser, dbUser, sub, setDBUser }}>
                        {children}
                </AuthContext.Provider>
        );
};



export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

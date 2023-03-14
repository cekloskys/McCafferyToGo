import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore, Hub } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
        const [authUser, setAuthUser] = useState(null);
        const [dbUser, setDBUser] = useState(null);
        const sub = authUser?.attributes?.sub;

        useEffect(() => {
                Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
        }, []);

        const getDbUser = () => {
                DataStore.query(User, (user) => user.sub.eq(sub)).then((users) =>
                        setDBUser(users[0]));
        };

        useEffect(() => {
                const removeListener = Hub.listen("datastore", async (capsule) => {
                        const {
                                payload: { event, data },
                        } = capsule;

                        console.log("DataStore event", event, data);
                        
                        if (!sub) {
                                return;
                        }

                        if (event === "ready") {
                                getDbUser();
                        }
                });
                DataStore.start();

                return () => {
                        removeListener();
                };
                }, [sub]);

        return (
                <AuthContext.Provider value={{ authUser, dbUser, sub, setDBUser }}>
                        {children}
                </AuthContext.Provider>
        );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
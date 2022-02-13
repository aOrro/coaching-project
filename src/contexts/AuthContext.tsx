import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from '../config/firebase';

interface Context {
    currentUser: User | null;
    signup: (email: string, password: string) => void;
}

const AuthContext = createContext<Context>({
    currentUser: null,
    signup: () => {},
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any): JSX.Element => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const signup = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) setCurrentUser(user);
        });

        return unsuscribe;
    }, []);

    const value = {
        currentUser,
        signup,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

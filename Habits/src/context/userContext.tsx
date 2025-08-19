import { createContext, useState, useEffect } from "react";

interface IUser {
    id: string;
    username: string;
    email: string;
}

interface IUserContext {
    user: IUser | null;
    token: string | null;
    loadingUser: boolean;
    login: (user: IUser, token: string) => void;
    logout: () => void;
    setUser: (user: IUser) => void;
}

export const UserContext = createContext<IUserContext>({
    user: null,
    token: null,
    loadingUser: true,
    login: () => { },
    logout: () => { },
    setUser: () => { },
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUserState] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("jwt");

        if (savedUser && savedToken) {
            setUserState(JSON.parse(savedUser));
            setToken(savedToken);
        }
        setLoadingUser(false);
    }, []);

    const login = (newUser: IUser, newToken: string) => {
        setUserState(newUser);
        setToken(newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("jwt", newToken);
    };

    const logout = () => {
        setUserState(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
    };

    const setUser = (updatedUser: IUser) => {
        setUserState(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, token, loadingUser, login, logout, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

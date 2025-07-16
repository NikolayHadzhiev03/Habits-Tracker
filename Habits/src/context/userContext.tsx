import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from "react";
import request from '../utils/request';

interface IUser {
    id: string;
    username: string;
    email: string;
}

interface IUserContext {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => { },
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<IUser | null>(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) return;

        const fetchUser = async () => {
            try {
                const res = await request.get('http://localhost:5000/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.user);
                localStorage.setItem("user", JSON.stringify(res.user));
            } catch (error) {
                console.error("Error loading user:", error);
                setUser(null);
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

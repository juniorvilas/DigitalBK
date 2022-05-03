import { useContext } from 'react';
import { UserContext } from '../context/user'

export function useUser() {
    const context = useContext(UserContext);
    const   { user, setUser, logout, login } = context;
    return { user, setUser, logout, login };
}
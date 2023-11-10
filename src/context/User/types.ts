import { ReactNode } from "react";
import { BloodTypes } from "../../types/BloodTypes";

export interface User {
    id: string;
    fullName: string;
    email: string;
    bloodType: BloodTypes;
    userType: 'doador' | 'necessita',
    bloodCenter: string;
    avatarBase64: string;
    createdAt: Date;
    points?: number;
    lastDonate?: Date;
}

export interface FirebaseUser {
    email: string;
    displayName: string;
}

export interface UserContext {
    user: User | undefined;
    firebaseUser: FirebaseUser | undefined;
    isLoading: boolean;
    setUser: (user: User) => void;
    setFirebaseUser: (user: FirebaseUser) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    createUser: (user: User, password: string) => Promise<void>;
}

export interface UserProvider {
    children: ReactNode
}

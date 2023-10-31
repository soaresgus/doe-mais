import { ReactNode } from "react";
import { BloodTypes } from "../../types/BloodTypes";

export interface User {
    fullName: string;
    email: string;
    bloodType: BloodTypes;
    userType: 'doador' | 'necessita',
    zipCode: string;
    addressStreet: string;
    addressNeighborhood: string;
    addressNumber: string;
    addressCity: string;
    addressState: string;
    avatarBase64: string;
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
    login: (email: string, password: string) => void;
    logout: () => void;
}

export interface UserProvider {
    children: ReactNode
}

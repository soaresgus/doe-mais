import { createContext, useState } from 'react';
import {
  User,
  UserContext as ContextType,
  UserProvider as ProviderType,
  FirebaseUser,
} from './types';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const UserContext = createContext<ContextType>({
  login: () => {},
  user: undefined,
  firebaseUser: undefined,
  isLoading: false,
  setUser: () => {},
  setFirebaseUser: () => {},
  logout: () => {},
});

export function UserProvider({ children }: ProviderType) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Login', 'E-mail inválido');
        }

        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Login', 'E-mail ou senha inválida.');
        }

        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail ou senha inválida.');
        }

        return Alert.alert('Login', 'Não foi possível acessar');
      });
  };

  const logout = () => {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert('Sair', 'Não foi possível sair.');
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        firebaseUser,
        setUser,
        setFirebaseUser,
        login,
        logout,
        isLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
}

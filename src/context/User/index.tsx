import { createContext, useState } from 'react';
import {
  User,
  UserContext as ContextType,
  UserProvider as ProviderType,
  FirebaseUser,
} from './types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export const UserContext = createContext<ContextType>({
  login: () => {},
  user: undefined,
  firebaseUser: undefined,
  isLoading: false,
  setUser: () => {},
  setFirebaseUser: () => {},
  logout: () => {},
  createUser: () => {},
});

export function UserProvider({ children }: ProviderType) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);

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
      })
      .finally(() => {
        setIsLoading(false);
      });

    await firestore()
      .collection('users')
      .doc(email)
      .get()
      .then((doc) => {
        const data = doc.data();

        setUser(data as User);
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

  const createUser = async (userParam: User, password: string) => {
    setIsLoading(true);

    const userId = userParam.email;

    await auth()
      .createUserWithEmailAndPassword(userParam.email, password)
      .catch((error) => {
        console.log(error);

        switch (error.code) {
          case 'auth/email-already-in-use':
            Alert.alert(
              'Erro',
              'Este endereço de e-mail já está em uso. Por favor, escolha outro.'
            );
            break;
          case 'auth/invalid-email':
            Alert.alert('Erro', 'O endereço de e-mail fornecido é inválido.');
            break;
          case 'auth/weak-password':
            Alert.alert(
              'Erro',
              'A senha fornecida é muito fraca. Tente uma senha mais segura.'
            );
            break;
          case 'auth/network-request-failed':
            Alert.alert(
              'Erro',
              'Houve um problema de rede. Por favor, verifique sua conexão à internet.'
            );
            break;
          case 'auth/user-disabled':
            Alert.alert('Erro', 'Sua conta de usuário está desativada.');
            break;
          case 'auth/operation-not-allowed':
            Alert.alert(
              'Erro',
              'A criação de contas de usuário com e-mail e senha não está habilitada.'
            );
            break;
          case 'auth/too-many-requests':
            Alert.alert(
              'Erro',
              'Houve muitas tentativas recentes de criar contas. Tente novamente mais tarde.'
            );
            break;
          default:
            Alert.alert(
              'Erro',
              'Ocorreu um erro ao criar o usuário. Por favor, tente novamente.'
            );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    const user = {
      id: userId,
      fullName: userParam.fullName,
      avatarBase64: userParam.avatarBase64,
      bloodType: userParam.bloodType,
      createdAt: new Date(),
      email: userParam.email,
      userType: userParam.userType,
      bloodCenter: userParam.bloodCenter,
    };

    await firestore()
      .collection('users')
      .doc(userId)
      .set(user as User)
      .then(() => {
        Alert.alert('Cadastro', 'Usuário cadastrado com sucesso!');
      })
      .catch(() => {
        Alert.alert('Cadastro', 'Falha ao registrar usuário na base de dados.');
      })
      .finally(() => {
        setIsLoading(false);
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
        createUser,
        isLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
}

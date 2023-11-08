import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initializeApp } from '@react-native-firebase/app';

// Inicialize o Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAHV5DkNsXbjC_bcYl4341tAnXS5ZPYvr4",
  authDomain: "doe-mais-277a5.firebaseapp.com",
  projectId: "doe-mais-277a5",
  storageBucket: "doe-mais-277a5.appspot.com",
  messagingSenderId: "653998272131",
  appId: "1:653998272131:web:487360f3c64b4b759835b6"
};

initializeApp(firebaseConfig);

AppRegistry.registerComponent(appName, () => App);

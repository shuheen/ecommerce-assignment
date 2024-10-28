import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {firebaseConfig} from '../config/firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export {auth};

import firebase from 'firebase';
import ENV from '../ENVIRONMENT';

const config ={
    apiKey: ENV.FIREBASE_API_KEY,
    authDomain: ENV.FIREBASE_AUTH_DOMAIN,
    databaseURL: ENV.FIREBASE_DATABASE_URL,
    projectId: ENV.FIREBASE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase;

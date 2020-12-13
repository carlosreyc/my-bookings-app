import firebase from "firebase/app";
import { firebaseConfig } from './firebaseAuthConfig'; // File with info needed to connect to firebase; included in .gitignore
import 'firebase/auth';

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
    firebase.auth(app).signInWithRedirect(provider);
};
const app = firebase.initializeApp(firebaseConfig);


export default app;
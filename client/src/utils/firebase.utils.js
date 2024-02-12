import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClaj4xlNO2m2fQGNOr-GQBijH7i6Nkm9E",
    authDomain: "eelux-c03e0.firebaseapp.com",
    projectId: "eelux-c03e0",
    storageBucket: "eelux-c03e0.appspot.com",
    messagingSenderId: "938251752839",
    appId: "1:938251752839:web:c4703b764e9674f4152f22",
    measurementId: "G-R33GJWMTHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

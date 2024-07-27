import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyBvHMl9nPvCXGp-dcyXkVf_GoAHgbF5kT4",
  authDomain: "auth-development-3ac5e.firebaseapp.com",
  projectId: "auth-development-3ac5e",
  storageBucket: "auth-development-3ac5e.appspot.com",
  messagingSenderId: "641217848062",
  appId: "1:641217848062:web:3a773d229d164920abfbaf",
  measurementId: "G-3GKMX97XXH",
})

export const auth = app.auth()
export default app

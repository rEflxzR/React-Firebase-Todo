import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

firebase.initializeApp({
    apiKey: "AIzaSyCqhfqVGf8h1a7QPfQPqTuR1QeDo5DVepQ",
    authDomain: "todo-app-d5e55.firebaseapp.com",
    projectId: "todo-app-d5e55",
    storageBucket: "todo-app-d5e55.appspot.com",
    messagingSenderId: "311866394206",
    appId: "1:311866394206:web:ea3ff1342910a74b15d6cf"
})

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const functions = firebase.functions()

export default firebase
import firebase from "firebase"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAodCeuQVISG_zDbM8i7YG9cOxcLFSWptI",
    authDomain: "devsy-task.firebaseapp.com",
    databaseURL: "https://devsy-task.firebaseio.com",
    projectId: "devsy-task",
    storageBucket: "devsy-task.appspot.com",
    messagingSenderId: "751097618339",
    appId: "1:751097618339:web:03ff5301ca563432d60416",
    measurementId: "G-D4KHNP0PLJ"
    });
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
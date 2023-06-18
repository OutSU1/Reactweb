importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
    apiKey: "AIzaSyAoVQJ7A0KZu-X8YC9vAZGB25_zXYE6Jbk",
    authDomain: "just-superr.firebaseapp.com",
    projectId: "just-superr",
    storageBucket: "just-superr.appspot.com",
    messagingSenderId: "854765247875",
    appId: "1:854765247875:web:8a904ebcb53e2834666ab6"
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})

import { initializeApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
  apiKey: "AIzaSyAoVQJ7A0KZu-X8YC9vAZGB25_zXYE6Jbk",
  authDomain: "just-superr.firebaseapp.com",
  projectId: "just-superr",
  storageBucket: "just-superr.appspot.com",
  messagingSenderId: "854765247875",
  appId: "1:854765247875:web:8a904ebcb53e2834666ab6"
}
const firebaseApp = initializeApp(firebaseConfig)
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey: 'BFcpm3NlpywZUSnp0LRAEfROWwbm8psIVJEh0ScRHxk5I5UC-3l7DSKgYxBVXYxSwmabWv7nJCUcbDBF-nhN9Nk',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {
            console.error(err)
            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )

import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhyCJgp7bMXjl5tSUIYbYMzgMaC3eoNaQ",
  authDomain: "weathersetu.firebaseapp.com",
  projectId: "weathersetu",
  storageBucket: "weathersetu.firebasestorage.app",
  messagingSenderId: "448438257043",
  appId: "1:448438257043:web:6ae006b5dd8610ae6f1466",
  measurementId: "G-77TK97K4M8"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };

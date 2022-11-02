importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyDNuTSKf2HS9V-Po2f1GzAo8oUcfHna6qc",
    authDomain: "ce-notebook.firebaseapp.com",
    projectId: "ce-notebook",
    storageBucket: "ce-notebook.appspot.com",
    messagingSenderId: "355128288497",
    appId: "1:355128288497:web:782e1b11e86f022fd2f550",
    measurementId: "G-6CDD8V0C34"
};

const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging(app);
messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});


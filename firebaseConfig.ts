import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqN2Lm2xM6xeRV6S7AbYDzf5-PejGZ9sU",
  authDomain: "mobile-private-project.firebaseapp.com",
  projectId: "mobile-private-project",
  storageBucket: "mobile-private-project.appspot.com",
  messagingSenderId: "525570378417",
  appId: "1:525570378417:web:6dc517877abd70b47c7090",
};

const app = initializeApp(firebaseConfig);
export default app;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

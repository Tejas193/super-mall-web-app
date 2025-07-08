import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

// ✅ If you plan to use analytics, use this import:
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

// ✅ Your Firebase config
const firebaseConfig = { apiKey: "AIzaSyB_Ze2Fb0k4Ozn0ncE95k9kMeTSLI28RUE",
  authDomain: "super-mall-app-3da42.firebaseapp.com",
  projectId: "super-mall-app-3da42",
  storageBucket: "super-mall-app-3da42.firebasestorage.app",
  messagingSenderId: "73098898742",
  appId: "1:73098898742:web:c727b4e8f5df2e7bf3d797",
  measurementId: "G-4XW0DCMPVB"
};

// ✅ Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

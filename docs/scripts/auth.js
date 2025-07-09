import { app } from '../firebase-config.js';
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth(app);
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("errorMsg");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Logged in:", user.email);
    window.location.href = "https://tejas193.github.io/super-mall-web-app/pages/dashboard.html";
  } catch (error) {
    console.error("Login failed:", error.message);
    errorMsg.textContent = " Invalid email or password";
  }
});

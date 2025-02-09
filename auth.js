// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmIDOyfbskhVn7P2TCR1WwGYjRMnVTP54",
  authDomain: "trainx-36cfe.firebaseapp.com",
  projectId: "trainx-36cfe",
  storageBucket: "trainx-36cfe.firebasestorage.app",
  messagingSenderId: "460236361989",
  appId: "1:460236361989:web:a9208a9a5cfc58a91be76c",
  measurementId: "G-75LWWKV7RG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Select UI elements
let create_acc = document.querySelector("#create_acc");
let have_acc = document.querySelector("#have_acc");
let sign_up = document.querySelector("#signup");
let log_in = document.querySelector("#login");

// Toggle between login and signup forms
create_acc.addEventListener("click", (e) => {
  e.preventDefault();
  sign_up.style.display = "grid";
  log_in.style.display = "none";
});

have_acc.addEventListener("click", () => {
  sign_up.style.display = "none";
  log_in.style.display = "grid";
});

// Sign-up function
const signUp = (e) => {
  e.preventDefault(); 
  const email = document.querySelector("#email_signup").value;
  const password = document.querySelector("#password_signup").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User Registered:", userCredential.user);
      alert("Sign-up successful!");
      window.location.href = "train.html"; // Redirect after sign-up
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
};

// Login function
const login = (e) => {
  e.preventDefault(); 
  const email = document.querySelector("#email_login").value;
  const password = document.querySelector("#password_login").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User Logged In:", userCredential.user);
      alert("Login successful!");
      window.location.href = "train.html"; // Redirect after login
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
};

// Attach event listeners to buttons
document.querySelector("#signup button").addEventListener("click", signUp);
document.querySelector("#login button").addEventListener("click", login);

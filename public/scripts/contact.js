import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7Lmt0x8St99u81N07JNRmpBpRRy5B6kw",
  authDomain: "therapease-fmp.firebaseapp.com",
  databaseURL: "https://therapease-fmp-default-rtdb.firebaseio.com",
  projectId: "therapease-fmp",
  storageBucket: "therapease-fmp.appspot.com",
  messagingSenderId: "940228826579",
  appId: "1:940228826579:web:28f5797c132fbb9a980b26"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

window.getData = function() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var comment = document.getElementById("comment").value;
  
    if (!fname || !lname ||!email ||!comment) {
      alert("Please fill in all fields");
      return;
    }
  
    const contactsRef = ref(db, 'contactData');
  
    push(contactsRef, {
      firstName: fname,
      lastName: lname,    
      email: email,
      comment: comment
    }).then(function() {
      alert("Thank you for your contact. We will respond as soon as possible");
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("comment").value = "";
    }).catch(function(error) {
      console.error("Error adding data: ", error);
    });
  }
// document.getElementById("submitBtn").addEventListener("click", getData);

var mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
  import { getDatabase, push ,ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

  // Import the functions you need from the SDKs you need
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA7Lmt0x8St99u81N07JNRmpBpRRy5B6kw",
    authDomain: "therapease-fmp.firebaseapp.com",
    databaseURL: "https://therapease-fmp-default-rtdb.firebaseio.com",
    projectId: "therapease-fmp",
    storageBucket: "therapease-fmp.appspot.com",
    messagingSenderId: "940228826579",
    appId: "1:940228826579:web:28f5797c132fbb9a980b26"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();
  const auth = getAuth();

var model = {}
var email = document.getElementById("email")
var password = document.getElementById("password")


window.logIn = function(e) {
    e.preventDefault();
    model.email = email.value;
    model.password = password.value;
    console.log(model);

    signInWithEmailAndPassword(auth, model.email, model.password)
        .then(function(res) {
            console.log(res.user.uid, "Success Response");
            model.id = res.user.uid;
            var reference = ref(database, `user/${model.id}`);
            onValue(reference, function(user) {
                console.log(user.val());
            });
                // email.value = "";
                // password.value = "";
                alert("Admin login Successfully");
                window.location.href = "./adminPanel.html";

            })
        .catch(function(err) {
            console.log(err, "Error Response");
            alert(err.message);
        });
};

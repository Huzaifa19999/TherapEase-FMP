// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAKvYfqjPO5TqObA3W9zxq-u3E4L-smLSU",
//   authDomain: "mechanism-experts.firebaseapp.com",
//   databaseURL: "https://mechanism-experts-default-rtdb.firebaseio.com",
//   projectId: "mechanism-experts",
//   storageBucket: "mechanism-experts.appspot.com",
//   messagingSenderId: "513342823559",
//   appId: "1:513342823559:web:452358db74a5008429ac22",
//   measurementId: "G-G15E0PJW22",
// };

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
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();

window.login = function () {
  var adminEmail = document.getElementById("adminEmail");
  var adminPassword = document.getElementById("adminPassword");
  if (adminEmail.value != "" || adminPassword.value != "") {
    var adminObj = {
      adminEmail: adminEmail.value,
      adminPassword: adminPassword.value,
    };
    adminEmail.value = "";
    adminPassword.value = "";
    signInWithEmailAndPassword(
      auth,
      adminObj.adminEmail,
      adminObj.adminPassword
    )
      .then((userCredential) => {
        const user = userCredential.user;
        //   adminObj.id = user.uid;
        //   var reference = ref(db, "admins/" + adminObj.id + "/");
        //   set(reference, adminObj);
        alert("The admin has been logged in successfully");
        window.location.href = "../pages/adminPanel.html";
        // Signed in
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error, errorCode, errorMessage);
      });
  } else {
    alert("Fields cannot be empty");
  }
};

window.getUsersData = function () {
  var dataParentUsers = document.getElementById("dataParent");
  var reference = ref(db, "contactData/");
  onValue(reference, function (dataFromDb) {
    var data = Object.values(dataFromDb.val());
    dataParentUsers.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      dataParentUsers.innerHTML += `
    <tr>
        <td class='text-dark'>
            
            <p class='fs-5'>${data[i].firstName}</p>
            
        </td>
        <td class='text-dark'>
            
            <p class='fs-5'>${data[i].lastName}</p>
            
        </td>
        <td class='text-dark'>
            
            <p class='fs-5'>${data[i].email}</p>
            
        </td>
        <td class='text-dark'>
            
            <p class='fs-5'>${data[i].comment}</p>
            
        </td>
    </tr>
    `;
    }
  });
};
getUsersData();


window.getAppointment = function () {
  var reference = ref(db, "appointments/");
  var dataParent = document.getElementById("main");
  onValue(reference, function (dataFromDb) {
    var appointmentData = Object.values(dataFromDb.val());
    dataParent.innerHTML = "";
    for (var i = 0; i < appointmentData.length; i++) {
      dataParent.innerHTML += `
         <div class='p-5 mb-5 border border-3 border-warning'>
                <h2 class='text-center text-warning'>Appointment Number: <span class="text-success fw-bolder">${
                  i + 1
                }</span></h2>
                <li style="list-style-type: none; style="list-style-type: none; class='my-1 border-bottom border-primary border-opacity-25'>
                <p class='fs-5'>
                    <b class='text-primary'> Full Name: </b> <span class='px-2 text-dark'>${
                      appointmentData[i].fullName
                    }</span>
                </p>
            </li>
            <br>
            <li style="list-style-type: none; style="list-style-type: none; class='my-1 border-bottom border-primary border-opacity-25'>
                <p class='fs-5'>
                <b class='text-primary'> Father's Name: </b> <span class='px-2 text-dark'>${
                  appointmentData[i].fatherName
                }</span>
                </p>
            </li>
            <br>
            <li style="list-style-type: none; style="list-style-type: none; class='my-1 border-bottom border-primary border-opacity-25'>
                <p class='fs-5'>
                <b class='text-primary'> City: </b> <span class='px-2 text-dark'>${
                  appointmentData[i].city
                }</span>
                </p>
            </li>
            <br>
            <li style="list-style-type: none; style="list-style-type: none; class='my-1 border-bottom border-primary border-opacity-25'>
                <p class='fs-5'>
                    <b class='text-primary'> Email: </b><span class='px-2 text-dark'>${
                      appointmentData[i].email
                    }</span>
                </p>
            </li>
            <br>
            <li style="list-style-type: none; style="list-style-type: none; class='my-1 border-bottom border-primary border-opacity-25'>
                <p class='fs-5'>
                    <b class='text-primary'> Phone: </b> <span class='px-2 text-dark'>${
                      appointmentData[i].phone
                    }</span>
                </p>
            </li>
            <br>
            <li style="list-style-type: none; style="list-style-type: none; class='my-1 border-bottom border-primary border-opacity-25'>
                <p class='fs-5'>
                    <b class='text-primary'> Date of Birth: </b> <span class='px-2 text-dark'>${
                      appointmentData[i].dob
                    }</span>
                </p>
            </li>
            <br>
            <li style="list-style-type: none; style="list-style-type: none; class='my-1 border-bottom border-primary border-opacity-25'>
                <p class='fs-5'>
                    <b class='text-primary'> Gender: </b> <span class='px-2 text-dark'>${
                      appointmentData[i].gender
                    }</span>
                </p>
            </li>
            <br>
            <li style="list-style-type: none; style="list-style-type: none; class='my-1 border-bottom border-primary border-opacity-25'>
                <p class='fs-5'>
                    <b class='text-primary'> Address: </b> <span class='px-2 text-dark'>${
                      appointmentData[i].address
                    }</span>
                </p>
            </li>
         </div>
         <br>
         `;
    }
  });
};
getAppointment(); 



window.logout = function () {
  signOut(auth)
    .then(() => {
     alert("Signed out successfully...");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      alert(error);
    });
};

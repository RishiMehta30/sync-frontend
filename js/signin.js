//document.getElementById("user_div").style.display = "none";
document.getElementById("login_div").style.display = "block";

function signup() {

  const userEmail = document.getElementById("email_field").value;
  const userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass)
  .then((user) => {
    const db = firebase.database();
    const usersRef = db.ref(`/users/${user.uid}`);
    usersRef.update({
      availability: {
        monday: [0],
        tuesday: [0],
        wednesday: [0],
        thursday: [0],
        friday: [0],
        saturday: [0],
        sunday: [0]
      }
    })
    .then(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          window.location.href = "index.html"
        }
      })
    })
  })
  .catch(function(error) {
  var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}
function googleauth(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          window.location.href = "index.html"
        }
      })
    })
};
function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
  .then(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location.href = "index.html"
      }
    })
  })
  .catch(function(error) {
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}
function logout(){
  firebase.auth().signOut();
}

function reset() {
  console.log("Function is executing")
  var auth = firebase.auth();
  var emailAddress = document.getElementById("email_field").value;
  
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    alert("Email Sent")
  }).catch(function(error) {
    alert("Email not sent, it's not in our datatbase")
  });
};
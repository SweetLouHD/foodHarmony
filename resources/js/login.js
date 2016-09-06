(function(){
  var queryString = window.location.href; // Get the current URL
  queryString = queryString.split('?')[1]; // Get all characters after the ? in the URL
  $.auth.configure({
    apiUrl: apiEndpointBase
  });
  if(queryString === "logout"){
    logout();
  }
  
  $("input#loginUsername").focus();
})();

function login() {
    $.auth.emailSignIn({
        password: $('#loginPassword')[0].value,
        email: $('#loginUsername')[0].value
    });
}

function logout(){
  $.auth.signOut();
  localStorage.removeItem("usersName");
  localStorage.removeItem("usersId");
  window.location = 'login.html';
}


function register() {
    var formData = {
        name: $('#name')[0].value,
        password: $('#registerPassword')[0].value,
        passwordConfirmation: $('#registerPasswordConfirmation')[0].value,
        email: $('#registerUsername')[0].value
    };
    $.auth.emailSignUp(formData);
}


PubSub.subscribe('auth.validation.success', function(ev, user) {
  localStorage.setItem('usersName', user.name);
  localStorage.setItem('usersId', user.id);
  window.location = 'index.html';
});


PubSub.subscribe('auth.emailRegistration.success', function(ev, msg) {
  alert('Thanks ' + msg.name + '. Check your email to confirm.');
});

















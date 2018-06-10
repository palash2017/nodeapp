console.log('Client-side code running');

const user_name = document.getElementById('user_name');
const user_password = document.getElementById('user_password');
const submit_button = document.getElementById('user_submit');

submit_button.addEventListener('click', function(e) {
  console.log('Submit button was clicked,user name='+user_name.value+' and password='+user_password.value);
  window.location='/api/login/user_name/'+user_name.value+'/user_password/'+user_password.value;
});
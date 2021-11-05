// Login user
async function loginFormHandler() {
    console.log('login')

    const username = document.querySelector('#username-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ name: username, password: password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Login failed. Try again!');
        }
    }
};

// Sign up new user
async function signupFormHandler() {
    console.log('signup')

    const username = document.querySelector('#username-input').value.trim();
    const password = document.querySelector('#password-input').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name: username, password: password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Account creation failed. Try again!');
        }
    }
};

// Allow form to function for either login or sign up
function checkAccount(event) {
  event.preventDefault();
  const currentAccount = event.submitter.value;
  console.log(currentAccount)

  if (currentAccount === "false") {
    signupFormHandler();
  } else {
    loginFormHandler()
  }
}

document
  .querySelector('#account-form')
  .addEventListener('submit', checkAccount);

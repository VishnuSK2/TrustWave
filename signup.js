function signUp() {
  const userData = {
    userName: document.getElementById("signUpUserName").value,
    accountNumber: document.getElementById("signUpAccountNumber").value,
    password: document.getElementById("signUpPassword").value,
  };

  const messageBox = document.getElementById("messageBox");
  const messageBox2 = document.getElementById("messageBox2");

  // Function to clear message after a delay
  const clearMessage = (box, delay = 2000) => {
    setTimeout(() => {
      box.textContent = "";
    }, delay);
  };

  // Check if all fields are filled
  if (userData.userName === "" || userData.accountNumber === "" || userData.password === "") {
    messageBox.textContent = "Please fill in all fields.";
    clearMessage(messageBox);
    return;
  }

  // Check if username already exists
  if (isUserNameInLocalStorage(userData.userName)) {
    messageBox.textContent = "Username already exists.";
    clearMessage(messageBox);
    return;
  }

  // Check if account number already exists
  if (localStorage.getItem(userData.accountNumber)) {
    messageBox.textContent = "Account number already exists.";
    clearMessage(messageBox);
    return;
  }

  // Save user data to localStorage
  localStorage.setItem(userData.accountNumber, JSON.stringify(userData));
  messageBox2.textContent = "Successfully Registered! Redirecting...";
  clearMessage(messageBox2); // Optional to clear the success message

  // Redirect after a delay
  setTimeout(() => {
    window.location.href = "./signin.html";
  }, 1000);
}

function isUserNameInLocalStorage(userName) {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let storedUserData = JSON.parse(localStorage.getItem(key));
    if (storedUserData && storedUserData.userName === userName) {
      return true;
    }
  }
  return false;
}

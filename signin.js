function login() {
  const loginData = {
    accNo: document.getElementById("loginAccountNumber").value,
    password: document.getElementById("loginpassword").value,
  };

  const messageBox = document.getElementById("messageBox");
  const messageBox2 = document.getElementById("messageBox2");

  // Function to clear message box after 2 seconds
  const clearMessage = (box, delay = 2000) => {
    setTimeout(() => {
      box.textContent = "";
    }, delay);
  };

  if (loginData.accNo === "" || loginData.password === "") {
    messageBox.textContent = "Please fill in all fields.";
    clearMessage(messageBox);
    return;
  }

  const key = loginData.accNo;
  const receivedData = JSON.parse(localStorage.getItem(key));

  if (!receivedData) {
    messageBox.textContent = "Invalid account number.";
    clearMessage(messageBox);
    return;
  }

  if (loginData.password !== receivedData.password) {
    messageBox.textContent = "Password incorrect.";
    clearMessage(messageBox);
    return;
  }

  // Save login data in localStorage
  localStorage.setItem("loginAccountNo", loginData.accNo);
  messageBox2.textContent = "Login successful! Redirecting...";
  clearMessage(messageBox2); // Optionally clear this message as well

  setTimeout(() => {
    window.location.href = "./main.html"; // Redirect after 1 second
  }, 1000);
}

let loginAcno =JSON.parse(localStorage.getItem("loginAccountNo"));
let loginUserData =JSON.parse(localStorage.getItem(loginAcno))
welcome.textContent =`Welcome ${loginUserData.userName}`

function deposit() {
    const accountNumberDeposit = document.getElementById("depostAccountNumber").value;
    const amountDeposit = parseFloat(document.getElementById("depositAmount").value);
  
    // Validate the deposit amount
    if (isNaN(amountDeposit) || amountDeposit <= 0) {
      alert('Please enter a valid amount');
      return;
    }
  
    // Check if the account exists in localStorage
    if (accountNumberDeposit in localStorage) {
      // Retrieve user data from localStorage
      const userDeposit = JSON.parse(localStorage.getItem(accountNumberDeposit));
      // Update balance
      userDeposit.balance = (userDeposit.balance || 0) + amountDeposit;
      // Record the transaction
      const transactionDeposit = {
        type: "Deposit",
        amount: amountDeposit,
        date: new Date().toLocaleString()
      };
  
      // Initialize or update the transaction history
      userDeposit.transactions = userDeposit.transactions || [];
      userDeposit.transactions.push(transactionDeposit);

      // Save the updated user data back to localStorage
      localStorage.setItem(accountNumberDeposit, JSON.stringify(userDeposit));

      // Update the UI to show the new balance and deposit amount
      document.getElementById("totalDeposit").innerText = `₹ ${amountDeposit}`;
      document.getElementById("balance").innerText = `₹ ${userDeposit.balance}`;

      // Clear the input fields after the deposit is done
      document.getElementById("depostAccountNumber").value = "";
      document.getElementById("depositAmount").value = "";
      alert("Deposit successful!");

    } else {
      // Handle case where account is not found
      alert("Account number not found.");
    }
  }

  function withdraw() {
    const accountNumberWithdraw = document.getElementById("withdrowAccountNumber").value;
    const amountWithdraw = parseFloat(document.getElementById("withdrowAmount").value);
  
    // Validate the withdrawal amount
    if (isNaN(amountWithdraw) || amountWithdraw <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    // Check if the account exists in localStorage
    if (accountNumberWithdraw in localStorage) {
      // Retrieve user data from localStorage
      const userWithdraw = JSON.parse(localStorage.getItem(accountNumberWithdraw));
      // Check if there is enough balance for the withdrawal
      if (userWithdraw.balance >= amountWithdraw) {
        // Update balance
        userWithdraw.balance -= amountWithdraw;
        // Record the transaction
        const transactionWithdraw = {
          type: "Withdrawal",
          amount: amountWithdraw,
          date: new Date().toLocaleString()
        };
        // Initialize or update the transaction history
        userWithdraw.transactions = userWithdraw.transactions || [];
        userWithdraw.transactions.push(transactionWithdraw);

        // Save the updated user data back to localStorage
        localStorage.setItem(accountNumberWithdraw, JSON.stringify(userWithdraw));

        // Update the UI to show the new balance and withdrawal amount
        document.getElementById("totalWithdraw").innerText = `₹ ${amountWithdraw}`;
        document.getElementById("balance").innerText = `₹ ${userWithdraw.balance}`;

        // Clear the input fields after the withdrawal is done
        document.getElementById("withdrowAccountNumber").value = "";
        document.getElementById("withdrowAmount").value = "";
        
        // Show an alert after the transaction is successfully done
        alert(`Withdrawal is successful!`);
      } else {
        // Handle case where the balance is insufficient
        alert("Insufficient balance for this withdrawal.");
      }
    } else {
      // Handle case where account is not found
      alert("Account number not found.");
    }
  }
  
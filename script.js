function getUserEntries() {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
}

function displayEntries() {
  const entries = getUserEntries();
  const tableEntries = entries.map(entry => {
    const row = `<tr>
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    </tr>`;
    return row;
  }).join("\n");

  document.getElementById("userEntries").innerHTML = tableEntries;
}

function saveUserForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  if (!validateAge(dob)) {
    alert("Age must be between 18 and 55");
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };

  let entries = getUserEntries();
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));

  displayEntries();
}

function validateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
}

document.getElementById("registrationForm").addEventListener("submit", saveUserForm);

window.addEventListener("load", displayEntries);

    // Get a reference to the form element
    const userForm = document.querySelector('#userForm');

    // Get the user's UID from Google authentication
    const uid = 'f2021XXXX'; // Replace with the actual UID

    // Populate the UID in the form fields by default
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    nameInput.value = uid;
    emailInput.value = `${uid}@bits-pilani.ac.in`;

    // Save the form data to local storage
    function saveFormData(event) {
      event.preventDefault(); // Prevent the form from being submitted

      // Get the values from the input fields
      const name = nameInput.value;
      const email = emailInput.value;

      // Create an object with the form data
      const formData = {
        name: name,
        email: email
      };

      // Convert the object to JSON
      const jsonData = JSON.stringify(formData);

      // Save the JSON data to local storage
      localStorage.setItem('formData', jsonData);

      // Add any additional logic you need here

      alert('Form data saved successfully!');
    }

    // Add an event listener to the form submission
    userForm.addEventListener('submit', saveFormData);
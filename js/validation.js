
document.addEventListener('DOMContentLoaded', function () {
//  Declaring constant variable from a contactForm
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
    // Stopping default form submission, need to validate first
      e.preventDefault();

      // Get form values by ID
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const query = document.getElementById('query').value;

      // Reset errors using loop
      document.querySelectorAll('.error').forEach((el) => {
        el.style.display = 'none';
      });
    //   Declaring boolean variable for checking errors
      let hasErrors = false;

      // Check if fields are empty
      if (name === '') {
        // Calling showError function to display message and sending parameters
        showError('nameError', 'Please enter your name');
        hasErrors = true;
        // using regex to validate only letters
      } else if (!/^[A-Za-z\s]+$/.test(name)) {
        showError('nameError', 'Name can only contain letters and spaces');
        hasErrors = true;
      }

      if (phone === '') {
        showError('phoneError', 'Please enter your phone number');
        hasErrors = true;
      } else {
        // Getting only numbers 
        const cleanPhone = phone.replace(/\D/g, '');
        // Checking length of the combined numbers 
        if (cleanPhone.length < 9 || cleanPhone.length > 10) {
          showError('phoneError', 'Phone must be 9-10 digits');
          hasErrors = true;
        }
      }

      if (email === '') {
        showError('emailError', 'Please enter your email');
        hasErrors = true;
      } 
    //   Checking email @ symbol and dot 
      else if (!email.includes('@') || !email.includes('.')) {
        showError('emailError', 'Please enter a valid email');
        hasErrors = true;
      }

    //   Checking the main message textarea 
      if (query === '') {
        showError('queryError', 'Please enter your message');
        hasErrors = true;
      }

      // If no errors, show success
      if (!hasErrors) {
        alert('Thank you for your message! We will contact you soon.');
        // After submit the form clear all fields using reset() function
        contactForm.reset();
      }
    });
  }

//   Declaring function with 2 parameters to show validation error
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    // Puts the error text inside the element
    errorElement.textContent = message;
    // Changes CSS display from invisible to visible
    errorElement.style.display = 'block';
  }
});

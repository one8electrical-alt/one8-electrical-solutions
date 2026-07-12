/* 
========================================================================
   ONE8 ELECTRICAL SOLUTIONS - Client Form Validations & Simulation
========================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const contactForm = document.getElementById('contact-form');
  const quoteForm = document.getElementById('quote-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-success-modal');

  // Regex validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Standard Indian mobile phone format (10 digits starting with 6-9)

  // 1. Setup Helper functions
  function validateField(input, validationFn, errorMsg) {
    const parent = input.parentElement;
    let feedback = parent.querySelector('.form-feedback');
    
    // Create feedback element if not present
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'form-feedback';
      parent.appendChild(feedback);
    }

    const isValid = validationFn(input.value.trim());

    if (!isValid) {
      input.classList.add('invalid');
      input.classList.remove('valid');
      feedback.textContent = errorMsg;
      feedback.className = 'form-feedback invalid';
      feedback.style.display = 'block';
      return false;
    } else {
      input.classList.remove('invalid');
      input.classList.add('valid');
      feedback.textContent = '';
      feedback.className = 'form-feedback valid';
      feedback.style.display = 'none';
      return true;
    }
  }

  // 2. Add real-time input event listeners
  function setupLiveValidation(form) {
    if (!form) return;
    
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        runInputValidation(input);
      });
      
      input.addEventListener('blur', () => {
        runInputValidation(input);
      });
    });
  }

  function runInputValidation(input) {
    const type = input.getAttribute('name');
    const isRequired = input.hasAttribute('required');
    const lang = localStorage.getItem('language') || 'en';
    
    // Fetch translation strings or fallback to standard English values
    const dict = window.translations ? window.translations[lang] : null;
    const msgRequired = dict ? dict.val_required : 'This field is required.';
    const msgEmail = dict ? dict.val_email : 'Please enter a valid email address (e.g. name@domain.com).';
    const msgPhone = dict ? dict.val_phone : 'Please enter a valid 10-digit mobile number.';

    if (isRequired && input.value.trim() === '') {
      return validateField(input, val => val !== '', msgRequired);
    }

    if (input.value.trim() !== '') {
      if (type === 'email') {
        return validateField(input, val => emailRegex.test(val), msgEmail);
      }
      if (type === 'phone') {
        return validateField(input, val => phoneRegex.test(val) || val.length >= 10, msgPhone);
      }
    }
    
    // Clear feedback if not required and empty
    if (!isRequired && input.value.trim() === '') {
      const feedback = input.parentElement.querySelector('.form-feedback');
      if (feedback) feedback.style.display = 'none';
      input.classList.remove('invalid', 'valid');
      return true;
    }

    return validateField(input, () => true, '');
  }

  // Bind forms
  setupLiveValidation(contactForm);
  setupLiveValidation(quoteForm);

  // 3. Form Submissions
  function handleFormSubmit(form, formType) {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('.form-control');
      let isFormValid = true;

      inputs.forEach(input => {
        const isInputValid = runInputValidation(input);
        if (!isInputValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // Collect form data
        const formData = {};
        inputs.forEach(input => {
          formData[input.getAttribute('name')] = input.value.trim();
        });
        formData['timestamp'] = new Date().toISOString();
        formData['formType'] = formType;

        // Save locally to simulate submission record
        const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('formSubmissions', JSON.stringify(submissions));

        console.log(`[Form Submitted Successfully: ${formType}]`, formData);

        // Reset the form values and styles
        form.reset();
        inputs.forEach(input => {
          input.classList.remove('valid', 'invalid');
          const feedback = input.parentElement.querySelector('.form-feedback');
          if (feedback) feedback.style.display = 'none';
        });

        // Show success confirmation modal
        if (successModal) {
          successModal.classList.add('show');
        }
      } else {
        // Focus first invalid element
        const firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }

  handleFormSubmit(contactForm, 'contact');
  handleFormSubmit(quoteForm, 'quote');

  // Close confirmation modal
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('show');
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('show');
      }
    });
  }
});

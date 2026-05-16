/**
* PHP Email Form Validation - v3.11 (patched for Web3Forms)
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');

      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);
      php_email_form_submit(thisForm, action, formData);
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');

      // Handle JSON response (Web3Forms)
      try {
        const json = JSON.parse(data);
        if (json.success) {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          throw new Error(json.message || 'Gửi thất bại, vui lòng thử lại.');
        }
        return;
      } catch (parseErr) {
        if (parseErr instanceof SyntaxError) {
          // Not JSON — check plain-text OK (legacy PHP backend)
          if (data.trim() === 'OK') {
            thisForm.querySelector('.sent-message').classList.add('d-block');
            thisForm.reset();
          } else {
            throw new Error(data || 'Form submission failed.');
          }
        } else {
          throw parseErr;
        }
      }
    })
    .catch(error => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();

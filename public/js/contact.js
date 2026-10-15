
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = 'Please complete all fields.';
        return;
    }

    formStatus.textContent =
        'Form validated successfully! This is a demo, so your message was not sent.';

    contactForm.reset();
});

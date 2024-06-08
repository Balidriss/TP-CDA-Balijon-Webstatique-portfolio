

class Validator {
    constructor(type, conditions) {
        this.type = type;
        this.conditions = conditions;
    }
    validate(value) {
        switch (this.type) {
            case 'email':
                return this.validateEmail(value);
            case 'text':
                return this.validateText(value);
            default:
                return false;
        }
    }

    validateEmail(value) {
        if (this.isValidEmail(value)) {
            return 'Le format de votre mail est incorrect exemple : votre@email.fr';
        }
        return this.validateText(value);
    }
    validateText(value) {
        const min = this.conditions.min || 1;
        const max = this.conditions.max || 254;
        if (value.length < min) {
            return `Doit avoir ${min} caractères minimume.`;
        }
        if (value.length > max) {
            return `Doit avoir ${max} caractères maximume.`;
        }
        return '';
    }
    isValidEmail(email) {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !email.match(emailRegex)
    }
}

class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = this.form.querySelectorAll('input, textarea');
        this.errors = this.form.querySelectorAll('.error');
        this.validators = this.setupValidators();
        this.setupSubmit();
    }

    setupValidators() {
        return {
            email: new Validator('email', { max: 254 }),
            subject: new Validator('text', { min: 1, max: 254 }),
            message: new Validator('text', { min: 1, max: 5000 })
        };
    }
    setupSubmit() {
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }
    handleSubmit(e) {
        e.preventDefault();
        let isValid = true;

        this.fields.forEach((field) => {

            const fieldName = field.getAttribute('name');
            const validator = this.validators[fieldName];
            const errorElement = this.form.querySelector(`#${fieldName}-error`);

            if (validator) {
                const errorMessage = validator.validate(field.value);
                if (errorMessage) {
                    textOnElement(errorElement, errorMessage);
                    isValid = false;

                } else {
                    textOnElement(errorElement, '');
                }
            }
        });

        if (isValid) {
            const formData = this.getContact();
            const jsonString = JSON.stringify(formData);
            console.log(jsonString);
        }
    }


    getContact() {
        const data = {};
        this.fields.forEach((field) => {
            data[field.name] = field.value;
        });
        return data;
    }

}



document.addEventListener('DOMContentLoaded', () => {
    new FormHandler('contact-form');
});
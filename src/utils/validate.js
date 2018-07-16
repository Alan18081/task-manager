import isEmail from 'isemail';

const testMask = /\d{2}\.\d{2}\.\d{4}/;

export const validateProfile = ({name,email,birth}) => {
    const errors = {};

    if(!name) {
        errors.name = 'Please provide your name';
    }

    if(!email) {
        errors.email = 'Please, provide your email';
    }
    else if(!isEmail.validate(email)) {
        errors.email = 'Please, write your email properly'
    }

    if(!birth) {
        errors.birth = 'Please, provide your date of birth';
    }
    else if(!testMask.test(birth)) {
        errors.birth = 'Please, write your date of birth properly';
    }

    return errors;
};
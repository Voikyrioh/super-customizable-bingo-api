import { registrationSchema } from "../../domain/entities/authentication";

export const registrationValidation = registrationSchema
    .refine(val => val.password.length >= 8, {message: 'Password must be at least 8 characters long'})
    .refine(val => val.password.replace(/\p{Ll}/u, '').length > 1, {message: 'Password must have at least 2 lower case letter'}) // at least two lowercase letters
    .refine(val => val.password.replace(/\p{Lu}/u, '').length > 1, {message: 'Password must have at least 2 upper case letter'}) // at least two uppercase letters
    .refine(val => val.password.replace(/\d/, '').length > 1, {message: 'Password must have at least 2 numbers'}) // at least two number
    .refine(val => val.password.replace(/[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/, '').length > 1, {message: 'Password must have at least 2 special characters'}) // at least two special char
    .refine((value) => value.password.length <= 100, {message: 'Password is too long'})
    .refine((value) => value.password === value.confirmPassword, {message: 'Passwords do not match'})
    .refine((value) => !value.username || value.username.length <= 20, {message: 'Username is too long'})
    .refine((value) => !value.email || value.email.length <= 50, {message: 'Email is too long'})




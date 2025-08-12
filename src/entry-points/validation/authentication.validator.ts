import { registrationSchema } from "../../domain/entities/authentication";

export const registrationValidation = registrationSchema
    .refine(val => val.password.length >= 8, {message: 'Password must be at least 8 characters long'})
    .refine(val => val.password.replace(/[^\p{Ll}]/ug, '').length > 1, {path: ['password'], message: 'Password must have at least 2 lower case letter'}) // at least two lowercase letters
    .refine(val => val.password.replace(/[^\p{Lu}]/ug, '').length > 1, {path: ['password'], message: 'Password must have at least 2 upper case letter'}) // at least two uppercase letters
    .refine(val => val.password.replace(/\D/g, '').length > 1, {path: ['password'], message: 'Password must have at least 2 numbers'}) // at least two number
    .refine(val => val.password.replace(/[^ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/g, '').length > 1, {path: ['password'], message: 'Password must have at least 2 special characters'}) // at least two special char
    .refine((value) => value.password.length <= 100, {path: ['password'], message: 'Password is too long'})
    .refine((value) => value.password === value.confirmPassword, {path: ['confirmPassword'], message: 'Passwords do not match'})
    .refine((value) => !value.username || value.username.length <= 20, {path: ['username'], message: 'Username is too long'})
    .refine((value) => !value.email || value.email.length <= 50, {path: ['email'], message: 'Email is too long'})




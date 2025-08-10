import { z } from 'zod/v4'

const validPassword = z.string()
    .refine((val) => val.length >= 8, {message: 'Password must be at least 8 characters long'})
    .refine(val => val.replace(/\p{Ll}/u, '').length > 1, {message: 'Password must have at least 2 lower case letter'}) // at least two lowercase letters
    .refine(val => val.replace(/\p{Lu}/u, '').length > 1, {message: 'Password must have at least 2 upper case letter'}) // at least two uppercase letters
    .refine(val => val.replace(/\d/, '').length > 1, {message: 'Password must have at least 2 numbers'}) // at least two number
    .refine(val => val.replace(/[ !"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/, '').length > 1, {message: 'Password must have at least 2 special characters'}) // at least two special char

export const data = { validPassword }

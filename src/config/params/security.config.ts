import { z } from 'zod/v4'

export type SecurityConfigType = {
    PasswordPepper: string,
}

export default {
    PasswordPepper: {
        name: 'PASSWORDS_ENCRYPTION_PEPPER',
        description: 'Pepper to use for password encryption',
        default: {
            _: 'pepper-spray',
        },
        validator: z.string(),
    },
}

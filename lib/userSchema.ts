import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().min(4).nonempty({ message: 'Username is required' }),
    password: z.string().min(6)
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .nonempty({ message: 'Password is required' }),
    confirmPassword: z.string().min(6)
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',    
    path: ['confirmPassword']
})

export type RegisterFormData = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    username: z.string().nonempty({ message: 'Username is required' }),
    password: z.string().nonempty({ message: 'Password is required' })
})

export type LoginFormData = z.infer<typeof loginSchema>
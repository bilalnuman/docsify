import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const passwordPolicy = z
    .string("Password is required")
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

export const loginSchema = z.object({
    email: z
        .string("Email is required")
        .email('Invalid email address')
        .nonempty('Email is required'),
    password: z
        .string("Password is requred")
        .min(8, 'Password must be at least 8 characters')
        .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

export type LoginFormValue = z.infer<typeof loginSchema>;


export const registerSchema = z
    .object({
        name: z
            .string("Name is required")
            .min(3, 'Name must be at least 2 characters long')
            .max(50, 'Name must be less than 50 characters long'),
        email: z
            .string("Email is required")
            .email('Invalid email address')
            .nonempty('Email is required'),
        password: z
            .string('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
        confirmPassword: z
            .string('Confirm password is required')
            .min(8, 'Confirm Password must be at least 8 characters')
            .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    })
    .superRefine(({ password, confirmPassword }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: 'Passwords do not match',
                code: z.ZodIssueCode.custom,
            });
        }
    });



export type RegisterFormValue = z.infer<typeof registerSchema>;


export const forgotSchema = z.object({
    email: z
        .string("Email is required")
        .email('Invalid email address')
        .nonempty('Email is required'),
});

export type ForgotFormValue = z.infer<typeof forgotSchema>;

export const resetSchema = z.object({
    newPassword: passwordPolicy,
    confirmPassword: z
        .string("Confirm password is required")
        .trim(),
}).superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
        });
    }
});;

export type ResetFormValue = z.infer<typeof resetSchema>;

export const otpSchema = z.object({
    otp: z
        .array(z.string().regex(/^\d$/, 'Each digit must be a number'))
        .length(6, 'OTP must be 6 digits long'),
});

export type OtpFormValue = z.infer<typeof otpSchema>;









/** Password policy:
 *  1. Minimum 8 characters
 *  2. At least one uppercase letter
 *  3. At least one special character
 */


/* Example: Change Password Schema */

export const changePasswordSchema = z.object({
    oldPassword: z
        .string("Old password is required")
        .trim()
        .min(1, "Old password is required"),
    newPassword: passwordPolicy,
    confirmPassword: z
        .string("Confirm password is required")
        .trim(),
}).superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
        });
    }
});

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;


export const newSafetyModalFormSchema = z
    .object({
        title: z.string("Topic name is required")
            .nonempty("Topic name is required"),
        project_name: z.string("Project name is required").nonempty("Topic name is required"),
        address: z
            .string("Address is required").nonempty("Address is required"),
        date: z.string("Date is required").nonempty("Date is required")
    })

export type NewSafetyModalFormValues = z.infer<typeof newSafetyModalFormSchema>;



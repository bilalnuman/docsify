<<<<<<< HEAD
import { boolean, z } from 'zod';

export const passwordPolicy = z
=======
import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

const passwordPolicy = z
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
    .string("Password is required")
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

<<<<<<< HEAD
export const email = z
    .string("Email is required")
    .email('Invalid email address')
    .nonempty('Email is required');


export const nameSchema = (fieldName: string, maxLength: number = 50,minLength=1) =>
    z
        .string()
        .min(minLength, `${fieldName} is required`)
        .max(maxLength, `${fieldName} must be at most ${maxLength} characters`)
        .refine((v) => v === v.trim(), {
            message: `${fieldName} cannot start or end with spaces`,
        })
        .regex(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, {
            message: `${fieldName} must contain only alphabets and spaces between words`,
        });

export const loginSchema = z.object({
    email: email,
    password: passwordPolicy,
    rememberMe: boolean("Remember me is required").optional()
});

=======
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
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1


export const registerSchema = z
    .object({
<<<<<<< HEAD
        name: nameSchema("Name"),
=======
        name: z
            .string("Name is required")
            .min(3, 'Name must be at least 2 characters long')
            .max(50, 'Name must be less than 50 characters long'),
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        email: z
            .string("Email is required")
            .email('Invalid email address')
            .nonempty('Email is required'),
<<<<<<< HEAD
        password: passwordPolicy,
        confirmPassword: passwordPolicy,
        terms: boolean("You must accept the Terms and Conditions")
=======
        password: z
            .string('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
        confirmPassword: z
            .string('Confirm password is required')
            .min(8, 'Confirm Password must be at least 8 characters')
            .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
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

<<<<<<< HEAD
=======


export type RegisterFormValue = z.infer<typeof registerSchema>;


>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
export const forgotSchema = z.object({
    email: z
        .string("Email is required")
        .email('Invalid email address')
        .nonempty('Email is required'),
});

<<<<<<< HEAD
=======
export type ForgotFormValue = z.infer<typeof forgotSchema>;

>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
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

<<<<<<< HEAD
export const adminSchema = z.object({
    name: nameSchema("Name"),
    company: z.string()
        .min(1, { message: "Company name is required" })
        .regex(/^[A-Za-z]+$/, {
            message: "Only alphabets allowed (no spaces, no emojis, no numbers)",
        })
});



=======
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

>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
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

<<<<<<< HEAD
export const newSafetyModalFormSchema = z
    .object({
        title: nameSchema("Title"),
=======
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;


export const newSafetyModalFormSchema = z
    .object({
        title: z.string("Topic name is required")
            .nonempty("Topic name is required"),
>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1
        project_name: z.string("Project name is required").nonempty("Topic name is required"),
        address: z
            .string("Address is required").nonempty("Address is required"),
        date: z.string("Date is required").nonempty("Date is required")
    })

export type NewSafetyModalFormValues = z.infer<typeof newSafetyModalFormSchema>;
<<<<<<< HEAD
export type AdminFormValue = z.infer<typeof adminSchema>;
export type LoginFormValue = z.infer<typeof loginSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
export type ResetFormValue = z.infer<typeof resetSchema>;
export type ForgotFormValue = z.infer<typeof forgotSchema>;
export type RegisterFormValue = z.infer<typeof registerSchema>;
=======

>>>>>>> 66ef85ec540ae67b37954eb6a1fc1bb56427b7c1


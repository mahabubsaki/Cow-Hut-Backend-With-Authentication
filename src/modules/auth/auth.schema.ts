import { z } from "zod";

export const AuthLoginSchema = z.object({
    phoneNumber: z.string(),
    password: z.string(),
});
export const AuthTokenRequestSchema = z.object({
    refreshToken: z.string({
        required_error: 'Refresh token is required'
    })
});

export const ChangePasswordSchema = z.object({
    oldPassword: z.string({
        required_error: 'Old password required'
    }),
    newPassword: z.string({
        required_error: 'New password required'
    }),
});
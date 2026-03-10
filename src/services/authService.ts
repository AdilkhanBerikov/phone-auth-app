import { RecaptchaVerifier, signInWithPhoneNumber, signOut} from 'firebase/auth';
import type {ConfirmationResult} from 'firebase/auth';
import {auth} from '../firebase/firebase';

export const setupRecaptcha = () => {
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: (response: any) => {
            console.log("reCAPTCHA решена:", response);
        },
        'expired-callback': () => {
            console.log("reCAPTCHA истекла, попробуйте снова.");
        }
    });

    verifier.render().catch(console.error);
    return verifier;
};

export const sendPhoneCode = async (phone: string): Promise<ConfirmationResult> => {
    const recaptcha = setupRecaptcha();

    try {
        return await signInWithPhoneNumber(
            auth,
            phone,
            recaptcha
        );
    } catch (error: any) {
        recaptcha.render().then((widgetId) => {
            grecaptcha.reset(widgetId);
        });
        throw error;
    }
}

export const verifyCode = async (
    confirmationResult: ConfirmationResult,
    code: string
) => {
    return confirmationResult.confirm(code);
};

export const logout = async () => {
    await signOut(auth);
};
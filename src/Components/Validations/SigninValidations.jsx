import * as Yup from 'yup'
import { emailRequired, passwordRequired, validEmailEntry, validPassword } from '../../Config'

export const signinValidation = Yup.object({
    email : Yup.string().email(validEmailEntry).required(emailRequired),
    password : Yup.string().min(8,validPassword).required(passwordRequired),
    termsAndCondition : Yup.string().oneOf(["true"],"Please Accept terms & conditions")

})
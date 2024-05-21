import * as Yup from 'yup'
import { emailRequired, passwordRequired, validEmailEntry, validPassword, validateTerms } from '../../Config'

export const signinValidation = Yup.object({
    email : Yup.string().email(validEmailEntry).required(emailRequired),
    password : Yup.string().min(8,validPassword).required(passwordRequired),
    termsAndCondition : Yup.string().oneOf(["true"],validateTerms)

})
import * as Yup from 'yup'
import { emailRequired, passwordRequired, validEmailEntry, validPassword, validateTerms } from '../../Config'

export const signinValidation = Yup.object({
    username : Yup.string().min(6,validEmailEntry).required(emailRequired),
    password : Yup.string().min(7,validPassword).required(passwordRequired),
    termsAndCondition : Yup.string().oneOf(["true"],validateTerms)

})
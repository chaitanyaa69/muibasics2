import * as Yup from 'yup'
import { confirmPasswrodRequired, emailRequired, passwordRequired, validConfirmPassword, validEmailEntry, validPassword } from '../../Config'

export const registerValidation = Yup.object({
    email : Yup.string().email(validEmailEntry).required(emailRequired),
    password : Yup.string().min(8,validPassword).required(passwordRequired),
    confirmpassword: Yup.string().oneOf([Yup.ref("password")],validConfirmPassword).required(confirmPasswrodRequired)

})
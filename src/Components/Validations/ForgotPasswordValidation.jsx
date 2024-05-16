import * as Yup from 'yup'
import { emailRequired, validEmailEntry } from '../../Config'


export const forgotPasswordValidation = Yup.object({
    email : Yup.string().email(validEmailEntry).required(emailRequired)

})
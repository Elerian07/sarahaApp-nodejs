import joi from 'joi';

export const deleteSchema = {
    authorization: joi.object().required().keys({
        id: joi.object().required(),
    })
}


export const getUserSchema = {
    params: joi.object().keys({
        id: joi.string().required()
    })
}
export const forgetPasswordSchema = {
    body: joi.object().required().keys({

        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        newPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        newCPassword: joi.string().valid(joi.ref("newPassword")).required(),
        OTP: joi.string().required()
    })
}
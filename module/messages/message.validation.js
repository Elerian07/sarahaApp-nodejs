import joi from 'joi';


export const createSchema = {
    body: joi.object().required().keys({
        content: joi.string().required()
    })
}


export const updateSchema = {
    body: joi.object().required().keys({
        content: joi.string().required()
    }),

    params: joi.object().required().keys({
        id: joi.string().required()
    })
}

export const deleteSchema = {
    params: joi.object().required().keys({
        id: joi.string().required()
    })
}


export const messageIdSchema = {
    params: joi.object().required().keys({
        id: joi.string().required()
    })
}

export const searchSchema = {
    query: joi.object().required().keys({
        search: joi.string().required()
    })
}

export const userMessagesSchema = {
    params: joi.object().required().keys({
        id: joi.string().required()
    })
}
import Joi from 'joi'

export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(30).alphanum().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{4,8}$/).required()

})

export const postSchemaPost = Joi.object({
    postBody: Joi.string().min(2).max(150).required(),
    postTitle: Joi.string().min(2).max(50).required()
})

export const postSchemaPut = Joi.object({
    postBody: Joi.string().min(2).max(150),
    postTitle: Joi.string().min(2).max(50)
}).xor('postBody', 'postTitle').required()



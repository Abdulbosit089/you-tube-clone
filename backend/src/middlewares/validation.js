import { loginSchema, registerSchema, postSchemaPost, postSchemaPut } from "../utils/validations.js"
import { ValidationError } from "../utils/errors.js"

export default (req, res, next) => {
    try {

        if (req.method === 'POST' && req.url == '/login') {
            const { error } = loginSchema.validate(req.body)
            if(error) throw error
        }

        if (req.method === 'POST' && req.url == '/register') {
            console.log(req.body)
            
            
        }

        if (req.method === 'POST' && req.url == '/posts') {
            const { error } = postSchemaPost.validate(req.body)
            if(error) throw error
        }

        if (req.method === 'PUT' && req.url == '/posts') {
            const { error } = postSchemaPut.validate(req.body)
            if(error) throw error
        }

        return next()
    } catch (error) {
        return next(new ValidationError(400, error.message))
    }
}
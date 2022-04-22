import JWT from 'jsonwebtoken'

export default {
    sign: payload => JWT.sign(payload,"ALPHA"),
    verify: token => JWT.verify(token,"ALPHA"),
}
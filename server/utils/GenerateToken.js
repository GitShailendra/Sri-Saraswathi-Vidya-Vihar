const jsonwebtoken = require('jsonwebtoken');
const generateToken = (user) => {
    const token = jsonwebtoken.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
    return token;
};

module.exports = generateToken;
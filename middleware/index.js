import jwt from 'jsonwebtoken';

export const jwtValidate = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized if no Authorization header is present
    }

    const token = authHeader.replace("Bearer ", "");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        // You can optionally add the decoded information to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    });
}

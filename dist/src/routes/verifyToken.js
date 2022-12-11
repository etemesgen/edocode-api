"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAuthorization = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err)
                res.status(403).json("Token is not valid !");
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json("You are not authenticated");
    }
};
exports.verifyToken = verifyToken;
const verifyTokenAndAuthorization = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        // if(req.user.id === req.params.id){
        next();
        // } else {
        //   res.status(403).json("You are not allowed to do that !");
        // }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
//# sourceMappingURL=verifyToken.js.map
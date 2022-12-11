"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./src/routes/user"));
const auth_1 = __importDefault(require("./src/routes/auth"));
const project_1 = __importDefault(require("./src/routes/project"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to database !"))
    .catch((err) => {
    console.log(err);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.status(200).json({ 'message': 'edocode API running' });
});
app.use("/edocode-api/auth", auth_1.default);
app.use("/edocode-api/users", user_1.default);
app.use("/edocode-api/projects", project_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
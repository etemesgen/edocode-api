"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    technologies: { type: Array },
    desc: { type: String, required: true },
    onlinelink: { type: String },
    githublink: { type: String },
    img: { type: String, required: true },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Project", ProjectSchema);
//# sourceMappingURL=projectModel.js.map
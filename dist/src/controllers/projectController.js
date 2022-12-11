"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = exports.getProject = exports.deleteProject = exports.updateProject = exports.createProject = void 0;
const projectModel_1 = __importDefault(require("../models/projectModel"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProject = new projectModel_1.default(req.body);
    try {
        const savedProject = yield newProject.save();
        res.status(201).json(savedProject);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProject = yield projectModel_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedProject);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield projectModel_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Project has been deleted");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deleteProject = deleteProject;
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectResponse = yield projectModel_1.default.findById(req.params.id);
        res.status(200).json(projectResponse);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getProject = getProject;
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuery = req.query.new; // If a query parameter is added in url of api request
    const categoryQuery = req.query.category;
    try {
        let Projects;
        if (newQuery) {
            Projects = yield projectModel_1.default.find().sort({ createdAt: -1 }).limit(5);
        }
        else if (categoryQuery) {
            Projects = yield projectModel_1.default.find({ categories: {
                    $in: [categoryQuery],
                } });
        }
        else {
            Projects = yield projectModel_1.default.find();
        }
        res.status(200).json(Projects);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getAllProjects = getAllProjects;
//# sourceMappingURL=projectController.js.map
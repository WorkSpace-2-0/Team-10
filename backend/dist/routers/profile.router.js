"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const createProfile_controller_1 = require("../controllers/profile/createProfile.controller");
const getProfileById_controller_1 = require("../controllers/profile/getProfileById.controller");
const updateProfile_controller_1 = require("../controllers/profile/updateProfile.controller");
exports.ProfileRouter = express_1.default.Router();
exports.ProfileRouter.put("/:userId", updateProfile_controller_1.updateProfile);
exports.ProfileRouter.post("/:userId", createProfile_controller_1.createProfile);
exports.ProfileRouter.get("/:userId", getProfileById_controller_1.getProfileById);

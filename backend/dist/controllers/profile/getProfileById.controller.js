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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileById = void 0;
const profile_model_1 = require("../../models/profile.model");
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const foundProfile = yield profile_model_1.profile.findOne({
            user: userId,
        });
        res.status(201).json({
            success: true,
            message: "Profile by user id",
            userProfile: foundProfile,
        });
    }
    catch (error) {
        console.log("getting user profile by id", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.getProfileById = getProfileById;

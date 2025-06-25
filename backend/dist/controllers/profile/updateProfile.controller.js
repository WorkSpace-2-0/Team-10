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
exports.updateProfile = void 0;
const profile_model_1 = require("../../models/profile.model");
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { goingOut, weekend, hobby } = req.body;
    try {
        const updateProfile = yield profile_model_1.profile.findByIdAndUpdate(userId, {
            goingOut,
            weekend,
            hobby,
        });
        if (!updateProfile) {
            res.status(404).json({ message: "Profile not found" });
        }
        res
            .status(200)
            .json({ message: "Profile updated successfully", status: true });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "failed to update profile", status: false });
    }
});
exports.updateProfile = updateProfile;

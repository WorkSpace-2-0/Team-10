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
exports.deleteSingleMood = void 0;
const mood_entry_1 = require("../../models/mood.entry");
const deleteSingleMood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedMood = yield mood_entry_1.MoodEntry.findByIdAndDelete(id);
        if (!deletedMood) {
            return res
                .status(404)
                .json({ success: false, error: "Mood entry not found" });
        }
        return res.status(200).json({ success: true, data: deletedMood });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.deleteSingleMood = deleteSingleMood;

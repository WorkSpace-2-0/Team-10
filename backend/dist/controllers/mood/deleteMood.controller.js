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
exports.deleteMood = void 0;
const mood_entry_1 = require("../../models/mood.entry");
const deleteMood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mood_entry_1.MoodEntry.deleteMany(); // this deletes ALL documents
        res.status(200).json({
            success: true,
            deletedCount: result.deletedCount,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.deleteMood = deleteMood;

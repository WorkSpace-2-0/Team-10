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
exports.getTopChoices = void 0;
const profile_model_1 = require("../../models/profile.model");
const getTopStat = (profiles, key) => {
    const counts = {};
    const total = profiles.length;
    console.log(`Calculating top stats for key: ${key}, total profiles: ${total}`);
    for (const p of profiles) {
        const values = p[key];
        if (!Array.isArray(values)) {
            console.warn(`Profile ${p._id} key "${key}" is not an array or missing`, values);
            continue;
        }
        for (const value of values) {
            counts[value] = (counts[value] || 0) + 1;
        }
    }
    console.log(`Counts for ${key}:`, counts);
    let topAnswer = "";
    let topCount = 0;
    for (const [answer, count] of Object.entries(counts)) {
        if (count > topCount) {
            topAnswer = answer;
            topCount = count;
        }
    }
    const percent = total > 0 ? Math.round((topCount / total) * 100) : 0;
    return {
        answer: topAnswer,
        percent,
        description: `${percent}% of your team liked ${topAnswer}`,
    };
};
const getTopChoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield profile_model_1.profile.find().lean(); // <--- key fix here
        console.log("Profiles fetched from DB:", profiles);
        const rechargeTop = getTopStat(profiles, "rechargeMethods");
        const teamActivitiesTop = getTopStat(profiles, "teamActivities");
        const workplaceValuesTop = getTopStat(profiles, "workplaceValues");
        res.status(200).json({
            rechargeMethods: rechargeTop,
            teamActivities: teamActivitiesTop,
            workplaceValues: workplaceValuesTop,
        });
    }
    catch (err) {
        console.error("Error fetching top choices:", err);
        res.status(500).json({ message: "Failed to get top choices", error: err });
    }
});
exports.getTopChoices = getTopChoices;

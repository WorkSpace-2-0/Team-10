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
exports.checkStreakAndReward = checkStreakAndReward;
const rewardService_1 = require("../services/rewardService");
const checkTenDaysStreak_1 = require("./checkTenDaysStreak");
function checkStreakAndReward(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const streakAchieved = yield (0, checkTenDaysStreak_1.hasTenDayMoodEntryStreak)(userId, 10);
        console.log(`[checkStreakAndReward] Streak achieved for ${userId}: ${streakAchieved}`);
        if (!streakAchieved)
            return null;
        const reward = yield (0, rewardService_1.getRandomReward)();
        console.log(`[checkStreakAndReward] Reward granted to ${userId}: ${reward}`);
        return reward;
    });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getEnvironmentVariable(name, defaultValue) {
    const value = process.env[name] ?? defaultValue;
    if (value === undefined) {
        throw new Error(`Enrolment variable ${name} is required`);
    }
    return value;
}
const CONFIG = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: getEnvironmentVariable("JWT_EXPIRES_IN", "7d"),
};
exports.default = CONFIG;
//# sourceMappingURL=config.js.map
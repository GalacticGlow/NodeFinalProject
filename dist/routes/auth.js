"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const authSchema_1 = require("../schemas/authSchema");
const router = express_1.default.Router();
router.post("/register", (0, validate_1.validateBody)(authSchema_1.registerSchema), authController_1.registerController);
router.post("/login", (0, validate_1.validateBody)(authSchema_1.loginSchema), authController_1.loginController);
exports.default = router;
//# sourceMappingURL=auth.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomServiceController = __importStar(require("../controllers/roomServiceController"));
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const roomServiceSchema_1 = require("../schemas/roomServiceSchema");
const router = express_1.default.Router();
router.post("/", auth_1.auth, (0, auth_1.requireRole)("RECEPTIONIST", "ADMIN"), (0, validate_1.validateBody)(roomServiceSchema_1.createRoomServiceSchema), roomServiceController.createRoomService);
router.get("/", auth_1.auth, (0, auth_1.requireRole)("RECEPTIONIST", "ADMIN"), roomServiceController.getRoomServices);
router.get("/:id", auth_1.auth, (0, auth_1.requireRole)("RECEPTIONIST", "ADMIN"), roomServiceController.getRoomServiceById);
router.put("/:id", auth_1.auth, (0, auth_1.requireRole)("RECEPTIONIST", "ADMIN"), (0, validate_1.validateBody)(roomServiceSchema_1.replaceRoomServiceSchema), roomServiceController.replaceRoomService);
router.patch("/:id", auth_1.auth, (0, auth_1.requireRole)("RECEPTIONIST", "ADMIN"), (0, validate_1.validateBody)(roomServiceSchema_1.updateRoomServiceSchema), roomServiceController.updateRoomService);
router.delete("/:id", auth_1.auth, (0, auth_1.requireRole)("RECEPTIONIST", "ADMIN"), roomServiceController.deleteRoomService);
exports.default = router;
//# sourceMappingURL=roomServiceRoutes.js.map
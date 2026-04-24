"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
function notFound(req, res, next) {
    res.status(404).json({ message: "Not Found" });
}
//# sourceMappingURL=notFound.js.map
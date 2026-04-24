"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_libsql_1 = require("@prisma/adapter-libsql");
const client_1 = require("@prisma/client");
const adapter = new adapter_libsql_1.PrismaLibSql({
    url: process.env.DATABASE_URL ?? "",
});
const prisma = new client_1.PrismaClient({ adapter });
exports.default = prisma;
//# sourceMappingURL=prisma.js.map
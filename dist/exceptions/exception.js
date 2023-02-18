"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundException";
    }
}
exports.NotFoundException = NotFoundException;
//# sourceMappingURL=exception.js.map
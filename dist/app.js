"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor(userController) {
        this.PORT = 3000;
        this.createServer = () => {
            this.app.listen(this.PORT, () => {
                return console.log(`server is listening on port ${this.PORT}`);
            });
        };
        this.parsingReqBody = () => {
            this.app.use(body_parser_1.default.json());
            this.app.use(body_parser_1.default.urlencoded({
                extended: false,
            }));
        };
        this.standartizeRoute = (userController) => {
            this.app.use("/users", userController.UserRouter);
        };
        this.app = (0, express_1.default)();
        this.parsingReqBody();
        this.standartizeRoute(userController);
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map
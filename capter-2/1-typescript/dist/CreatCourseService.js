"use strict";
/**
 * name - string
 * duration - number
 * educator - string
 */
Object.defineProperty(exports, "__esModule", { value: true });
class CreatCourseService {
    execute(name, duration, educator) {
        console.log(name, duration, educator);
    }
}
exports.default = new CreatCourseService();

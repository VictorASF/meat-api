"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const restify_errors_1 = require("restify-errors");
exports.authorize = (...profiles) => {
    return (req, resp, next) => {
        if (req.authenticated !== undefined && req.authenticated.hasAny(...profiles)) {
            req.log
                .debug('User authorized for %s. Required profiles: %j. route %s. User profiles: %j', req.authenticated._id, profiles, req.path(), req.authenticated.profiles);
            next();
        }
        else {
            if (req.authenticated) {
                req.log
                    .debug('Permission denied for %s. Required profiles: %j. User profiles: %j', req.authenticated._id, profiles, req.authenticated.profiles);
            }
            next(new restify_errors_1.ForbiddenError('Permission Denied'));
        }
    };
};

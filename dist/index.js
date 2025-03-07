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
exports.MtaConnection = void 0;
class MtaConnection {
    constructor(config = {}) {
        this.config = {
            host: config.host || "127.0.0.1",
            port: config.port || 22005,
            protocol: config.protocol || "http",
            credentials: config.credentials
        };
        this.api = this.initResourceProxy();
    }
    executeCall(resource, procedure, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = this.getEndpoint(resource, procedure);
            const auth = this.getAuthConfig();
            const response = yield fetch(endpoint, {
                method: 'POST',
                headers: Object.assign(Object.assign({}, this.getRequestHeaders()), (auth && {
                    'Authorization': 'Basic ' + btoa(`${auth.user}:${auth.password}`)
                })),
                body: JSON.stringify(params)
            });
            const data = yield response.json();
            return data[0];
        });
    }
    getEndpoint(resource, procedure) {
        return `${this.config.protocol}://${this.config.host}:${this.config.port}/${String(resource)}/call/${procedure}`;
    }
    getRequestHeaders() {
        return {
            "Content-type": "application/json",
            "User-Agent": `MTA:SA Node JS`
        };
    }
    getAuthConfig() {
        return this.config.credentials
            ? {
                user: this.config.credentials.username,
                password: this.config.credentials.password
            }
            : undefined;
    }
    initResourceProxy() {
        return new Proxy({}, {
            get: (_, resourceName) => {
                return new Proxy({}, {
                    get: (_, procedureName) => {
                        return (...args) => this.executeCall(resourceName, procedureName, args);
                    }
                });
            }
        });
    }
}
exports.MtaConnection = MtaConnection;
exports.default = MtaConnection;

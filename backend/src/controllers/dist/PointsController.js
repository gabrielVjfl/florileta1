"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var connection_1 = require("../database/connection");
var PointsController = /** @class */ (function () {
    function PointsController() {
    }
    PointsController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, whatsapp, latitude, longitude, cidade, endereco, numero, items, trx, point, insertedIds, points_id, pointItems;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, whatsapp = _a.whatsapp, latitude = _a.latitude, longitude = _a.longitude, cidade = _a.cidade, endereco = _a.endereco, numero = _a.numero, items = _a.items;
                        return [4 /*yield*/, connection_1["default"].transaction()];
                    case 1:
                        trx = _b.sent();
                        point = {
                            //  image: req.file.filename, 
                            name: name,
                            email: email,
                            whatsapp: whatsapp,
                            latitude: latitude,
                            longitude: longitude,
                            cidade: cidade,
                            endereco: endereco,
                            numero: numero
                        };
                        return [4 /*yield*/, trx('points').insert(point)
                            // SALVAR NA TABELA MANY TO MANY
                        ];
                    case 2:
                        insertedIds = _b.sent();
                        points_id = insertedIds[0];
                        pointItems = items
                            .map(function (items_id) {
                            return {
                                items_id: items_id,
                                points_id: points_id
                            };
                        });
                        console.log(items);
                        return [4 /*yield*/, trx('point_items').insert(pointItems)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, trx.commit()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.json(__assign({ id: points_id }, point))];
                }
            });
        });
    };
    PointsController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cidade, points, serializedPoints;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cidade = req.query.cidade;
                        return [4 /*yield*/, connection_1["default"]('point_items')
                                //.groupBy('points.id')
                                .innerJoin('points', 'point_items.points_id', 'points.id')
                                .innerJoin('items', 'point_items.items_id', 'items.id')
                                .where('cidade', String(cidade))
                                .select('points.*', 'items.title')];
                    case 1:
                        points = _a.sent();
                        serializedPoints = points.map(function (points) {
                            return __assign({}, points);
                        });
                        return [2 /*return*/, res.json(serializedPoints)];
                }
            });
        });
    };
    PointsController.prototype.indextwo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var listar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1["default"].select('name', 'email', 'whatsapp', 'latitude', 'longitude', 'cidade', 'numero', 'endereco', 'point_items.items_id').table('points')
                            .join('point_items', 'points.id', '=', 'point_items.points_id')
                        //.join('items', 'points.id', 'items.id')
                    ];
                    case 1:
                        listar = _a.sent();
                        //.join('items', 'points.id', 'items.id')
                        res.status(200).json(listar);
                        return [2 /*return*/];
                }
            });
        });
    };
    PointsController.prototype.listquery = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var items, parsedItems, listar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = req.query.items;
                        parsedItems = String(items)
                            .split(',')
                            .map(function (item) { return Number(item); });
                        return [4 /*yield*/, connection_1["default"].select('name', 'email', 'whatsapp', 'latitude', 'longitude', 'cidade', 'endereco', 'numero', 'point_items.item_id').table('points')
                                .join('point_items', 'points.id', '=', 'point_items.points_id')
                                //.where('city', String(city))
                                .whereIn('point_items.items_id', parsedItems)
                                .distinct()];
                    case 1:
                        listar = _a.sent();
                        res.status(200).json(listar);
                        return [2 /*return*/];
                }
            });
        });
    };
    PointsController.prototype.indexjoin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var listar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1["default"].select('points.name', 'points.email', 'points.latitude', 'points.longitude', 'points.cidade', 'points.endereco', 'points.numero', 'items.title').table('point_items')
                            .innerJoin('points', 'point_items.points_id', 'points.id')
                            .innerJoin('items', 'point_items.items_id', 'items.id')
                            .distinct()
                            .orderBy('points.name')];
                    case 1:
                        listar = _a.sent();
                        res.status(200).send(listar);
                        return [2 /*return*/];
                }
            });
        });
    };
    PointsController.prototype.indexquery = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cidade, listar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cidade = req.query.cidade;
                        return [4 /*yield*/, connection_1["default"].select('points.name', 'points.email', 'points.latitude', 'points.longitude', 'points.cidade', 'points.endereco', 'points.numero', 'items.title').table('point_items')
                                .innerJoin('points', 'point_items.points_id', 'points.id')
                                .innerJoin('items', 'point_items.items_id', 'items.id')
                                .where('cidade', String(cidade))];
                    case 1:
                        listar = _a.sent();
                        res.status(200).send(listar);
                        return [2 /*return*/];
                }
            });
        });
    };
    PointsController.prototype.indexparams = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, listar, serializedPoints;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, connection_1["default"].select('items.title').table('point_items')
                                .innerJoin('points', 'point_items.points_id', 'points.id')
                                .innerJoin('items', 'point_items.items_id', 'items.id')
                                .where('points.id', String(id))];
                    case 1:
                        listar = _a.sent();
                        serializedPoints = listar.map(function (point) {
                            return __assign({}, point);
                        });
                        res.status(200).send(serializedPoints);
                        return [2 /*return*/];
                }
            });
        });
    };
    PointsController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, points, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, connection_1["default"].table('points').where('id', id).first()];
                    case 1:
                        points = _a.sent();
                        if (!points) {
                            return [2 /*return*/, res.status(400).json({ message: 'Point not foud!' })];
                        }
                        return [4 /*yield*/, connection_1["default"].table('items')
                                .join('point_items', 'items.id', '=', 'point_items.items_id')
                                .where('point_items.points_id', id)
                                .select('items.title')];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, res.json({ points: points, items: items })];
                }
            });
        });
    };
    PointsController.prototype.showQuery = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cidade, points, serializedPoint, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cidade = req.query.cidade;
                        return [4 /*yield*/, connection_1["default"].table('points').where({ cidade: cidade }).select("*")];
                    case 1:
                        points = _a.sent();
                        if (!points) {
                            return [2 /*return*/, res.status(400).json({ message: 'Point not foud!' })];
                        }
                        serializedPoint = __assign({}, points);
                        return [4 /*yield*/, connection_1["default"].table('items')
                                .innerJoin('point_items', 'point_items.items_id', 'items.id')
                                .select('*')];
                    case 2:
                        items = _a.sent();
                        return [2 /*return*/, res.json({ points: serializedPoint, items: items })];
                }
            });
        });
    };
    return PointsController;
}());
exports["default"] = PointsController;

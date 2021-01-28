"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
// ``
router.get('/heroes', (req, resp) => {
    const query = `
        SELECT * 
        FROM heroes
    `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            return resp.json({
                ok: true,
                heroes
            });
        }
    });
});
router.get('/heroes/:id', (req, resp) => {
    const id = req.params.id;
    const scapeId = mysql_1.default.instance.cnn.escape(id);
    const query = `
        SELECT * 
        FROM heroes
        where id = ${scapeId}
`;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                err
            });
        }
        return resp.json({
            ok: true,
            heroe
        });
    });
});
const query = `
SELECT * 
FROM heroes
`;
exports.default = router;

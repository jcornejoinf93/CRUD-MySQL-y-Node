import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

// ``

router.get('/heroes', (req: Request, resp: Response) => {

    const query = `
        SELECT * 
        FROM heroes
    `;

    MySQL.ejecutarQuery(query, (err: any, heroes: Object[]) => {
        if(err) {
            return resp.status(400).json({
                ok: false,
                error: err
            });
        } else {
            return resp.json({
                ok: true,
                heroes
            });
        }
    });
});

router.get('/heroes/:id', (req: Request, resp: Response) => {

    const id = req.params.id;

    const scapeId = MySQL.instance.cnn.escape(id);

    const query = `
        SELECT * 
        FROM heroes
        where id = ${ scapeId }
`;

    MySQL.ejecutarQuery(query, (err: any, heroe: Object[]) => {
        if(err) {
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




export default router;
import {Router, Request, Response} from 'express'

import PointsController from '../controllers/PointsController'

import ItemsController from '../controllers/ItemsController'

const PC = new PointsController()

const IC = new ItemsController()

const route = Router()

route.get('/', (req: Request, res: Response) => {
    res.json('oi')
})

route.post('/points/create', PC.create)
route.get('/points/list', PC.index)
route.get('/points/listwo', PC.indextwo)
route.get('/items/list', IC.index)
route.get('/points/listquery', PC.listquery)
route.get('/points/listotal', PC.indexjoin)
route.get('/points/indexquery', PC.indexquery)
route.get('/points/indexparams/:id', PC.indexparams)
route.get('/points/indexp/:id', PC.show)
route.get('/points/showquery', PC.showQuery)
export default route
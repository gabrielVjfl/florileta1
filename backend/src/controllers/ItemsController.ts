import Knex from '../database/connection'

import express, {Request, Response} from 'express'


class ItemsController {
    async index(req: Request, res: Response) {
    const items = await Knex.table('items').select('*')

    const serializedItems = items.map(item => {
        return { 
          id: item.id,
          title: item.title,
          //image_url: `http://${mobile}:3333/uploads/${item.image}`
        };
      });
    
      return res.json(serializedItems);


    }

}
export default ItemsController
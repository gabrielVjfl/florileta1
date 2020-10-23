import Knex from '../database/connection'

import express, {Request, Response} from 'express'

class PointsController {
   async create(req: Request, res: Response) {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        cidade,
        endereco,
        numero,
        items
      } = req.body;
    
      const trx = await Knex.transaction();
    
      const point = {
      //  image: req.file.filename, 
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        cidade,
        endereco,
        numero,
      };
  
      const insertedIds = await trx('points').insert(point)
    
      // SALVAR NA TABELA MANY TO MANY
      const points_id = insertedIds[0];
    
      const pointItems = items
        .map((items_id: number) => {
          return {
            items_id,
            points_id
          };
        });

        console.log(items)
    
      await trx('point_items').insert(pointItems);
    
      await trx.commit();
  
      return res.json({
        id: points_id,
        ...point,
      });


   }
   async index(req: Request, res: Response) {
    const { cidade } = req.query;


    const points = await Knex('point_items')
    //.groupBy('points.id')

    .innerJoin('points', 'point_items.points_id', 'points.id')
    .innerJoin('items', 'point_items.items_id', 'items.id')
      .where('cidade', String(cidade))
      .select('points.*', 'items.title');

    const serializedPoints = points.map(points => {
      return { 
        ...points,
    //    image_url: `http://${process.env.SERVER_MOBILE_HOST}:3333/uploads/${point.image}`
      };
    });

    return res.json(serializedPoints);

   }
   async indextwo(req: Request, res: Response) {
    let listar = await Knex.select('name', 'email', 
    'whatsapp', 'latitude', 'longitude', 'cidade', 'numero','endereco',
    'point_items.items_id').table('points')
    .join('point_items', 'points.id', '=', 'point_items.points_id')
    //.join('items', 'points.id', 'items.id')

     res.status(200).json(listar)

  }

  async listquery(req: Request, res: Response) {
   const {items} = req.query

    const parsedItems = String(items)
    .split(',')
    .map(item => Number(item))
  
  
    let listar = await Knex.select('name', 'email', 
    'whatsapp', 'latitude', 'longitude', 'cidade', 'endereco', 'numero', 
    'point_items.item_id').table('points')
    .join('point_items', 'points.id', '=', 'point_items.points_id')
     //.where('city', String(city))
     .whereIn('point_items.items_id', parsedItems)
     .distinct()
     
     res.status(200).json(listar)

  }

  async indexjoin(req: Request, res: Response) {
    let listar = await Knex.select('points.name',
  'points.email', 'points.latitude', 'points.longitude',
  'points.cidade', 'points.endereco', 'points.numero' ,
  'items.title').table('point_items')
    .innerJoin('points', 'point_items.points_id', 'points.id')
    .innerJoin('items', 'point_items.items_id', 'items.id')
     .distinct()
     .orderBy('points.name')

    res.status(200).send(listar)
  }

  async indexquery(req: Request, res: Response) {
   const {cidade} = req.query

    let listar = await Knex.select('points.name',
  'points.email', 'points.latitude', 'points.longitude',
  'points.cidade', 'points.endereco', 'points.numero',
  'items.title').table('point_items')
    .innerJoin('points', 'point_items.points_id', 'points.id')
    .innerJoin('items', 'point_items.items_id', 'items.id')
     .where('cidade', String(cidade))

    res.status(200).send(listar)
  
   
}
async indexparams(req: Request, res: Response) {
  const {id} = req.params

  let listar = await Knex.select(
  'items.title').table('point_items')
    .innerJoin('points', 'point_items.points_id', 'points.id')
    .innerJoin('items', 'point_items.items_id', 'items.id')
     .where('points.id', String(id))

     const serializedPoints = listar.map(point => {
      return { 
        ...point,
      //  image_url: `http://${process.env.SERVER_MOBILE_HOST}:3333/uploads/${point.image}`
      };
    });


    res.status(200).send(serializedPoints)
}
async show(req: Request, res: Response) {
  const {id} = req.params

  const points = await Knex.table('points').where('id', id).first()

  if(!points) {
    return res.status(400).json({ message: 'Point not foud!' });
  }

   

    const items = await Knex.table('items')
    .join('point_items', 'items.id', '=', 'point_items.items_id')
    .where('point_items.points_id', id)
    .select('items.title');


  return res.json({ points, items });
  
}
async showQuery(req: Request, res: Response) {
  const {cidade} = req.query
 

  const points = await Knex.table('points').where({cidade}).select("*")

  if(!points) {
    return res.status(400).json({ message: 'Point not foud!' });
  }

  const serializedPoint = {
    ...points,
   // image_url: `http://${process.env.SERVER_MOBILE_HOST}:3333/uploads/${point.image}`
  };
  
    const items = await Knex.table('items')
    .innerJoin('point_items', 'point_items.items_id', 'items.id')
    .select('*');


  return res.json({ points: serializedPoint, items });
  
}
  
}


export default PointsController
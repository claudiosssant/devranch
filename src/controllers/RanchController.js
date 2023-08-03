import House from '../models/House';

class RanchController {

  async index (req, res) {
    const { status } = req.query;

    const houses = await House.find ({ status });

    return res.json(houses);
  };

  async store (req, res) {
    const { filename } = req.file;
    const { description, price, location, status} = req.body;
    const { user_id } = req.headers;


    const ranches = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    });

    return res.json(ranches);
  };

  async update (req,res) {

    const { filename } = req.file;
    const { ranch_id } = req.params;
    const { description, price, location, status} = req.body;
    const { user_id } = req.headers;

    const houses = await House.updateOne({ _id: ranch_id }, {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    });
    return res.json(houses)
  }
}


export default new RanchController();
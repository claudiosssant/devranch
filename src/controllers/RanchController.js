import House from '../models/House';

class RanchController {
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
  }
}


export default new RanchController();
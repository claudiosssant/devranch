import House from '../models/House';
import User from '../models/User';

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

    
    const houses = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    });

    return res.json(houses);
  };

  async update (req,res) {

    const { filename } = req.file;
    const { ranch_id } = req.params;
    const { description, price, location, status} = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(ranch_id);

    if(String(user._id) !== String(houses.user)){
      return res.status(401).json ({ error: 'Não autorizado!'});
    }

     await House.updateOne({ _id: ranch_id }, {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status
    });
    return res.send();
  }


  async destroy(req, res) {

    const { ranch_id } = req.body;
    const { user_id } = req.headers;
  
    await House.findByIdAndDelete({ _id: ranch_id });
  
    return res.json({ message: "Imóvel excluído!" });
  };

};


export default new RanchController();
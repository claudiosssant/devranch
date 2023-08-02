 import User from '../models/User';

 class SessionController{

  async store(req,res){
    const { email } = req.body;

    // verificando se o usuário já existe
    let user = await User.findOne ({ email });

    if(!user) {
      user = await User.create({ email });
    }
   
    return res.json(user);
  }
 };

 export default new SessionController();
const {User} = require('../../db')
const bcrypt = require('bcrypt')


const loginHandler = async (
  email: string | undefined,
  password: string | undefined
) => {
  if(!email || !password) throw new Error ('Missing data.')

  const user = await User.findOne({where: email})

  if(!user) throw new Error ("User doesn't exists...")

  const isCorrect = await bcrypt.compare(password, user.password);

  if(isCorrect) return user;
  else throw new Error ('The password is incorrect.')

};

export default loginHandler;

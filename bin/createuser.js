const {User} = require('../models/user');
const bcrypt= require('bcryptjs');


(async function() {
    try {
        await User.create({
            id:2,
            fullname: 'Pham Tien',
          email: 'tien@gmail.com',
          password: bcrypt.hashSync('123456', 16),
          roleId: 2,
          status: 'pending',
          createdAt: '2021-05-18',
          updatedAt: '2022-05-18',
          deleteAt: null,
    });
    } catch (error) {
        console.log(error);
    }
  
    process.exit(0);
})();
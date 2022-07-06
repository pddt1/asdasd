const {User} = require('../models/user');
const bcrypt= require('bcryptjs');


(async function() {
    try {
        await User.create({
            id:1,
            fullname: 'Pham Tien',
          email: 'tien123@gmail.com',
          password: bcrypt.hashSync('123456', 16),
          roleId: 1,
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
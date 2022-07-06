const {Role} = require('../models/user');
const bcrypt= require('bcryptjs');

(async function() {
    try {
        const arr= ['Teacher', 'Course Manager', 'Assistant']
        for(let i=1;i<=3;i++) {
            await Role.create({
                id:i,
                name: arr[i-1],
                createdAt: '2021-05-18',
                updatedAt: '2022-05-18',
                deleteAt: null,
          });
        }
    } catch (error) {
        console.log(error);
    }
  
    process.exit(0);
})();
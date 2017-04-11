const bcrypt = require('bcryptjs');
var hash = bcrypt.hashSync('ada', 8);
console.log(hash);
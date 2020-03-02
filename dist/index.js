const App = require('./app');
const mongoose = require('mongoose');
const Port = 4000;
mongoose.connect('mongodb+srv://qwerty:18364123Zz@fullstack-cejs7.gcp.mongodb.net/dock', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('база запущена'))
    .catch((e) => console.log(e));
App.listen(Port, (err) => {
    if (err)
        throw err;
    console.log(`сервер запущен на порте: ${Port}`);
});
//# sourceMappingURL=index.js.map
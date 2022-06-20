const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cat-chat', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//enable mongo logging
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Server started. Listening on localhost:${PORT}`));
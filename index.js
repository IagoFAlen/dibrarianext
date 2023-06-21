const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));

app.use(routes);

app.listen(process.env.PORT || 3002, () => {
    console.log('Executing API...');
})
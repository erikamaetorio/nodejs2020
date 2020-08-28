const express = require('express');
const routes = require('./routes/queens');
const app = express();

app.use(express.json());

app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
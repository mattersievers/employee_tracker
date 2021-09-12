const apiRoutes = require('./routes/apiRoutes');
const db = require('./db/connection');
const contentManager = require('./src/prompts');
const express = require('express'); 
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//use api routes
app.use('/api',apiRoutes);

let currentSession = new contentManager();
currentSession.initialPrompt();


app.use((req,res) => {
    res.status(404).end();
});

//Start server after DB connection
db.connect(err => {
    if(err) throw err;
    console.log('Employee database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})

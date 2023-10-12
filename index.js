const server = require('./api/server');

const PORT = 9000;

server.listen(process.env.PORT || PORT, () => {
    console.log(`\n***SERVER RUNNING ON http://localhost:${PORT}***\n`);
})
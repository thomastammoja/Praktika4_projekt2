const Pool = require("pg").Pool;

const pool = new Pool({
    user: "ruuvi_sel",
    password: "ruuvisel",
    host: "dev.vk.edu.ee",
    port: "5432",
    database: "world_student"
});

module.exports = pool;
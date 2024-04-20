const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.status(200).msg("Hello World");
});
app.listen(2000, () => {
    console.log("Server is up and running");
});
//# sourceMappingURL=app.js.map
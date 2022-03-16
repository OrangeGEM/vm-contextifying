const express = require('express');
const vm = require('vm');
const app = express();

app.use(express.json({ extended: true }))

app.post("/", async (req, res) => {
    try {
        const context = { result: "" };
        vm.createContext(context);

        const code = req.body.code;
        vm.runInContext(code, context);

        return res.status(200).send({ result: context.result });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: `Error: ${e.message}` });
    }
})

app.listen(3000, () => { console.log('Server has been started on port 3000') });
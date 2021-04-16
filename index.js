const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Server Up and Running on Port - ${port}`)
})
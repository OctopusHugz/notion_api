const express = require('express')
const getBreaks = require('./services/notion')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

app.get('/breaks', async (req, res) => {
	const data = await getBreaks()
	res.json(data)
})

app.listen(PORT, console.log(`Server listening on ${PORT}`))

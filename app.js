const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const moment = require('moment')
const fs = require('fs/promises')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use(async (req, res, next) => {
	const {method, url} = req;
	console.log(req.params)
	const data = moment().format('DD-MM-YYYY_hh:mm:ss')
	await fs.appendFile('./public/server.log', `\n ${method} ${url} ${data}`)
	next()
})


app.use('/api/contacts', contactsRouter)
app.use((req, res) => {
	res.status(404).json({message: 'Not found'})
})

app.use((err, req, res, next) => {
	const serverError = 'Server error';
	const {status = 500, message = serverError} = err
	res.status(status).json({message})

})

module.exports = app

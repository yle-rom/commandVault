import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import path from 'path'
import { CommandsData } from './types'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const filePath = path.join(__dirname, 'data/commands.json')
const data = JSON.parse(readFileSync(filePath, 'utf-8')) as CommandsData

app.get('/api/commands', (req, res) => res.json(data))

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})


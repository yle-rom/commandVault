import { Command as CLI } from 'commander'
import { readFileSync } from 'fs'
import path from 'path'
import type { CommandsData } from './types'

const filePath = path.join(__dirname, 'data/commands.json')
const data = JSON.parse(readFileSync(filePath, 'utf-8')) as CommandsData

const program = new CLI()

program
	.name('vault')
	.description('Command Vault CLI')
	.version('1.0.0')

program
	.option('-s, --search <query>', 'search commands')
	.action((options) => {
		if (options.search) {
			const results = data.commands.filter(cmd =>
				cmd.name.toLowerCase().includes(options.search.toLowerCase()) ||
				cmd.description.toLowerCase().includes(options.search.toLowerCase()) ||
				cmd.tags.some(tags => tags.toLowerCase().includes(options.search.toLowerCase()))
			)

			if (results.length === 0) {
				console.log('No commands found')
				return
			}

			results.forEach(cmd => {
				console.log(`\n${cmd.name} - ${cmd.description}`)
				cmd.usefulCommands.forEach(uc => {
					console.log(`	${uc.cmd}  ->  ${uc.note}`)
				})
			})
		}
	})

program
	.command('list')
	.description('list all commands')
	.action(() => {
		data.commands.forEach(cmd => {
			console.log(`${cmd.name} - ${cmd.category}`)
		})
	})

program.parse(process.argv)

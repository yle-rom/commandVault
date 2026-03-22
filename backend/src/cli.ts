import { Command as CLI } from 'commander'
import { readFileSync, writeFileSync } from 'fs'
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
program
	.command('add')
	.description('add a new command')
	.action(async () => {
		const rl = (await import('readline')).createInterface({
			input: process.stdin,
			output: process.stdout
		})

		const ask = (question: string): Promise<string> =>
			new Promise(resolve => rl.question(question, resolve))

		const name = await ask('Name: ')
		const description = await ask('Description: ')

		const usefulCommands: { cmd: string; note: string }[] = []
		let adding = true

		while (adding) {
			const cmd = await ask('Command (or press enter to finish): ')
			if (!cmd) {
				adding = false
			} else {
				const note = await ask('Note for this command: ')
				usefulCommands.push({ cmd, note })
			}
		}

		rl.close()

		const newCommand = {
			id: Date.now().toString(),
			name,
			description,
			category: 'general',
			tags: [],
			usefulCommands
		}

		data.commands.push(newCommand)
		writeFileSync(filePath, JSON.stringify(data, null, 2))
		console.log(`\n✓ Added "${name}" to vault`)
	})

program.parse(process.argv)

export interface UsefulCommand {
	cmd: string
	note: string
}

export interface Command {
	id: string
	name: string
	category: string
	description: string
	usefulCommands: UsefulCommand[]
	tags: string[]
}

export interface CommandsData {
	commands: Command[]
}

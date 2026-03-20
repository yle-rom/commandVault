# Command Vault

A local search engine for commands you actually use — Arch Linux, Neovim, Git, and anything else you add. Accessible as a web app and a CLI tool.

---

## Project Structure

```
~/Coding/commandVault/
├── backend/
│   └── src/
│       ├── server.ts        # Express server, serves /api/commands on port 3001
│       ├── cli.ts           # CLI tool source
│       ├── types.ts         # TypeScript interfaces (Command, UsefulCommand, CommandsData)
│       └── data/
│           └── commands.json  # The database — all commands live here
└── frontend/
    └── src/
        ├── App.tsx          # Main React component, search + command cards
        ├── main.tsx         # Entry point, mounts App into the DOM
        └── index.css        # Tailwind import
```

---

## Running the App

**Backend** — port 3001
```bash
cd ~/Coding/commanVault/backend
npx tsx src/server.ts
```

**Frontend** — port 5173
```bash
cd ~/Coding/commanVault/frontend
npm run dev
```

Then open `http://localhost:5173` in your browser. Both must be running at the same time.

---

## CLI

The `vault` command is installed globally at `/usr/local/bin/vault`. Also added npm to PATH (.zshrc -> export PATH=...)

```bash
vault list           # list all commands
vault -s <query>     # search by name, description, or tag
vault --help         # show all options
```

The CLI reads directly from `commands.json` — no need to run the backend server.

---

## Adding Commands

Open `backend/src/data/commands.json` and follow this structure:

```json
{
  "id": "unique-slug",
  "name": "command name",
  "category": "category",
  "description": "what it does",
  "usefulCommands": [
    { "cmd": "actual command", "note": "what it does" }
  ],
  "tags": ["tag1", "tag2"]
}
```

---

## Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React + Vite + TypeScript   |
| Backend  | Node.js + Express + TypeScript |
| Database | commands.json (local file)  |
| Styling  | Tailwind CSS                |
| CLI      | Commander.js + tsx          |

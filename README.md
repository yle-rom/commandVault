# Command Vault

A personal search engine for commands — Arch Linux, Neovim, Git, and more.

🌐 **[vault.romanoskotsis.com](https://vault.romanoskotsis.com)**

---

## Features

- Live search across commands, descriptions, and tags
- One-click copy to clipboard
- CLI tool for searching directly from your terminal

---

## CLI

```bash
vault -s <query>     # search commands
vault list           # list all commands
vault --help         # show options
```

### Setup

```bash
git clone https://github.com/yle-rom/commandVault.git
cd commandVault/backend
npm install
npm install -g tsx

sudo tee /usr/local/bin/vault > /dev/null <<'EOF'
#!/bin/bash
tsx /path/to/commandVault/backend/src/cli.ts "$@"
EOF

sudo chmod +x /usr/local/bin/vault
```

---

## Adding Commands

Edit `backend/src/data/commands.json`:

```json
{
  "id": "unique-slug",
  "name": "command name",
  "category": "category",
  "description": "what it does",
  "usefulCommands": [
    { "cmd": "example command", "note": "what it does" }
  ],
  "tags": ["tag1", "tag2"]
}
```

---

## Tech Stack

| Layer    | Tech                           |
|----------|--------------------------------|
| Frontend | React + Vite + TypeScript      |
| Backend  | Node.js + Express + TypeScript |
| Styling  | Tailwind CSS                   |
| CLI      | Commander.js + tsx             |

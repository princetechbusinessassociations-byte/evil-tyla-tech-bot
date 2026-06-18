# 🤖 EVIL TILA TECH Bot v2.0

**Advanced Telegram Bot with AI Integration & Group Management**

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

---

## 🎯 Features

### 🤖 AI Integration
- **ChatGPT Integration** - Ask questions and get intelligent responses
- **GPT-4 Support** - Advanced AI capabilities
- **Image Generation** - Create images with DALL-E
- **Text Translation** - Multi-language support
- **Code Assistant** - Help with programming

### 🛡️ Group Management & Moderation
- **Admin Tools** - Ban, mute, warn, lock, unlock
- **Anti-Spam** - Automatic spam detection and blocking
- **Anti-Link** - Filter unwanted links
- **Anti-Badword** - Automatic profanity filtering
- **Anti-NSFW** - NSFW media detection
- **New Member Gate (CAPTCHA)** - Verify new members
- **Flood Guard** - Prevent spam floods
- **Welcome & Goodbye Messages** - Customize greetings

### 🎮 Fun Commands
- **Dice Roller** - Roll dice
- **Coin Flip** - Flip a coin
- **Jokes** - Random jokes
- **Memes** - Random meme images
- **Game Commands** - Various interactive games

### 📋 Settings & Notes
- **Group Rules** - Define and display rules
- **Notes/Filters** - Auto-responses to triggers
- **Custom Settings** - Personalize bot behavior

---

## 📋 Installation

### Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** or **yarn**
- **Telegram Bot Token** (from @BotFather)
- **OpenAI API Key** (optional, for AI features)

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/princetechbusinessassociations-byte/evil-tyla-tech-bot.git
cd evil-tyla-tech-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
BOT_TOKEN=your_telegram_bot_token
OWNER_ID=your_telegram_user_id
OPENAI_API_KEY=your_openai_api_key (optional)
```

4. **Start the bot**
```bash
npm start

# Or for development with auto-reload
npm run dev
```

---

## 🎮 Commands

### AI Commands
```
/ai <question>       - Chat with ChatGPT
/gpt <prompt>        - GPT-4 response
/imagine <prompt>    - Generate images
/translate <text>    - Translate text
```

### Group Management
```
/gatelock <on/off>          - Enable CAPTCHA gate
/gatetype <type>            - Set verification type
/rules                      - Show group rules
/setrules <text>            - Set group rules
/warn <user>                - Warn a user
/ban <user>                 - Ban a user
/mute <user> <time>         - Mute a user
/antispam <on/off>          - Toggle anti-spam
/antilinkoff                - Disable link filter
/antilinkdeleteon           - Delete links
```

### Fun Commands
```
/dice                - Roll a dice
/coin                - Flip a coin
/joke                - Get a random joke
/meme                - Get a random meme
/choose <opt1|opt2>  - Choose randomly
```

### Admin Commands
```
/ping                - Check bot latency
/status              - Bot status
/settings            - Show settings
/stats               - Bot statistics
/myid                - Get your user ID
```

---

## 🛠️ Configuration

### .env File
```env
# Bot Settings
BOT_TOKEN=your_bot_token
BOT_USERNAME=your_bot_username

# Owner Settings
OWNER_ID=your_id
OWNER_USERNAME=your_username

# API Keys
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4-turbo

# Database
USE_LOCAL_DB=true

# Server
PORT=3000
NODE_ENV=development

# Feature Flags
ENABLE_AI=true
ENABLE_GROUP_MANAGEMENT=true
ENABLE_FUN_COMMANDS=true

# Anti-Spam
FLOOD_THRESHOLD=5
FLOOD_TIMEOUT=10
BAN_DURATION=3600

# Support
SUPPORT_GROUP=https://t.me/simonwolftech
```

---

## 📁 Project Structure

```
evil-tyla-tech-bot/
├── index.js                  # Main entry point
├── package.json
├── .env.example
├── README.md
│
├── src/
│   ├── config/               # Configuration files
│   │   ├── bot.js
│   │   ├── security.js
│   │   └── settings.js
│   │
│   ├── commands/             # Command implementations
│   │   ├── system/           # System commands (ping, help, etc)
│   │   ├── ai/               # AI commands
│   │   ├── group/            # Group management commands
│   │   ├── fun/              # Fun commands
│   │   └── owner/            # Owner-only commands
│   │
│   ├── handlers/             # Event & command handlers
│   │   ├── commandHandler.js
│   │   ├── eventHandler.js
│   │   ├── callbackHandler.js
│   │   └── permissionHandler.js
│   │
│   ├── database/             # Database operations
│   │   └── db.js
│   │
│   └── utils/                # Utility functions
│       ├── logger.js
│       ├── validators.js
│       └── helpers.js
│
└── database/                 # Local database storage
    └── data.json
```

---

## 🔑 Key Features in Detail

### AI Integration
- Powered by OpenAI's ChatGPT and GPT-4
- Natural language processing
- Context-aware responses
- Image generation with DALL-E

### Group Moderation
- **Automatic Spam Detection** - Learns and blocks spam patterns
- **CAPTCHA Verification** - Verifies new members automatically
- **Warning System** - Track user violations
- **Ban/Mute Management** - Temporary and permanent bans
- **Content Filtering** - Blocks inappropriate content

### Database
- **Local JSON Storage** - No external database needed
- **User Profiles** - Track user data and preferences
- **Group Settings** - Per-group configuration
- **Statistics** - Usage analytics

---

## 🚀 Deployment

### Deploy on Railway
```bash
railway init
railway link
railway up
```

### Deploy on Render
1. Connect GitHub repository
2. Create new Web Service
3. Set start command: `npm start`
4. Add environment variables
5. Deploy

### Deploy on VPS
```bash
# SSH into your VPS
ssh user@your_vps

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone https://github.com/...
cd evil-tyla-tech-bot
npm install

# Run with PM2
npm install -g pm2
pm2 start index.js --name "tila-bot"
pm2 startup
pm2 save
```

---

## 📞 Support & Links

- **Telegram Group**: https://t.me/simonwolftech
- **Bot Developer**: [@TILATECHBOT](https://t.me/TILATECHBOT)
- **GitHub**: https://github.com/princetechbusinessassociations-byte/evil-tyla-tech-bot
- **Issues**: https://github.com/princetechbusinessassociations-byte/evil-tyla-tech-bot/issues

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a Pull Request

---

## ⚠️ Disclaimer

This bot is provided as-is for educational purposes. Ensure you comply with:
- Telegram Terms of Service
- Local laws and regulations
- OpenAI's usage policies (if using AI features)

---

## 📊 Project Stats

- **Commands**: 40+
- **Features**: 20+
- **Supported Groups**: Unlimited
- **Response Time**: < 500ms

---

**Made with ❤️ by princetechbusinessassociations-byte**

⭐ Star this repo if you find it useful!
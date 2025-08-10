# Super bingo API
API for super bingo website

## 🚀 Features

- Built with Node.js and TypeScript
- Fast and low overhead web framework using Fastify
- Docker support for containerization
- Type-safe development experience
- Easy to extend and customize

## 🔧 Prerequisites

- Node.js (v18 or higher)
- npm
- Docker (optional, for containerization)

## 📦 Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:
```bash
npm install
```

## 🛠️ Development
Start the development server:
``` bash
npm run dev
```
Build the project:
``` bash
npm run build
```
Start the production server:
``` bash
npm start
```
## 🐳 Docker
Build the Docker image:
``` bash
docker build -t super-bingo-api .
```
Run the container:
``` bash
docker run -p 3000:3000 super-bingo-api
```
## 📝 Project Structure
``` 
src/
  ├── config/      # Configuration files
  ├── routes/      # API routes definitions
  ├── services/    # Business logic
  ├── types/       # TypeScript type definitions
  └── server.ts    # Server entry point
```

## 🤝 Contributing
Feel free to submit issues and pull requests.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

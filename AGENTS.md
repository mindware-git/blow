# AGENTS.md

This document provides instructions for setting up and running the different parts of this project.

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Use functional patterns where possible

---

## Frontend (Next.js)

The frontend is a [Next.js](https://nextjs.org/) application.

### Setup
- **Install dependencies:** `bun install`

### Development
- **Start dev server:** `bun dev`
  - The server will be available at [http://localhost:3000](http://localhost:3000).

### Testing
- **Run tests:** `bun test`

### Deploy
sudo nano /etc/nginx/sites-available/bapi

server {
    listen 80;
    server_name blow.mindware.kr;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

sudo ln -s /etc/nginx/sites-available/blow /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_OPTIONS="--max-old-space-size=512"

RUN npm run build

# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]

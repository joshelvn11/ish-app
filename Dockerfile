FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g pnpm

RUN pnpm install

# Bundle app source
COPY . .

RUN npm run build

# Install curl for network requests and troubleshooting
RUN apk --no-cache add curl

EXPOSE 8080

CMD [ "npm", "run", "preview" ]
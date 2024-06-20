FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Install curl for network requests and troubleshooting
RUN apk --no-cache add curl

EXPOSE 8080

CMD [ "npm", "run", "preview" ]
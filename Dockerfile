# FROM node:10.18-alpine
FROM node:14

WORKDIR /app

# ADD package.json /app/package.json
COPY package*.json ./
RUN npm install

# ADD . /app
COPY . /app

EXPOSE 3000 3001 3002 3004

CMD ["npm", "run", "start"]
ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
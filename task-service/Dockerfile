FROM node:18

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm install
RUN npm install -g dotenv-cli

COPY . /app
CMD ["npm", "start"]
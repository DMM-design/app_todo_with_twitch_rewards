
FROM node:latest

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . /
CMD [ "npm", "run", "dev" ]


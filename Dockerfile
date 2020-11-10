FROM node:12

WORKDIR /usr/src/app

# copy source
COPY . .

# install react app deps
RUN npm install

# build production version of react app
RUN npm run-script build

WORKDIR /usr/src/app/server

# install server deps
RUN npm install

EXPOSE 8080
CMD node index.js


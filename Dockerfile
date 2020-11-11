FROM node:12

# copy minecraft server jar
WORKDIR /usr/mc
COPY minecraft_server.1.16.4.jar server.jar

# copy client source
WORKDIR /usr/src/app/client
COPY client .
RUN npm install
RUN npm run build

# copy server source
WORKDIR /usr/src/app/server
COPY server .
RUN npm install

EXPOSE 8080
ENV MCLOC="/usr/mc"
CMD node index.js


FROM node:12

RUN apt-get update
RUN apt-get -y install default-jre

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

# ui port - DO NOT PORT FORWARD
EXPOSE 8080
# minecraft server port
ENV MCLOC="/usr/mc"
CMD node index.js


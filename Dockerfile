FROM node:18-alpine

WORKDIR /src

ADD package.json /src

USER root

RUN chown root.root .

RUN npm install

RUN apk update

RUN apk add bash

RUN apk add openrc

RUN mkdir /run/openrc && touch /run/openrc/softlevel
RUN rc-status

RUN apk add nginx
RUN rc-update add nginx

ADD tsconfig.json /src

ADD src /src

ADD prisma /src

RUN npm run build

CMD ["npm", "start"]


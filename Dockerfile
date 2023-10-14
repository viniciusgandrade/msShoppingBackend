FROM node:18-alpine

WORKDIR /src

ADD package.json /src

USER root

RUN chown root.root .

RUN npm install

ADD tsconfig.json /src

ADD dist /src/dist

ADD src /src

ADD prisma /src

CMD ["npm", "start"]


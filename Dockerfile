FROM node:18-alpine

WORKDIR /src

ADD package.json /src

USER root

RUN chown root.root .

RUN npm install

RUN npx prisma generate

ADD tsconfig.json /src

ADD dist /src/dist

ADD .env /src

CMD ["npm", "start"]


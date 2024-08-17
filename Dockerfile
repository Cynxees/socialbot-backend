FROM node:18 AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json /usr/src/app/
RUN npm install 

FROM base AS copy
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .

FROM base AS build
COPY --from=copy /usr/src/app /usr/src/app
RUN npx prisma generate
RUN npm run build 

CMD [ "npm", "run", "start:dev"]
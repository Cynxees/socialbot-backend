FROM node:18 AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package*.json /usr/src/app/
RUN npm install 

FROM base AS copy
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .

FROM base AS build
COPY --from=copy /usr/src/app /usr/src/app
RUN npx prisma generate && npm run build 

# auto deploy database. then,
# start depends on NODE_ENV [ need to specify -e NODE_ENV=??? during deployment ] 
CMD [ "/bin/sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start; else npm run start:dev; fi" ]
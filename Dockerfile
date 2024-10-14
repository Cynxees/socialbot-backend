###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

CMD ["npm", "run", "start:dev"]

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build

###################
# PRODUCTION
###################
FROM node:18-alpine AS production

WORKDIR /usr/src/app

# Copy only necessary files for production
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]
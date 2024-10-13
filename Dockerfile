# syntax=docker/dockerfile:1

###########################################
# BASE IMAGE
###########################################
FROM node:20.16 AS base

WORKDIR /usr/src/app

# Set environment variables
ENV HUSKY_SKIP_INSTALL=1
ENV HUSKY=0

###########################################
# Install Project Dependencies
###########################################
FROM base AS install_deps

# Copy only the files required for installing dependencies
COPY ./package.json ./package-lock.json ./

# Install all package dependencies
RUN npm install --frozen-lockfile

###########################################
# Build App
###########################################
FROM base AS build

# Copy the entire project
COPY . .

# Copy installed dependencies from the previous stage
COPY --from=install_deps /usr/src/app/node_modules ./node_modules

# Set the environment variable
ENV NODE_ENV=production

# Run the build command
RUN npm run build

###########################################
# Typechecking
###########################################
FROM base AS typecheck

# Copy the entire project
COPY . .

# Copy installed dependencies from the install_deps stage
COPY --from=install_deps /usr/src/app/node_modules ./node_modules

# Install vue-tsc globally
RUN npm install -g vue-tsc

# Run type checking
RUN npm run typecheck

###########################################
# Development Image
###########################################
FROM base AS development

# Copy the entire project
COPY . .

# Install git for npm install to work in development
RUN apt-get update && apt-get install -y git && apt-get clean

# Set the environment variable
ENV NODE_ENV=development

# Expose the application port (optional, modify as needed)
# EXPOSE 3000

# Command to run the application in development (modify as needed)
CMD ["npm", "run", "start:dev"]

###########################################
# Production Image
###########################################
FROM base AS production

# Set the environment variable
ENV NODE_ENV=production

# Copy the output from the build stage
COPY --from=build /usr/src/app/dist .

# Copy installed dependencies from the install_deps stage
COPY --from=install_deps /usr/src/app/node_modules ./node_modules

# Command to run the application (modify as needed)
CMD ["npm", "start"]

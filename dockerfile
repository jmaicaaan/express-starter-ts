FROM node:8.10-alpine

# Create app directory
WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install --quiet

# Expose the node_modules/.bin to be use in the app
ENV PATH /usr/app/node_modules/.bin:$PATH

# Bundle app source
COPY ./ ./

FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy directory to /app
# NOTE: node_modules ignored via .dockerignore
COPY . ./

CMD ["npm", "start"]
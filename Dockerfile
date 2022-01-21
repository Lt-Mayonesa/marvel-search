FROM node:17.1.0-stretch-slim

WORKDIR /app

COPY . .

ENV PATH=/app/node_modules/.bin:$PATH \
    NODE_ENV=production \
    PORT=8080

RUN npm install

EXPOSE 8080
ENTRYPOINT ["npm", "start"]

FROM node:17.1.0-stretch-slim

WORKDIR /app

COPY . .

ENV PATH=/app/node_modules/.bin:$PATH \
    NODE_ENV=production \
    PORT=3000

RUN npm install

EXPOSE 3000
ENTRYPOINT ["npm", "start"]

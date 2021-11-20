FROM node:alpine
WORKDIR /app
COPY package.json  .
RUN npm install
COPY . ./
ENV PORT 7000
EXPOSE $PORT
CMD ["npm", "run", "dev"]
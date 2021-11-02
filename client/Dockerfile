FROM node:alpine
WORKDIR /app
COPY package.json  .
RUN npm install
COPY . ./
RUN chown -R node /app/node_modules
USER node
ARG REACT_APP_PUBLIC_IMAGES
ENV REACT_APP_PUBLIC_IMAGES=${REACT_APP_PUBLIC_IMAGES}
CMD ["npm", "run", "start"]
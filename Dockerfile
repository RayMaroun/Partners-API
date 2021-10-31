FROM node:latest

WORKDIR /source

COPY . .
RUN yarn install
RUN yarn run build
RUN mkdir /app
RUN cp -r dist/* /app
COPY package.json /app

WORKDIR /app
RUN yarn install
RUN rm -rf /source


CMD ["yarn", "start-docker"]
FROM node:16.13-alpine3.14 AS alpine
RUN apk --no-cache --virtual build-dependencies add \
    bash \
    git \
    openssh \
    python3 \
    make \
    g++
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]

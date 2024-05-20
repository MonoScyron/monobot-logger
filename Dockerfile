FROM node:current

ARG buildno
ARG commitsha

ENV NODE_ENV=production


LABEL author="Curtis Fowler (curtisf)" \
      repository="https://github.com/curtisf/logger"

RUN apt-get update && \
    apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

RUN mkdir /opt/bot

# Copy files and install modules
WORKDIR /opt/bot
COPY *.js /opt/bot/
COPY *.json /opt/bot/
RUN npm i --production
RUN npm i abalabahaha/eris#dev

COPY *.md /opt/bot/
COPY src /opt/bot/src
COPY assets /opt/bot/assets

CMD ["node", "index.js"]
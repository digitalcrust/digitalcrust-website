FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY site/package.json site/yarn.lock site/.yarnrc.yml /usr/src/app/site/
COPY site/.yarn /usr/src/app/site/.yarn

WORKDIR /usr/src/app/site

RUN yarn install --immutable

COPY site /usr/src/app/site

# Copy content to the site directory
COPY content /usr/src/app/content

# Build app
RUN yarn build

EXPOSE 3000

CMD ["yarn", "run", "server:prod"]

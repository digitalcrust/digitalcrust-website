FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --immutable

# Bundle app source
COPY . .

# Build app
RUN yarn build

EXPOSE 3000

CMD ["yarn", "run", "server:prod"]

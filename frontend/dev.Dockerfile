# Specify build stage
FROM node:17.5.0-slim as builder

WORKDIR /app
ENV CI true

COPY package.json .
COPY package-lock.json .
RUN npm install


# Specify app stage
FROM node:17.5.0-slim as app

# set up non-root user
COPY .bashrc /root

WORKDIR /app

# copy over built dependencies
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/node_modules /app/node_modules

COPY .env.development .
COPY public ./public
COPY src ./src

CMD ["npm", "run", "start"]

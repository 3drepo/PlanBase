FROM node:lts-alpine as builder

# make the 'app' folder the current working directory
WORKDIR /app

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# install project dependencies and build static
RUN yarn install && \
    NODE_ENV=production yarn build 

FROM node:lts-alpine as deploy
# install simple http server for serving static content
RUN npm install -g http-server
USER node
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist/index.html ./dist/404.html

EXPOSE 8080
CMD [ "http-server", "dist" ]
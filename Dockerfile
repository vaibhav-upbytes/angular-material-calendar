### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /work/upbytes/angular-project/opensource-workspace/
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build angular-material-calendar
RUN npm run build angular-material-calendar-demo

### STAGE 2: Run ###
FROM nginx:latest
COPY --from=build /work/upbytes/angular-project/opensource-workspace/dist/angular-material-calendar-demo /usr/share/nginx/html
EXPOSE 80
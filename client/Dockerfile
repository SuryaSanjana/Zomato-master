FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm i 

COPY . ./

RUN npm run build  
#when we run npm run build react creates a folder called build.There all the production level code is present


#this nginx for react coz react needs a server to run
FROM nginx
EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /app/build /usr/share/nginx/html
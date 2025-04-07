FROM node:18
WORKDIR /app
COPY package.json ./
COPY server.js ./
RUN npm install 
COPY . .
CMD ["node", "server.js"]
EXPOSE 3000

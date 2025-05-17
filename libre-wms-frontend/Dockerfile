FROM node:20 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]
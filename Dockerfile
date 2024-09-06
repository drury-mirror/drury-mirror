FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
CMD ["npm", "run", "dev"]

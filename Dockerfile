FROM node:lts-alpine

WORKDIR /app

#copy install dependencies, src, tsconfig.
COPY . .

# Install dev, prod dependencies and build app.
RUN npm ci

# Copy project files
COPY . .

# deploy commands to discord
RUN npm run deploy

# Run the bot
CMD ["node", "dist/main.js"]
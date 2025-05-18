# Base image
FROM node:22.14.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Build the React app
RUN npm run build

# Install 'serve' to serve the build folder
RUN npm install -g serve

# Expose port 3001
EXPOSE 3001

# Start the app
CMD ["serve", "-s", "dist", "-l", "3001"]

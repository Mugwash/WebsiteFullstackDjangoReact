# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install all dependencies, including react-router-dom
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Install a simple HTTP server to serve the app
RUN npm install -g serve

# Serve the built app with routing support for single-page apps
CMD ["serve", "-s", "build", "-l", "3000"]
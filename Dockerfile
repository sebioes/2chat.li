# Use an official Node.js runtime as the base image with the desired version
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Copy the rest of the app source code to the working directory
COPY . .

# Expose a port
EXPOSE 4200

# Define the command to run your app
CMD [ "npm", "run", "start" ]
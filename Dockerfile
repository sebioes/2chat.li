# Use an official Node.js runtime as the base image with the desired version
FROM node:22

# Set the working directory inside the container
WORKDIR ~/2chat/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm install -g @angular/cli

# Copy the rest of the app source code to the working directory
COPY . .

# Expose a port
EXPOSE 4200

# Define the command to run your app
CMD ["ng", "serve", "--host", "0.0.0.0"]

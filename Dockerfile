
#Using an official node js runtime as a parent image
FROM node:22.18.0

# Set working directory inside of the docker container
# From now on all command will be run from this directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# It will tell npm what packages to install and versions used 
# Second argument (the period) is destionation directory which is /app
COPY package*.json .

# Install dependencies 
RUN npm install 
# We can run the command npm install because we have access to package.json

# Copy the rest of the application code 
COPY . .
#Copying from the source of backent-todo-app to source of working dir


# Expose the port the app runs on, since we are using port 3000
EXPOSE 3000

# Define the command to run the app 
CMD ["node", "./src/server.js"]
FROM node:18

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Copy the rest of the server application code to the container
COPY . .

# Install dependencies for the server
RUN npm install

# Build the server
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 8080

# Specify the command to run when the container starts
CMD ["npm", "start"]
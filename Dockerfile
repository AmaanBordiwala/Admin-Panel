# create a  base image
FROM  node:18 AS builder

# set the working directory
WORKDIR /app    

#copy the dependencies file
COPY package*.json ./

# install the dependencies  
RUN npm install

#copy the rest of the application code
COPY . .

# Build Next.js app (creates .next folder)
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy build output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./


#expose the port the app runs on
EXPOSE 3000     

# start the application
CMD ["npm", "start"]


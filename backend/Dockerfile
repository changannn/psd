# Use a base image with Java installed
FROM openjdk:21

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar .

# Expose the port your Java application is running on
EXPOSE 8080

# Command to run your Java application
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]

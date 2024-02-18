# notes
generated base spring file

need to setup postgresql db to be able to run the code

db config files is in main/resources/application.properties

# Ensure you have Java, Maven, Docker, NodeJs

## to compile java backend
navigate to backend folder
```bash
mvn clean install -DskipTests
```

## to run server on localhost
```bash
java -jar target/backend-0.1.jar
```
## build docker image
```bash
docker build -t spring .
```

## run/build commands
to run for localhost
```bash
ng serve
```

## to build to upload
```bash
ng build --output-path=dist/angular-test
```

## setting up aws cli
```bash
aws configure sso
aws ecr get-login-password --region ap-southeast-1 --profile colin | docker login --username AWS --password-stdin 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com
```
## building image
```bash
docker build -t management-ecr .
```
## tag file
```bash
docker tag management-ecr:latest your-id-number.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```
## push file
```bash
docker push 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```

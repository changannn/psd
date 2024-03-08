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
```
```bash
aws ecr get-login-password --region ap-southeast-1 --profile colin | docker login --username AWS --password-stdin 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com
```
## building image
```bash
docker build -t management-ecr .
```
## tag file
```bash
docker tag management-ecr:latest 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```
## push file
```bash
docker push 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```
## run the docker image in ec2
```bash
docker run 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```
## run the docker image in ec2
```bash
docker run -d --restart always -p 8080:8080 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest

docker run -p 5432:5432 -p 8080:8080 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```

## run the stats service in ec2
```bash
python3 /usr/local/S3/statistics/app.py
```

for ec2 services, connect to it via session manager to run the commands

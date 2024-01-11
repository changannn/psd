# notes
generated base spring file

need to setup postgresql db to be able to run the code

db config files is in main/resources/application.properties

### for mac
```bash
brew install maven
```
navigate to backend folder
```bash
mvn clean install -DskipTests
```
```bash
docker build -t spring .
```

# run/build commands
to run for localhost
* ng serve

to build to upload
* ng build

# setting up aws cli
* aws configure sso
* aws ecr get-login-password --region ap-southeast-1 --profile your-profile-name | docker login --username AWS --password-stdin your-id-number.dkr.ecr.ap-southeast-1.amazonaws.com
### example
* aws ecr get-login-password --region ap-southeast-1 --profile colin | docker login --username AWS --password-stdin 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com
### building image
* docker build -t management-ecr .
### tag file
* docker tag management-ecr:latest your-id-number.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
### push file
* docker push 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Integrated Environment Modelling Simulator (IEMSim) - middle-tier SaaS development</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a><strong>Angular | Java Spring | AWS | Docker </strong></a>

  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#version-history">Version History</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project (to be updated)

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Description
blabla
* blabla
* blabla
* blabla

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Angular][Angular.io]][Angular-url]
* [![Spring][spring.io]][spring-url]
* [![AWS][aws.io]][aws-url]
* [![Docker][docker.io]][docker-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* Angular
* Java
* Maven
* Docker

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/changannn/psd.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

* to compile java backend navigate to backend folder
```bash
mvn clean install -DskipTests
```

* to run server on localhost
```bash
java -jar target/backend-0.1.jar
```

* build docker image
```bash
docker build -t spring .
```

* run/build commands to run for localhost
```bash
ng serve
```

* build Angular to upload to S3
```bash
ng build --output-path=dist/angular-test
```

### setting up aws cli
```bash
aws configure sso
```
```bash
aws ecr get-login-password --region ap-southeast-1 --profile colin | docker login --username AWS --password-stdin 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com
```

### Docker
* building image
```bash
docker build -t management-ecr .
```
* tag file
```bash
docker tag management-ecr:latest 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```
* push file
```bash
docker push 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```
* run the docker image in ec2
```bash
docker run 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```
* run the docker image in ec2
```bash
docker run -d --restart always -p 8080:8080 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest

docker run -p 5432:5432 -p 8080:8080 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
```

### run the stats service in ec2
```bash
python3 /usr/local/S3/statistics/app.py
```

for ec2 services, connect to it via session manager to run the commands

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

* (to be updated)
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap
* (to be updated)
- [ ] AWS
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License
* (to be updated)
* Specify the project's license to communicate how others can use, modify, and
distribute the code

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact
* (to be updated)
* include contact details for the project maintainer or team. Provide
links to relevant communication channels (e.g., email, issue tracker)

Project Link: [https://github.com/changannn/psd](https://github.com/changannn/psd)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* (to be updated)
Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Img Shields](https://shields.io)
* angular link
* java spring link
* aws link
* docker link
* SGDS link

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TROUBLESHOOTING -->
## Troubleshooting
* (to be updated)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- VERSION HISTORY -->
## Version History
* (to be updated)
* Document changes in each version, including new features, bug fixes,
and improvements

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[spring.io]: https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=Spring&logoColor=white
[spring-url]: https://spring.io/
[docker.io]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[docker-url]: https://www.docker.com/
[aws.io]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[aws-url]: https://aws.amazon.com/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 

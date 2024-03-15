<!-- PROJECT SHIELDS -->
[![MIT License][license-shield]][license-url]

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">Integrated Environment Modelling Simulator (IEMSim) - middle-tier SaaS development</h3>

  <p align="center">
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
        <ul>
          <li><a href="#angular">Angular</a></li>
          <li><a href="#maven">Maven</a></li>
          <li><a href="#terraform">Terraform</a></li>
          <li><a href="#aws">AWS</a></li>
          <li><a href="#docker">Docker</a></li>
        </ul>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
    <li><a href="#version-history">Version History</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![IEMSim Homepage][product-screenshot]](https://u-saas.wizvision.com/)

Welcome to **Integrated Environment Modelling Simulator (IEMSim)**, an innovative project at the forefront of middle-tier Software as a Service (SaaS) development. This dynamic simulator is meticulously crafted using Angular, Java Spring, AWS, and Docker, creating a powerful synergy for an unparalleled user experience.

### Key Features:

- **Cutting-Edge Technology Stack:** IEMSim harnesses the strength of Angular, Java Spring, AWS, and Docker to deliver a responsive user interface complemented by a scalable backend architecture. This ensures a seamless and efficient user experience.

- **SaaS Excellence:** Positioned as a middle-tier SaaS solution, IEMSim embodies a minimalistic yet potent approach to environmental modeling. The project's commitment to quality and adaptability is evident in the ongoing sprints and a carefully outlined roadmap.

- **Roadshow Preparation:** As we anticipate the roadshow, our dedicated team is actively addressing outstanding deliverables, refining features, and seamlessly integrating the application into the cloud. Despite the project's minimalistic design, our focus is unwavering towards delivering a polished and impactful application.

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
### Angular
2. Install NPM packages
  ```sh
  npm install
  ```
3. Build Angular to upload to S3
  ```bash
  ng build --output-path=dist/angular-test
  ```
4. Run on localhost (optional)
  ```bash
  ng serve
  ```
### Maven
5. compile java backend at backend directory PATH
  ```bash
  mvn clean install -DskipTests
  ```
6. Run on localhost (optional)
  ```bash
  java -jar target/backend-0.1.jar
  ```

### AWS
#### Terraform
7.setup the vpc endpoints (for EC2 Session manager access)
  Use terraform files to handle setup of the vpc endpoints
  1. Navigate to directory (One time setup)
  ```bash
  terraform init
  ```
  2. Edit config files to include correct aws credentials under provider.tf 
  2. Run the terraform files
  ```bash
  terraform apply -auto-approve
  ```
  3. Delete resources when done with the application usage 
  ```bash
  terraform destroy -auto-approve
  ```

  1. Alternative method: setting up the vpc endpoints manually as required
  ```
  ec2
  ec2messages
  ssmmessages
  ```



#### EC2
7. Configuration to connect to AWS service 
  ```bash
  aws configure sso
  ```
8.  Connect to AWS ECR
  ```bash
  aws ecr get-login-password --region ap-southeast-1 --profile colin | docker login --username AWS --password-stdin 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com
  ```

### Docker
9. Build docker image in backend PATH
  ```bash
  docker build -t management-ecr .
  ```
10. Tag image
  ```bash
  docker tag management-ecr:latest 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
  ```
11. Push image to AWS ECR
  ```bash
  docker push 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
  ```
12. Run docker image **IN EC2** (development)
  ```bash
  docker run -p 5432:5432 -p 8080:8080 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
  ```
13. Run the docker image **IN EC2** (production)
  ```bash
  docker run -d --restart always -p 5432:5432 -p 8080:8080 134321203882.dkr.ecr.ap-southeast-1.amazonaws.com/management-ecr:latest
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
* Explore practical examples demonstrating how to effectively use the features of the Integrated Environment Modelling Simulator (IEMSim). This space is dedicated to showcasing screenshots, code snippets, and interactive demos to provide users with a clear understanding of the project's functionalities. Additional resources and guides can also be linked here to help users make the most out of IEMSim.


<!-- LICENSE -->
## License
Distributed under the MIT License. See `LICENSE` for more information


<!-- CONTACT -->
## Contact
* For inquiries, feedback, or collaboration opportunities, please feel free to reach out to the project maintainer or team. You can contact us through the following channels:
  - Email: [team16@gmail.com](mailto:example@email.com)
  - Issue Tracker: [Issues](https://github.com/changannn/psd/issues)

Project Link: [https://github.com/changannn/psd](https://github.com/changannn/psd)


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [License](https://choosealicense.com/)
* [Image Shields](https://shields.io)
* [Angular](https://angular.io/)
* [Java SpringBoot](https://spring.io/)
* [AWS](https://aws.amazon.com/)
* [Docker](https://www.docker.com/)
* [SGDS](https://www.designsystem.tech.gov.sg/)


<!-- TROUBLESHOOTING -->
## Troubleshooting
* Push docker image to AWS ECR
  * Requires to do this step on local computer
    * <a href="#aws">AWS</a>
* Pull docker image from AWS ECR
  * Requires to do this step on EC2
    * <a href="#aws">AWS</a>


<!-- VERSION HISTORY -->
## Version History
- [x] Register, Login
- [x] Multi-Factor Authentication
- [x] User Creation
- [x] Session Timeout
- [x] IEMSim CRD Operation
- [ ] Run on AWS Cloud
- [ ] Dashboard
- [ ] Restriction

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### run the stats service in ec2 (to be updated)
```bash
python3 /usr/local/S3/statistics/app.py
```
for ec2 services, connect to it via session manager to run the commands


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://choosealicense.com/licenses/mit
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

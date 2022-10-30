<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center" style="font-size:10vw;">Node Clean</h2>

  <p align="center">
    A Node.js project template with clean architecture implementation
    <br />
    <a href="https://github.com/agungsptr/node-clean"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/agungsptr/node-clean/stargazers">
      <img src="https://img.shields.io/github/stars/agungsptr/node-clean.svg">
    </a>
    <a href="https://github.com/agungsptr/node-clean/network">
      <img src="https://img.shields.io/github/forks/agungsptr/node-clean.svg?color=blue">
    </a>
    <a href="https://github.com/agungsptr/node-clean/network">
      <img src="https://img.shields.io/github/contributors/agungsptr/node-clean.svg?color=blue">
    </a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
This project aim to used as base backend project which implement clean architecture. 
I create this project to help me build backend application more faster as a template project.
Fell free to use this project as your base appliaction.
I am very happy if you are helped by using this template.



### Built With

* [![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com)
* [![Mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)



<!-- GETTING STARTED -->
## Getting Started

Lets start this project...

### Prerequisites

Before you dig in to this project it very nice if you understand clean architecture concept. I recommend you to read about the clean architecture first.

* Basic javascript
* VS Code (Recommend)
* Node
* Yarn
* Docker

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/agungsptr/node-clean.git
   ```
2. Install YARN packages
   ```sh
   yarn install
   ```
3. Copy `.env.example` to `.env`
4. Setup `mongodb` container
   ```sh
   make infra
   ```
5. Seed database
   ```sh
   make seed
   ```
6. Now you can run this project
   ```sh
   yarn dev
   ```



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.



<!-- CONTACT -->
## Contact

Agung Saputra - agung.e.sptr@gmail.com

Project Link: [here](https://github.com/agungsptr/node-clean)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Resources that help me to build this project.

* [Clean Architecture Node.js - Build a REST API](https://mannhowie.com/clean-architecture-node)
* [Clean Architecture in ExpressJS Applications (NodeJS)](https://merlino.agency/blog/clean-architecture-in-express-js-applications)
* [JavaScript dependency injection in Node – friend or foe?](https://tsh.io/blog/dependency-injection-in-node-js/)
* [Patterns — Generic Repository with Typescript and Node.js](https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e)
* [Express.js](https://expressjs.com)
* [MongoDB Documentation](https://www.mongodb.com/docs)
* [Mongoose Documentation](https://mongoosejs.com/docs)

# 🎓 Inspirado nos melhores do mercado, feito do zero

<p align = "center">
  <img src="https://raw.githubusercontent.com/MarcosVMoreira/iFood-Clone/master/Documentation/principal.png" alt="Página principal do sistema" width="900" height="448"/>  
  
  <p align = "center">
   <b>Página principal do sistema</b>
  </p>
</p>

<br><br>

<p align = "center">
  <img src="https://raw.githubusercontent.com/MarcosVMoreira/iFood-Clone/master/Documentation/restaurante.PNG" alt="Restaurante" width="900" height="448"/>  
  
  <p align = "center">
   <b>Restaurante</b>
  </p>
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Esse repositório contém o **projeto de conclusão de curso** para o curso de [Engenharia de Computação](https://portal.pcs.ifsuldeminas.edu.br/cursos-superiores/bacharelado/engenharia-da-computacao) do [IFSULDEMINAS - Campus Poços de Caldas](https://pcs.ifsuldeminas.edu.br/).  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O objetivo do projeto é desenvolver uma plataforma completa e funcional (**back e frontend**) de delivery de comida usando tecnologias semelhantes ao que o iFood usa em sua stack, focando em **desempenho e escalabilidade**.

# 📊 Frontend

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O frontend do projeto foi desenvolvido utilizando a biblioteca **React** e uma das suas principais bibliotecas: **Redux**.
<br>

<p align = "center">
  <img src="https://raw.githubusercontent.com/MarcosVMoreira/iFood-Clone/master/Documentation/diagrama-frontend.png" alt="Diagrama do frontend" width="900" height="448"/>  
  
  <p align = "center">
   <b>Arquitetura do frontend (React + Redux)</b>
  </p>
</p>

Atualmente, essas são as tecnologias que foram utilizadas no frontend:

✅ React (v16)  
✅ Redux e React-Redux  
✅ SASS  
✅ ESLint e Prettier  
✅ Material UI  
✅ Jest  
✅ Cypress

Foram utilizadas as seguintes ferramentas para desenvolvimento:

- IntelliJ IDEA
- Visual Studio Code
- Postman
- Insomnia
- GitKraken
- Robo 3T
- Trello
- Clockify

# 🛠️ Backend

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;O backend do projeto foi desenvolvido utilizando **microsserviços** em Java 8 e deployado em um **cluster Kubernetes**.  
<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ao todo, o sistema conta com **quatro microsserviços** principais, sendo eles **merchant, customer, order e auth**. Cada qual conta com seu próprio banco de dados. Além disso, para deploy local, foi utilizado um microsserviço para service discovery. Todavia, para deploy em cluster, foi aproveitado o serviço de **service discovery do próprio Kubernetes**. Por fim, temos um microsserviço de **gateway** para realizar o redirecionamento dos requests e servir como porta única de entrada/saida dos requests.


<p align = "center">
  <img src="https://raw.githubusercontent.com/MarcosVMoreira/iFood-Clone/master/Documentation/Arquitetura.png" alt="Arquitetura do backend" width="900" height="400"/>  
  
  <p align = "center">
   <b>Arquitetura do backend</b>
  </p>
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Todos os microsserviços foram deployados em um custer Kubernetes utilizando o MicroK8S como Kubernetes local.

Foram utilizadas as seguintes tecnologias no backend:

✅ Java 8  
✅ Spring Boot  
✅ MongoDB (devido fraco relacionamento entre tabelas)  
✅ Docker  
✅ JUnit e Mockito  
✅ RabbitMQ  
✅ Kubernetes   
✅ MicroK8S (ambiente Kubernetes local)   
✅ Eureka (service discovery)   
✅ Zuul (gateway)   

Além disso, foram usadas os seguintes _design patterns_ e técnicas:

✅ DTO  
✅ TDD  
✅ Builder  
✅ RestFUL APIs  
✅ Inversão de controle / Injeção de dependência  
✅ Mock object  
✅ Produtor-consumidor  
✅ Princípios SOLID

# ✒️ Equipe

- **Marcos Vinícius Moreira** - _Desenvolvedor backend_ - [MarcosVMoreira](https://github.com/MarcosVMoreira)

- **Otávio Palma** - _Desenvolvedor frontend_ - [OtavioPalma](https://github.com/OtavioPalma)

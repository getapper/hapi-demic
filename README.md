# hapi-demic
A CLI based tool to create and develop HapiJS microservices based projects

## Why

Microservices are a great software development technique for big projects.
With this CLI tool we want to offer a quick tool to create your local environment and start splitting the logic of your web application.

## How

What hapi-demic really does is to create a main proxy server by using [h2o2](https://github.com/hapijs/h2o2) hapi plugin.

Than there is a command to add a new microservice where all you have to do is to choose a name for it and a regex for path-based proxying.

This means that you can create a `users` microservice that will be in charge for example to handle all the `/users` requests.

With this we want to recreate Cloud based services like [AWS Application Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html) to redirect traffic to specific targets (our microservices).

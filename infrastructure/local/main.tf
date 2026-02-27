terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0.1"
    }
  }
}

provider "docker" {}

# Read and parse .env file
locals {
  env_content = file("${path.module}/../../.env")
  env_lines   = [for line in split("\n", local.env_content) : trimspace(line) if line != "" && !startswith(line, "#")]
  env_vars = {
    for line in local.env_lines :
    split("=", line)[0] => trim(join("=", slice(split("=", line), 1, length(split("=", line)))), "\"")
  }
}

# Backend Image
resource "docker_image" "backend" {
  name = "hr-pulse-backend:latest"
  build {
    context    = "${path.module}/../../backend"
    dockerfile = "Dockerfile"
  }
}

# Frontend Image
resource "docker_image" "frontend" {
  name = "hr-pulse-frontend:latest"
  build {
    context    = "${path.module}/../../frontend"
    dockerfile = "Dockerfile"
  }
}

# Backend Container
resource "docker_container" "backend" {
  name  = "hr-pulse-backend"
  image = docker_image.backend.image_id
  
  ports {
    internal = 8000
    external = 8000
  }

  env = [
    for k, v in local.env_vars : "${k}=${v}"
  ]

  networks_advanced {
    name = docker_network.hr_pulse_network.name
  }
}

# Frontend Container
resource "docker_container" "frontend" {
  name  = "hr-pulse-frontend"
  image = docker_image.frontend.image_id
  
  ports {
    internal = 3000
    external = 3000
  }

  env = [
    "NEXT_PUBLIC_API_URL=http://localhost:8000"
  ]

  must_run = true
  
  networks_advanced {
    name = docker_network.hr_pulse_network.name
  }

  depends_on = [docker_container.backend]
}

# Network
resource "docker_network" "hr_pulse_network" {
  name = "hr-pulse-local-network"
}

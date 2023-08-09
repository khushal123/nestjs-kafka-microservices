# Project README
# Demo
![Alt text]("https://drive.google.com/file/d/17zwh7WsdDYgwBBXiYfNTNWN94rNxBZbn/view?usp=sharing")
This repository provides a multi-container setup to manage tasks through interconnected services: API, frontend, task service, Kafka consumer, and a PostgreSQL database. This setup is vital for task management and updates notification to the frontend.

## Architecture Overview

1. **API**: Serves as the entry point for the frontend and keeps a WebSocket connection alive with it. It manages tasks and notifications.
2. **Frontend**: The user-facing component sends task requests to the API and gets updates via WebSocket.
3. **Task Service**: Handles task creation, updates, and listing. It also notifies the API about task status changes.
4. **Kafka Consumer**: Consumes and runs tasks from Kafka. Once tasks are done, it uses the Task Service to update their statuses.
5. **PostgreSQL Database**: A relational database that stores tasks and related data.

## Setup Instructions

### Prerequisites

- Docker & Docker Compose must be installed on your system.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/khushal123/nestjs-kafka-microservices.git
   cd https://github.com/khushal123/nestjs-kafka-microservices.git
   ```

2. **Environment Configuration**:
   Create a new `.env` file by copying the provided `.env.example` and rename it to `.env`. Adjust the values inside this file according to your system requirements.
   ```bash
   cp .env.example .env
   ```

3. **Start the Services**:
   Use Docker Compose to initiate all services:
   ```bash
   docker-compose up
   ```

4. **Access the Services**:
   - **Frontend**: `http://localhost:6003`
   - **API**: `http://localhost:5003`
   - **Task Service** (internally by other services): `http://task-service:4003`

## Task Management with Postman

To interact with the services, you can use the provided Postman collection. Follow the instructions:

1. **Download the Collection**: Use [this link](https://api.postman.com/collections/1633826-3b5cd25f-5835-422d-8924-736b3aa058a8?access_key=PMAT-01H7DFWHHZFJVG150DZKYNRN4V) to download the Postman collection.
  
2. **Import to Postman**: Once you've downloaded the collection, open Postman, and import the collection file.

3. **Set Environment Variables**: In Postman, create a new environment and set the variable `nest_kafka_base_url` to `http://localhost:5003`.

4. **Available Endpoints**:
   - **Create Task**: This POST request creates a new task. 
   - **Update Task**: Use this PATCH request to update the status of an existing task.
   - **Get All Tasks**: Fetch a list of all tasks with this GET request.
   - **Get Task**: Retrieve details of a specific task.



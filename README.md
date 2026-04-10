# Auth Assignment

## Demo Video

https://github.com/user-attachments/assets/047e88db-0aa2-420e-b4b3-5ab36ece2e43

A full-stack authentication demo with:

- **Frontend:** React + Vite + TypeScript
- **Backend:** Spring Boot + JWT-based auth

It supports user registration/login and role-based protected routes for `USER` and `ADMIN`.

## Project Structure

- `auth-frontend/` — React client application
- `authbackend/` — Spring Boot API

## Prerequisites

Install the following on your machine:

- **Node.js** (18+)
- **npm**
- **Java** (17+)

## Setup & Run

### 1) Start the backend

```bash
cd authbackend
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`

### API Documentation (Swagger)

After starting the backend, you can access:

- Swagger UI: `http://localhost:8080/swagger-ui/index.html`
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`

### 2) Start the frontend

```bash
cd auth-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Frontend API Configuration

The frontend uses:

- `VITE_API_BASE_URL` (if set), otherwise
- fallback: `http://localhost:8080`

## Quick Usage

1. Open the frontend URL in your browser.
2. Register as `USER` or `ADMIN`.
3. Log in and access role-based protected content.

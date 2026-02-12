# React E-Commerce App – CI/CD Project

This project demonstrates Test-Driven Development (TDD) and CI/CD using GitHub Actions and Vercel.

## Features

- Product listing
- Add to cart functionality
- Cart updates dynamically
- Firebase authentication

## Testing

- Unit tests for Navbar and Cart components
- Integration test to ensure cart updates when adding a product
- Built using Jest and React Testing Library

## CI/CD

- GitHub Actions workflow runs on every push to the main branch
- Automatically installs dependencies
- Runs tests
- Builds the project
- Deploys to Vercel only if tests pass

## Deployment

The application is deployed automatically to Vercel after successful CI checks.

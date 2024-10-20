# librewms
An open-source Warehouse Management System (WMS) designed to streamline and optimize your warehouse operations.
## Table of Contents
- Introduction
- Features
- Tech Stack
- Getting Started
  - Prerequisites
  - Installation
- Project Structure
- Contributing
- License
- Contact

## Introduction
LibreWarehouse aims to provide a flexible, efficient, and scalable solution for managing inventory, orders, and logistics. Built with a robust backend using C# and .NET 8 and a responsive frontend with React Native, it leverages modern technologies to meet the demands of today's warehouse operations.

## Features
- Real-time Inventory Tracking: Monitor stock levels in real-time.
- Order Management: Streamline the process of order fulfillment.
- Reporting & Analytics: Generate insightful reports to make informed decisions.
- User Authentication: Secure login and user management.
- Cross-platform Access: Use on both web and mobile platforms.
- Easy Integration: Integrate with existing systems via APIs.

## Tech Stack
- Backend: C#, .NET 8
- Frontend: React Native
- Containerization: Docker, Docker Compose
- Database: PostGres

## Getting Started
These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites
Make sure you have the following installed:
- Git
- Docker
- Docker Compose

### Installation
1. Clone the Repository
   ```bash
     git clone https://github.com/yourusername/librewarehouse.git
     cd librewarehouse
   ```
2. Set Up Environment Variables
   Create a `.env` file in the root directory and add any necessary environment variables. You can use the provided `.env.example` as a template.
3. Build and Run the Containers
   ```bash
     docker-compose up --build
   ```
   This command will build and start the backend and frontend services.
4. Access the Application
  Backend API: Navigate to `http://localhost:5000` (or the port specified in your Docker setup).
  Frontend App: Navigate to `http://localhost:3000` to view the React Native web application. For mobile, use an emulator or your device.

## Contributing
We welcome contributions! Please see `CONTRIBUTING.md` for guidelines on how to get involved.

## License
This project is released under GNU Affero General Public License (AGPL) v3

## Contact
For questions or suggestions, please open an issue or contact us at contact@librewarehouse.org.

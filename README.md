# Product-Review-Site
## Table of Contents
1. Introduction
2. Features
3. Technologies Used
4. Installation
5. Usage
6. Troubleshooting


## Introduction
The Product Review and Feedback System is a web application designed to collect and display reviews and feedback for various products. It is built using Next.js for the frontend and FastAPI for the backend. This application is ideal for e-commerce platforms, service providers, and any business that benefits from customer feedback.

## Features
* Product Listing: Displays a list of products fetched from the backend.
* User Reviews: Allows users to submit reviews for products.
* Feedback Aggregation: Collects and displays aggregated feedback for each product.
* Responsive Design: Works seamlessly on various devices.

## Technologies Used
Frontend: Next.js, React

Backend: FastAPI, Python

Database: Sqlite, MySql

State Management: React's built-in useState and useEffect

## Installation
### Frontend

1. Clone the repository:
```
git clone https://github.com/your-username/product-review-and-feedback-system.git
```
2. Navigate to the frontend directory:
```
cd client
```
3. Install dependencies:
```
npm install
```
4. Run the development server:
```
npm run dev
```
#### Backend
1. Navigate to the backend directory:
```
cd api
```
2. Install dependencies
```
pip install -r requirements.txt
```
3. Run the FastAPI server
```
python3 -m uvicorn main:app --host=0.0.0.0 --port=3000
```
# Usage
1. Open your browser and navigate to http://localhost:3000.
2. Browse through the list of products.
3. Submit reviews and feedback.
# Troubleshooting
1. CORS Issue: Make sure CORS is properly configured on your FastAPI backend.
2. Incorrect URL: Verify the API URL in your fetch() calls.
3. Network Issues: Ensure that your backend server is accessible.

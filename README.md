# Course Management API

This repository contains code for a simple REST API built with Express. The API is designed to manage various courses.

Basic CRUD (Create, Read, Update, Delete) functionality is implemented.

## Link

A live version of the API is available at the following URL: [https://localhost:3000/courses](https://localhost:3000/courses)

## Installation and Database

The API uses a MySQL database.
Clone the source code files, run the command `npm install` to install necessary npm packages. Run the installation script `install.js`.
The installation script creates database tables as follows:

| Table Name | Fields                      |
|------------|-----------------------------|
| workexperience    | **id** (int(11)), **companyname** (varchar(256)), **jobtitle** (varchar(256)), **location** (varchar(256)), **startdate** (date), **enddate** (date), **description** (text) |

## Usage

Below is how to access the API in various ways:

| Method | Endpoint       | Description                                                                              |
|--------|----------------|------------------------------------------------------------------------------------------|
| GET    | /workexperience       | Retrieves all available work experiences.                                                         |
| GET    | /workexperience/:ID   | Retrieves a specific work experience with the specified ID.                                       |
| POST   | /workexperience       | Stores a new work experience. Requires a work experience object to be sent with the request.               |
| PUT    | /workexperience/:ID   | Updates an existing work experience with the specified ID. Requires a work experience object to be sent.   |
| DELETE | /workexperience/:ID   | Deletes a work experience with the specified ID.                                                  |

A work experience object is returned/sent as JSON with the following structure:

{
   "companyname": "ABC Company",
   "jobtitle": "Software Engineer",
   "location": "New York",
   "startdate": "2022-01-01",
   "enddate": "2023-01-01",
   "description": "Worked on developing web applications"
}
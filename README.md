

This repository contains code for a simple REST API built with Express. The API is designed to manage various courses that I have studied during my time at the University.

Basic CRUD (Create, Read, Update, Delete) functionality is implemented.

## Link

A live version of the API is available at the following URL: [https://localhost:3000/courses](https://localhost:3000/courses)

## Installation, Database

The API uses a MySQL database.
Clone the source code files, run the command `npm install` to install necessary npm packages. Run the installation script `install.js`.
The installation script creates database tables as follows:

| Table Name | Fields                      |
|------------|-----------------------------|
| courses    | **id** (int(11)), **course_code** (varchar(256)), **course_name** (varchar(256)), **syllabus** (text), **progression** (varchar(256)) |

## Usage

Below is how to access the API in various ways:

| Method | Endpoint       | Description                                                                              |
|--------|----------------|------------------------------------------------------------------------------------------|
| GET    | /courses       | Retrieves all available courses.                                                         |
| GET    | /courses/:ID   | Retrieves a specific course with the specified ID.                                       |
| POST   | /courses       | Stores a new course. Requires a course object to be sent with the request.               |
| PUT    | /courses/:ID   | Updates an existing course with the specified ID. Requires a course object to be sent.   |
| DELETE | /courses/:ID   | Deletes a course with the specified ID.                                                  |

A course object is returned/sent as JSON with the following structure:

{
   "courseCode": "DT207G",
   "courseName": "Backend-based development",
   "progression": "B",
   "syllabus": "[https://www.example.com/syllabus](https://www.example.com/syllabus)"
}
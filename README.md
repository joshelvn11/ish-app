# ish Project Manager

## Introduction

ish is a minimal, productivity focused project management application generally designed for SCRUM and Agile software development,
although its uses can vary much more broadily as the SCRUM based are optional and adaptable and it can just be used as general
project and task management application. This is where the name ish is derived from as it is somewhat for every project management
paradigm e.g SCRUMish - it's for SCRUM to some extent.

I deciced to build ish as I personally couldn't find what I was looking with project management applications for use with my personal
projects. All the solutions I could find were either to complex, with two many features that were required to be used and obviously intented
for larger commercial organisations, or they were either too broad where I could make the functionality what I wanted but it felt it bit
hacked together and missing some essential features needed for SCRUM projects.

I wanted to create something that lay in the middle of these two sided, something that was simple and adaptable and still had the essentials
features while not being to complex and verbose for the solo developer.

The target audience for this application is therefore primarily solo developers working on their side projects and small teams who need
the essentials while not being bogged down in the admin and complexity of commercial applications. While this is the intended audience
anyone is able to use the application and adapt it as far as they can for their personal process and workflow - it works just as well
as a personal task manager or for any product development related process.

## Architecture

### Backend

The backend is built using Django leveraging the Django Rest Framework to build the API functionality. The backend is fairly bare-bones
approach using mostly all the built-in default views for handling all CRUD functionality. Authentication is handled via JWT and this is
the only modification to the backend through custom permission classes.

### Front End

The front end is a single-page application (SPA) built using React, Tailwind CSS, and Shadcn. React is a popular JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience. By using a component-based architecture, React allows us to break down the UI into reusable, self-contained components, making the development process more efficient and the codebase easier to maintain.

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing custom CSS. This approach allows for rapid UI development and ensures a consistent design language across the application. Tailwind's utility classes can be composed to create complex designs directly in the markup, reducing the need for context switching between HTML and CSS files.

Shadcn is a UI component library for React that provides a set of pre-designed, customizable components. It integrates seamlessly with Tailwind CSS, allowing us to leverage both the utility-first approach of Tailwind and the pre-built components of Shadcn to build a cohesive and visually appealing user interface.

Vite is used as the build tool and development server. Vite is a modern build tool that offers a fast and optimized development experience.

By combining React, Tailwind CSS, Shadcn, and Vite, we achieve an extremely fast, modular, and efficient front-end development process. This combination not only enhances the performance and responsiveness of the application but also makes it pleasant for both users and developers.

## Layout & Structure

### Home / Dashboard

This is the main entry point to the application and provides the user with an overview of their project, its tasks and progress.
Ir shows various stats to allow users and project managers to assess the overall progress of the project as well as breakdown
of their current sprint.

### Backlog

This is the primary page in the applicatiom where all the task data is contained. At its core it is simply just a table of tasks, where
users can add, modify and delete tasks but provides various options to allow users how they can view there data and what data they can view through filtering, sorting and grouping options.

They can view their task broken down by epics, sprints, both or none so they can focus on specific epics or sprints at a time. They can
create views for managing their current sprint, doing retrospectives or planning their next sprint. They can filter out tasks by
type, status, sprint or priority. The backlog page is very flexible and allows users to engage with their data how they wish to or how
is applicable to the workflow and project.

## Features & Functions

## Items

Items are really the core of the application, they are essentially the tasks but are split into types of User Stories, Tasks, Bugs and
Documentation. They have common feature fields of titles, descriptions, due dates, sprints, priorities, statuses and subtasks. Currently
User Stories are the only slighlty modified item with the extra field of user story. Under the hood they are all the same model in the
database with all the same fields the front-end just renders different field for each allowing items to have their type changed
while still retaining all their data for every field.

### Item Tables

Item tables are how items are viewed, they are just a table with relevant common columns for type, title, status, priority, due date
and sprint. They inherit which items are displayed via their parent which currently is either the epic card or backlog page itself.
Each item is rendered as a row in the table with functions to edit or delete the item. Editing or viewing and item will bring up a modal
with an extened view of fields relevant to the item being viewed.

### Epics

Epics are the primary way of viewing and grouping item tables. Each epic is viewed as card and has its own fields of title, description,
status and priority. Each epic card has a child item table which it will pass the data necessary to render the items it contains. The epic
cards are created and invoked by the backlog and it in turn passes it the data necessary to render its own data and its item data.

### Sprints

### Filters

### Sorting

### Column Modification

## Design

The design of the application is intended to reflect the philosophy of being simple, minimal and functional. The application design is clean,
simple while being visually appealing and non-intimidating.

The UI is built using Tailwind and the ShadCN ui library for React, almost all the styling is handled by the default Shadcn styles with minor adjustments made as necessary.

## Database

### Schema

## Deployment

## Testing

## Future Ideas & Roadmap

## Credits

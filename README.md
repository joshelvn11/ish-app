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

The Backlog page is the central hub of the application where all task-related data is managed and displayed. Fundamentally, it is a comprehensive table of tasks that allows users to add, modify, and delete tasks. However, it offers much more than just basic CRUD (Create, Read, Update, Delete) operations. The Backlog page provides a variety of options for users to customize how they view and interact with their data through advanced filtering, sorting, and grouping functionalities.

Users have the flexibility to view their tasks organized by epics, sprints, both, or neither, enabling them to focus on specific aspects of their project as needed. This flexibility is particularly useful for different stages of project management, such as managing the current sprint, conducting retrospectives, or planning future sprints. The ability to create custom views tailored to these different stages enhances the overall user experience and productivity.

Filtering options are extensive, allowing users to narrow down tasks by type (e.g., User Stories, Tasks, Bugs, Documentation), status (e.g., To Do, In Progress, Done), sprint, or priority (e.g., Optional, Beneficial, Essential, Critical). This level of granularity ensures that users can focus on the most relevant tasks at any given time, making it easier to manage workloads and priorities.

Sorting options further enhance the usability of the Backlog page. Users can sort tasks based on various criteria such as due date, priority, or status, allowing them to quickly identify high-priority tasks or those that are overdue. Grouping options enable users to categorize tasks in a way that makes the most sense for their workflow, whether that means grouping by epic, sprint, or any other attribute.

Overall, the Backlog page is designed to be highly adaptable, catering to the unique needs and workflows of different users. Whether you are a solo developer managing personal projects or part of a small team working on a collaborative effort, the Backlog page provides the tools and flexibility needed to effectively manage and engage with your task data.

## Features & Functions

## Items

Items are the fundamental building blocks of the application. They represent tasks and are categorized into four types: User Stories, Tasks, Bugs, and Documentation. Each item type shares a set of common attributes, including titles, descriptions, due dates, sprints, priorities, statuses, and subtasks.

User Stories are slightly unique as they include an additional field specifically for user stories. Despite these differences, all item types are based on the same underlying model in the database. This unified model ensures that each item, regardless of its type, retains all its data across different fields. The front-end dynamically renders the appropriate fields for each item type, allowing for seamless transitions between types without data loss.

This design provides flexibility and consistency, enabling users to change the type of an item while preserving all associated information. For example, a task can be converted into a user story or a bug without losing its title, description, due date, or any other field data. This adaptability is crucial for managing the evolving nature of project tasks and requirements.

### Item Tables

Item tables are the primary way to view and manage items within the application. These tables display items in a structured format, with columns for common attributes such as type, title, status, priority, due date, and sprint. The items displayed in these tables are determined by their parent component, which can be either an epic card or the backlog page itself.

Each item is represented as a row in the table, providing a clear and organized view of all relevant information. Users have the ability to edit or delete items directly from the table. When an item is selected for editing or viewing, a modal window is triggered, presenting an extended view of all fields pertinent to the item. This modal allows users to make detailed modifications or review comprehensive information about the item.

The design of the item tables ensures that users can efficiently manage their tasks, with intuitive controls for sorting, filtering, and grouping items based on various criteria. This flexibility allows users to customize their view and focus on specific aspects of their project, enhancing their ability to track progress and make informed decisions.

### Epics

Epics serve as the primary method for viewing and organizing item tables within the application. Each epic is represented as a card, which includes its own set of fields such as title, description, status, and priority. These fields provide a high-level overview of the epic's details and current state.

Each epic card contains a child item table that displays the items associated with that particular epic. The epic card is responsible for passing the necessary data to its child item table, ensuring that all relevant items are rendered correctly. This hierarchical structure allows users to easily navigate and manage their tasks within the context of a specific epic.

The creation and invocation of epic cards are managed by the backlog component. The backlog component aggregates the data required for each epic card and its corresponding item table, ensuring that both the epic's metadata and its associated items are accurately displayed. This seamless integration between the backlog and epic cards provides a cohesive and intuitive user experience, enabling users to efficiently track and manage their project tasks.

### Sprints

Sprints are a crucial aspect of project management, serving as the second dimension that organizes project items and epics over time. Each sprint is defined by a specific start and end date, establishing a clear time frame for the iteration. This time-boxed approach allows teams to focus on a set of tasks within a manageable period, promoting efficiency and productivity.

Items within the project can be assigned to any sprint, clearly indicating when each item should be worked on. This assignment helps in planning and prioritizing tasks, ensuring that the team is aligned on what needs to be accomplished during the sprint.

The application provides robust filtering options, allowing users to filter items by sprint. This functionality enables users to easily identify what tasks they should be working on currently, what has been completed in previous sprints, and what is planned for future iterations. By offering this level of visibility, the sprint system helps users stay organized and focused, ultimately contributing to the successful completion of the project.

### Filters

### Sorting

### Column Modification

## Design

The design of the application is intended to reflect the philosophy of being simple, minimal, and functional. The application design is clean, simple, while being visually appealing and non-intimidating.

### Design Philosophy

The core philosophy behind the design of the application is to ensure that it remains simple, minimal, and functional. This means that every design decision is made with the intention of keeping the user interface (UI) straightforward and easy to navigate, without unnecessary clutter or complexity. The goal is to create an environment where users can focus on their tasks without being overwhelmed by the interface.

### Visual Appeal

While simplicity and minimalism are key, the design also aims to be visually appealing. This involves using a clean and modern aesthetic that is pleasing to the eye. The color scheme, typography, and layout are all chosen to create a harmonious and attractive look. The design avoids overly bright or distracting elements, ensuring that the focus remains on the content and functionality.

### User Experience

The design is also non-intimidating, meaning that it is approachable and easy to use for users of all skill levels. This is achieved by providing clear and intuitive navigation, consistent design patterns, and helpful feedback. The interface is designed to be forgiving, with actions that are easy to understand and undo if necessary.

### Technical Implementation

The UI is built using Tailwind CSS and the ShadCN UI library for React. Tailwind CSS is a utility-first CSS framework that allows for rapid and flexible styling. It provides a set of predefined classes that can be combined to create custom designs without writing custom CSS. This approach ensures that the design remains consistent and maintainable.

The ShadCN UI library is used to provide a set of pre-designed components that follow best practices for accessibility and usability. These components are styled using Tailwind CSS, ensuring that they integrate seamlessly with the rest of the application. While the default ShadCN styles are used for most components, minor adjustments are made as necessary to fit the specific needs of the application.

### Customization

Although the application relies heavily on the default styles provided by ShadCN, there is room for customization. Tailwind CSS allows for easy modification of styles through its configuration file, enabling adjusting colors, spacing, typography, and other design elements to match the application's branding and requirements. This flexibility ensures that the design can evolve over time while maintaining its core principles of simplicity, minimalism, and functionality.

## Database

### Schema

## Deployment

## Testing

## Future Ideas & Roadmap

## Credits

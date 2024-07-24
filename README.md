# ish Project Manager

## Introduction

ish is a minimalistic, productivity-focused project management application primarily designed for SCRUM and Agile software development. However, its versatility allows it to be used for a wide range of project and task management needs. The name "ish" reflects its adaptable nature, as it can be tailored to various project management paradigms, such as being "SCRUMish" – suitable for SCRUM to some extent.

The motivation behind creating ish stemmed from my personal experience with existing project management tools. I found that most available solutions were either too complex, with an overwhelming number of mandatory features intended for large commercial organizations, or too generic, lacking essential features for SCRUM projects and feeling somewhat cobbled together.

My goal was to develop a tool that strikes a balance between these extremes – something simple, adaptable, and equipped with essential features without being overly complex and verbose, especially for solo developers.

The primary target audience for ish includes solo developers working on personal projects and small teams that require essential features without the administrative burden and complexity of commercial applications. Nevertheless, the application is designed to be flexible enough for anyone to use and adapt to their personal processes and workflows. It functions equally well as a personal task manager or for any product development-related process.

## Architecture

### Backend

The backend of the application is built using Django. To handle the API functionality, Django Rest Framework (DRF) is leveraged, which is a powerful and flexible toolkit for building Web APIs.

The backend architecture follows a minimalist and efficient approach, primarily utilizing the built-in default views provided by DRF to manage all CRUD (Create, Read, Update, Delete) operations. This ensures that the codebase remains clean and maintainable while still providing all the necessary functionality for interacting with the application's data.

Authentication is a critical aspect of any application, and for this, I have implemented JSON Web Token (JWT) authentication. JWT is a compact, URL-safe means of representing claims to be transferred between two parties. It is widely used for securely transmitting information between parties as a JSON object. In the application, JWT handles user authentication and session management, ensuring that only authorized users can access and modify data.

To further enhance security, we have customized the permission classes in DRF. These custom permission classes allow the definition fine-grained access control policies, ensuring that users can only perform actions that they are authorized to do. This adds an additional layer of security and ensures that our application adheres to the principle of least privilege.

Overall, the backend is designed to be robust, secure, and efficient, providing a solid foundation for the application's functionality while maintaining simplicity and ease of maintenance.

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

## Projects

Projects are the foundational entities within the application, serving as the root parent for all other data. Each project is defined by two primary attributes: a name and a title. These attributes are essential for identifying and managing projects within the system. All other data, such as tasks, epics, and sprints, are associated with a specific project, ensuring a clear and organized structure.

Permissions and privileges are tightly integrated with projects. When performing any CRUD (Create, Read, Update, Delete) operations, the system checks whether the user has the necessary edit privileges for the related project. This ensures that only authorized users can modify project-related data, maintaining the integrity and security of the information.

Users have the flexibility to create and manage an unlimited number of projects. The project context switcher, located in the header of the site, allows users to easily switch between their projects. This switcher is dynamically populated with a list of all projects associated with the user. When a project is selected, the application clears the current data and loads the data specific to the selected project, providing a seamless transition.

Creating a new project is straightforward. Users can initiate the creation process by selecting the option to create a new project from the project context switcher. This action triggers a form dialog that prompts the user to enter the necessary fields to define the new project. Once the project is successfully created, the user is automatically switched to the new project, allowing them to start working on it immediately.

Overall, the project management functionality is designed to be intuitive and user-friendly, enabling users to efficiently manage multiple projects and ensure that their data is organized and secure.

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

Filters are a fundamental feature of the application, providing users with the ability to refine and customize their view of task data based on a wide range of attributes. These attributes include, but are not limited to, item type (e.g., User Stories, Tasks, Bugs, Documentation), status (e.g., To Do, In Progress, Done), sprint, priority (e.g., Optional, Beneficial, Essential, Critical), and more. This extensive filtering capability ensures that users can focus on the most relevant tasks at any given time, enhancing their productivity and task management efficiency.

When a filter is applied, the application automatically processes the filter criteria and updates the item data displayed in each item table. This dynamic filtering mechanism ensures that the item tables are always up-to-date, reflecting the current filter settings without requiring a manual refresh. The filtered data is then re-rendered in the item table components, providing users with an immediate and accurate view of their tasks.

Additionally, any changes made to the filter settings are instantly saved to the database. This means that the filtering options are preserved and can be reloaded on any subsequent page refresh or user session. This persistence of filter settings ensures a seamless user experience, allowing users to pick up right where they left off without having to reapply their filters.

Filters are conveniently accessible through a dropdown menu located on the backlog filter page. This design choice makes the filters compact and easily accessible, allowing users to quickly adjust their filter settings as needed. The dropdown menu provides a clean and organized interface for managing filter options, ensuring that users can efficiently navigate and apply the filters that best suit their needs.

Overall, the robust filtering system in the application empowers users to tailor their task views to their specific requirements, making it easier to manage and prioritize their work effectively.

### Sorting

### Login & Registration

The login and registration functionality is designed to provide users with a seamless and secure way to access their accounts or create new ones. These features are implemented as user-friendly forms that are simple to navigate and use. Users can easily switch between the login and registration forms, and any validation errors are immediately displayed, providing instant feedback to help users correct any issues.

When a new user signs up, an account is created, and they are immediately redirected to the login page to access their new account with the credentials they just created. The login process involves the server generating access and refresh tokens, which the client can use for authentication in all subsequent requests. This token-based authentication ensures that user sessions are secure and that the user's identity is verified for each interaction with the server.

The design of the login and registration forms prioritizes ease of use and security, ensuring that users can quickly and safely access their accounts without unnecessary complexity. This approach helps to enhance the overall user experience and encourages user engagement with the application.

### Theme Switcher

The application provides users with the ability to toggle between light and dark modes, enhancing accessibility and catering to different lighting conditions and user preferences. This feature is particularly useful for reducing eye strain in low-light environments and for users who prefer a darker interface. The theme switcher is conveniently located in the profile widget dropdown, which can be found at the far right of the application's header.

Implementing a theme switcher with Tailwind CSS is straightforward due to its built-in support for both light and dark themes. Tailwind CSS includes default styles for both themes, making it easy to switch between them. To activate or deactivate dark mode, you simply need to add or remove the `dark` class from the document's class list. This approach leverages Tailwind's utility-first design, allowing for rapid and flexible styling without the need for extensive custom CSS.

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

Currently both front end and backend are deployed as Docker containers running on Coolify, a self-hosted Vercel like platform for a seamless and easy to use CI/CD process.

Here are the deployment steps

### Setting Up Coolify

Setting up Coolify on a compatible Linux instance is a straightforward process that can be accomplished by running their installation script from the terminal. Detailed instructions and the installation script can be found on the Coolify website: https://coolify.io/self-hosted.

1. **Prepare Your Linux Instance**:
   Ensure that your Linux instance meets the compatibility requirements specified by Coolify. This typically involves having a recent version of a Linux distribution and ensuring that your system is up-to-date.

2. **Run the Installation Script**:
   Open your terminal and execute the installation script provided by Coolify. This script will handle the download and installation of all necessary components. You can find the script and detailed instructions on the Coolify website.

   ```sh
   curl -fsSL https://get.coolify.io | bash
   ```

3. **Access Coolify Dashboard**:
   Once the installation is complete, Coolify will be accessible on port 8000 of your server. Open your web browser and navigate to `http://your-server-ip:8000`. You will be prompted to log in or create an administrator account. Follow the on-screen instructions to set up your admin credentials.

4. **Create a Project and Environment**:
   After logging in, you will be directed to the Coolify dashboard. Here, you can create a new project and set up an environment for your application. This involves specifying the necessary resources such as the front-end, back-end, and database.

   - **Create a Project**: Click on the "Create Project" button and provide a name and description for your project.
   - **Set Up Environment**: Within your project, create an environment (e.g., development, staging, production). This is where we will deploy the necessary resources in the next steps.

5. **Deploy Your Application**:
   With your project and environment set up, you can now deploy your application.

By following these steps, you can leverage Coolify to streamline the deployment and management of your applications, ensuring a seamless and efficient CI/CD process.

### Deploying the Database

Coolify supports multiple resource types, including PostgreSQL, which we will use as our database.

1. **Add New Resource**:
   Click the "Add Resource" button and select PostgreSQL from the Databases section.

2. **Configure Installation**:
   Most configuration settings can be left as defaults. However, if you plan to use this database for development purposes and need to connect to it from your local machine or if you are deploying the front-end on another server, you may want to make it publicly available. To do this, select the "Make it publicly available" checkbox and optionally change the public port.

   Making the database publicly available is often necessary to push database migrations from your development environment to the production database.

3. **Start The Database**:
   Once the configuration is complete, click the "Start" button to start the database. Copy the database URL as it will be needed in the next steps.

4. **Apply Migrations**:
   In your development environment, apply all migrations to the database. Copy the database URL and set it as your database URL in your environment file. Once the database is connected, run `python3 manage.py migrate` to apply the migrations to the new database.

### Deploy the Back-End

Coolify uses Nixpacks to automatically build and deploy Docker images. This approach works well for the back-end without requiring customization.

1. **Add New Resource**:
   Click the "Add Resource" button and select "Public Git Repository" from the options. Copy and paste the GitHub repository link, including the branch, into the Git repo link field. Leave the build pack option as the default Nixpacks, which will detect all configurations and create the Docker image automatically without needing a Dockerfile. The default port can remain at 3000.

2. **Configure Installation**:
   Most configuration settings are optional. You may want to customize fields such as the name, description, and domain. Focus on the essential configuration by setting the environment variables. Add three environment variables: "DATABASE_URL" (the URL created when deploying the database), "JWT_SECRET_KEY" (a strong random secret key for JWT token generation), and "SECRET_KEY" (used by Django).

3. **Deploy The Backend**:
   Once the configuration is complete, click the "Deploy" button to deploy the application. Copy the public URL for this service as it will be needed when deploying the front end.

### Deploy The Front-End

The front-end deployment process is similar to the back-end deployment, with one exception: we will build the Docker image from our own Dockerfile because Nixpacks misses some key dependencies. The Dockerfile is located in the project's root directory if you wish to customize it.

1. **Add New Resource**:
   This step is similar to deploying the back-end. Set the deployment port to 8080 and choose Dockerfile as the build pack option so Coolify will use our custom configuration to create the Docker image.

2. **Configure Installation**:
   This step is almost identical to configuring the back-end installation. Add one environment variable: "VITE_API_URL" (the backend URL copied when deploying the backend).

3. **Deploy The Frontend**:
   Once the configuration is complete, click the "Deploy" button. After deployment, navigate to the public URL for the front-end. If everything is working correctly, you should be able to sign up for an account and log in.

## Testing

## Future Ideas & Roadmap

## Credits

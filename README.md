# ish Project Manager

![Devices Mockup](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Devices-Mockup.png)

## Introduction

ish is a minimalistic, productivity-focused project management application primarily designed for SCRUM and Agile software development. However, its versatility allows it to be used for a wide range of project and task management needs. The name "ish" reflects its adaptable nature, as it can be tailored to various project management paradigms, such as being "SCRUMish" – suitable for SCRUM to some extent.

The motivation behind creating ish stemmed from my personal experience with existing project management tools. I found that most available solutions were either too complex, with an overwhelming number of mandatory features intended for large commercial organizations, or too generic, lacking essential features for SCRUM projects and feeling somewhat cobbled together.

My goal was to develop a tool that strikes a balance between these extremes – something simple, adaptable, and equipped with essential features without being overly complex and verbose, especially for solo developers.

The primary target audience for ish includes solo developers working on personal projects and small teams that require essential features without the administrative burden and complexity of commercial applications. Nevertheless, the application is designed to be flexible enough for anyone to use and adapt to their personal processes and workflows. It functions equally well as a personal task manager or for any product development-related process.

### Goals

The primary goal of ish is to provide a streamlined, efficient project management tool that bridges the gap between overly complex commercial solutions and overly simplistic task managers. It aims to offer essential SCRUM and Agile development features while maintaining a minimalistic and user-friendly interface. The project seeks to cater to solo developers and small teams who need a flexible, adaptable tool that can be tailored to various project management paradigms without unnecessary complexity. By focusing on core functionality and user experience, ish strives to enhance productivity and simplify project management processes. Additionally, the application is designed to be versatile enough to serve as a personal task manager or support any product development-related workflow, making it accessible to a wide range of users while staying true to its core principle of simplicity and efficiency.

### Convention over Configuration

ish embraces the "Convention over Configuration" paradigm, which is a software design paradigm that aims to decrease the number of decisions developers need to make without losing flexibility. In ish, this principle is applied through a set of sensible defaults and pre-defined structures that align with common project management practices, particularly those used in Agile and SCRUM methodologies. For instance, the application comes with pre-configured item types (epics, user stories, tasks), standard workflow statuses, and default priority levels. This approach allows users to start using the tool immediately without extensive setup, while still providing the flexibility to customize these elements if needed. By adhering to this paradigm, ish reduces the initial complexity for users, especially solo developers or small teams, allowing them to focus on their project work rather than spending time on extensive configuration. This balance between out-of-the-box usability and customization options embodies the core philosophy of ish: providing a streamlined, efficient project management experience that can be easily adapted to various workflows.

### Flexible Framework for Agile and Scrum Methodologies

ish is designed to provide a flexible framework that supports Agile and Scrum methodologies without being overly prescriptive or rigid. While the application offers structures and features that align with these methodologies, such as epics, user stories, and sprints, it does not enforce a strict adherence to any particular process. This approach allows users to adopt as much or as little of the Agile and Scrum practices as they see fit for their projects. The customizable nature of ish enables teams to tailor the tool to their specific workflows, whether they're following a by-the-book Scrum process or a more hybrid Agile approach. For instance, users can utilize the sprint planning features for time-boxed iterations, or they can opt for a more fluid workflow. By providing a balance between structure and flexibility, ish empowers users to implement Agile and Scrum principles in a way that best suits their unique project requirements and team dynamics.

## Application Architecture

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

## Component Architecture

ish is built using React, a component based UI library. Here is brief breakdown of the component architure focusing on reusable components.

### Epic Card

Epic cards are used to show epics in the project and show their child items. The backlog page receives all epics from the project context, which is received directly from the server. The backlog page then iterates through the epic data passing it the props it needs to display the basic information associated with it such as the title, status and prirority.

Each epic card will then render its own item table passing its own id as prop so the item table knows what items to render based on its parent id.

### Item Table

Item tables are how items are displayed and organised. They can be rendered anywhere and conifigured to display any segment items based on a grouping id they are provided as well as the filtration options.

Currently item tables are just rendered in epics cards, the epic passing its id as a prop, the item table will then read all the item data from the project context and then rendered item rows where the epic id matches the one that was provided.

The item table is also responsible for applying filters and sorting. It reads the filter options from the project context and then filters and sorts its item data to match these specifications and then rendered and item table row for each item in the item data passing it all its essential data as props (id, status, priority, etc).

### Item Table Row

The item table row component is a table row used to render indivdual items and handle asscociated CRUD functionality. The item data is received from the item table as props and the rendered as columns in the table.

Each item table row also renders a hidden Item Form component which is modal dialog used to edit and update item information. In this instance it passes the item's data as props which are used to render the content for the form fields.

The item table row also contains a delete button to delete the item matching its own id.

### Item Form

The item form component is used to create and update item information. It handles all data validation and API communication for item create and update functionality. It can be used and rendered in two states or modes, create and update, which is managed use a state variable.

When in create mode it will render with a create button that will then handle the create API call using the data in the form. Once the item has been created successfully it will revert to update mode and hide the create button. It is called like this from the create button dropdown in the backlog page.

When called in update mode it will not render the create button and will populate all its fields from its received props. When in update mode it will also execute PATCH calls to the API when any field in it is updated. It is rendered like this from the item table row.

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

### Login & Registration

![Login & Registration](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Login-Signup.gif)

The login and registration functionality is designed to provide users with a seamless and secure way to access their accounts or create new ones. These features are implemented as user-friendly forms that are simple to navigate and use. Users can easily switch between the login and registration forms, and any validation errors are immediately displayed, providing instant feedback to help users correct any issues.

When a new user signs up, an account is created, and they are immediately redirected to the login page to access their new account with the credentials they just created. The login process involves the server generating access and refresh tokens, which the client can use for authentication in all subsequent requests. This token-based authentication ensures that user sessions are secure and that the user's identity is verified for each interaction with the server.

The design of the login and registration forms prioritizes ease of use and security, ensuring that users can quickly and safely access their accounts without unnecessary complexity. This approach helps to enhance the overall user experience and encourages user engagement with the application.

### Projects

![Project Creation](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Project.gif)

Projects are the foundational entities within the application, serving as the root parent for all other data. Each project is defined by two primary attributes: a name and a title. These attributes are essential for identifying and managing projects within the system. All other data, such as tasks, epics, and sprints, are associated with a specific project, ensuring a clear and organized structure.

Permissions and privileges are tightly integrated with projects. When performing any CRUD (Create, Read, Update, Delete) operations, the system checks whether the user has the necessary edit privileges for the related project. This ensures that only authorized users can modify project-related data, maintaining the integrity and security of the information.

Users have the flexibility to create and manage an unlimited number of projects. The project context switcher, located in the header of the site, allows users to easily switch between their projects. This switcher is dynamically populated with a list of all projects associated with the user. When a project is selected, the application clears the current data and loads the data specific to the selected project, providing a seamless transition.

Creating a new project is straightforward. Users can initiate the creation process by selecting the option to create a new project from the project context switcher. This action triggers a form dialog that prompts the user to enter the necessary fields to define the new project. Once the project is successfully created, the user is automatically switched to the new project, allowing them to start working on it immediately.

Overall, the project management functionality is designed to be intuitive and user-friendly, enabling users to efficiently manage multiple projects and ensure that their data is organized and secure.

### Sprints

![Sprint Creation](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Sprint.gif)

Sprints are a crucial aspect of project management, serving as the second dimension that organizes project items and epics over time. Each sprint is defined by a specific start and end date, establishing a clear time frame for the iteration. This time-boxed approach allows teams to focus on a set of tasks within a manageable period, promoting efficiency and productivity.

Items within the project can be assigned to any sprint, clearly indicating when each item should be worked on. This assignment helps in planning and prioritizing tasks, ensuring that the team is aligned on what needs to be accomplished during the sprint.

The application provides robust filtering options, allowing users to filter items by sprint. This functionality enables users to easily identify what tasks they should be working on currently, what has been completed in previous sprints, and what is planned for future iterations. By offering this level of visibility, the sprint system helps users stay organized and focused, ultimately contributing to the successful completion of the project.

### Epics

![Epic Creation](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Epic.gif)

Epics serve as the primary method for viewing and organizing item tables within the application. Each epic is represented as a card, which includes its own set of fields such as title, description, status, and priority. These fields provide a high-level overview of the epic's details and current state.

Each epic card contains a child item table that displays the items associated with that particular epic. The epic card is responsible for passing the necessary data to its child item table, ensuring that all relevant items are rendered correctly. This hierarchical structure allows users to easily navigate and manage their tasks within the context of a specific epic.

The creation and invocation of epic cards are managed by the backlog component. The backlog component aggregates the data required for each epic card and its corresponding item table, ensuring that both the epic's metadata and its associated items are accurately displayed. This seamless integration between the backlog and epic cards provides a cohesive and intuitive user experience, enabling users to efficiently track and manage their project tasks.

### Items

![Item Creation](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Item.gif)

Items are the fundamental building blocks of the application. They represent tasks and are categorized into four types: User Stories, Tasks, Bugs, and Documentation. Each item type shares a set of common attributes, including titles, descriptions, due dates, sprints, priorities, statuses, and subtasks.

User Stories are slightly unique as they include an additional field specifically for user stories. Despite these differences, all item types are based on the same underlying model in the database. This unified model ensures that each item, regardless of its type, retains all its data across different fields. The front-end dynamically renders the appropriate fields for each item type, allowing for seamless transitions between types without data loss.

This design provides flexibility and consistency, enabling users to change the type of an item while preserving all associated information. For example, a task can be converted into a user story or a bug without losing its title, description, due date, or any other field data. This adaptability is crucial for managing the evolving nature of project tasks and requirements.

### Item Tables

Item tables are the primary way to view and manage items within the application. These tables display items in a structured format, with columns for common attributes such as type, title, status, priority, due date, and sprint. The items displayed in these tables are determined by their parent component, which can be either an epic card or the backlog page itself.

Each item is represented as a row in the table, providing a clear and organized view of all relevant information. Users have the ability to edit or delete items directly from the table. When an item is selected for editing or viewing, a modal window is triggered, presenting an extended view of all fields pertinent to the item. This modal allows users to make detailed modifications or review comprehensive information about the item.

The design of the item tables ensures that users can efficiently manage their tasks, with intuitive controls for sorting, filtering, and grouping items based on various criteria. This flexibility allows users to customize their view and focus on specific aspects of their project, enhancing their ability to track progress and make informed decisions.

### Filters

Filters are a fundamental feature of the application, providing users with the ability to refine and customize their view of task data based on a wide range of attributes. These attributes include, but are not limited to, item type (e.g., User Stories, Tasks, Bugs, Documentation), status (e.g., To Do, In Progress, Done), sprint, priority (e.g., Optional, Beneficial, Essential, Critical), and more. This extensive filtering capability ensures that users can focus on the most relevant tasks at any given time, enhancing their productivity and task management efficiency.

When a filter is applied, the application automatically processes the filter criteria and updates the item data displayed in each item table. This dynamic filtering mechanism ensures that the item tables are always up-to-date, reflecting the current filter settings without requiring a manual refresh. The filtered data is then re-rendered in the item table components, providing users with an immediate and accurate view of their tasks.

Additionally, any changes made to the filter settings are instantly saved to the database. This means that the filtering options are preserved and can be reloaded on any subsequent page refresh or user session. This persistence of filter settings ensures a seamless user experience, allowing users to pick up right where they left off without having to reapply their filters.

Filters are conveniently accessible through a dropdown menu located on the backlog filter page. This design choice makes the filters compact and easily accessible, allowing users to quickly adjust their filter settings as needed. The dropdown menu provides a clean and organized interface for managing filter options, ensuring that users can efficiently navigate and apply the filters that best suit their needs.

Overall, the robust filtering system in the application empowers users to tailor their task views to their specific requirements, making it easier to manage and prioritize their work effectively.

### Sorting

All items in the application have multiple attributes, and some of these attributes can be sorted in either ascending or descending order. Currently, the attributes that support sorting are status and priority. This sorting functionality enables users to organize their items based on these attributes, making it easier to manage and prioritize tasks.

Sorting items by status allows users to quickly see which tasks are in different stages of completion, such as "To Do," "In Progress," or "Done." This helps users to focus on tasks that need immediate attention and track the progress of their work.

Sorting by priority, on the other hand, helps users to identify the most critical tasks that need to be addressed first. By arranging items in order of priority, users can ensure that they are working on the most important tasks and meeting deadlines effectively.

Overall, the sorting feature enhances the user experience by providing a more structured, logical, and organized view of their tasks. It allows users to customize their view according to their needs, making task management more efficient and intuitive.

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

### Wireframe

The application wireframe was initially created in Figma, focusing on a low-fidelity design to outline the essential elements and layout of the application. This low-fidelity wireframe served as a blueprint, providing a clear visual representation of the application's structure and user interface components. It allowed me to quickly iterate on the design, ensuring that all crucial elements were appropriately placed and functional.

Once the foundational layout was established through the low-fidelity wireframe, the high-fidelity design was implemented using ShadCN's default styling. ShadCN's pre-designed components and styles were leveraged to achieve a polished and professional look, adhering to best practices for accessibility and usability. During the development phase, minor styling adjustments were made as necessary to align with the specific needs and branding of the application.

This approach of combining Figma for initial wireframing and ShadCN for high-fidelity design ensured a streamlined and efficient design process. It allowed me to focus on functionality and user experience while maintaining a visually appealing and cohesive interface.

![Backlog Wireframe](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/design/Backlog.png)

![Login Wireframe](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/design/Login.png)

![Sign Up Wireframe](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/design/Sign%20Up.png)

### Colors

The application is designed to be mostly free of color to minimize distractions and make the colors that are used more prominent and meaningful. This approach ensures that when color is used, it stands out and effectively draws the user's attention to important elements.

The colors that are used in the application serve specific purposes, primarily to visually indicate and categorize status and priority. By assigning distinct colors to different statuses and priorities, users can quickly and easily recognize the significance of each item at a glance. This color-coding system helps users to prioritize tasks and manage their workflow more efficiently, as they can immediately identify high-priority items and their current status without needing to read detailed descriptions.

![Design Colors](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/design/Colors.png)

## Database

### Schema

![Database Schema](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Database-ERM.png)

View the database ERM [in Figma](https://www.figma.com/board/vtRiB4hXIeGmo2t9xtvHT0/ish.-ERM?node-id=0-1&t=Wco7bxzVktnjNJKu-1).

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

### User Testing

Extensive user testing was conducted to ensure the application's functionality, usability, and compatibility across various devices and user demographics. The testing process was comprehensive and included the following components:

1. Alpha Testing Phase:

   - Duration: Several weeks during the development process
   - Testers: Multiple alpha-testers were carefully selected to represent a diverse user base
   - Device Coverage: Testers used a wide range of devices, including:
     - Mobile phones (iOS and Android)
     - Tablets
     - Desktop computers (Windows, macOS, Linux)
   - Browser Compatibility: Testing was performed across multiple browsers, including:
     - Google Chrome
     - Mozilla Firefox
     - Safari
     - Microsoft Edge
     - Opera
   - Device Age: Both newer and older devices were included to ensure backward compatibility

2. Diversity in User Base:

   - Age groups: Ranging from young adults to seniors
   - Technical proficiency: From novice to expert users
   - Accessibility needs: Including users with visual, auditory, or motor impairments
   - Cultural backgrounds: To ensure the app's usability across different cultures and languages

3. Personal Testing:

   - As the developer, I conducted thorough testing on various devices and platforms
   - Followed predefined test cases to ensure consistency and coverage of all features
   - Performed edge case testing to identify potential issues in extreme scenarios

4. CRUD Functionality Testing:

   - Focus: Forms and data management features
   - Methodology: Manual testing with various input scenarios
   - Test Cases:
     - Submitting forms with incomplete information
     - Attempting to submit duplicate entries where uniqueness is required
   - Validation: Ensured that invalid data was properly caught and did not persist to the database
   - Error Handling: Verified that appropriate error messages were displayed to guide users

5. User Feedback Collection:

   - Implemented a feedback mechanism for testers to report issues or suggest improvements
   - Regularly reviewed and prioritized feedback for iterative development

6. Performance Testing:

   - Conducted tests under various network conditions to ensure responsiveness
   - Measured and optimized load times for critical app functions

7. Security Testing:
   - Performed basic penetration testing (such as token hijacking) to identify potential vulnerabilities
   - Ensured proper implementation of authentication and authorization mechanisms

### Validator Testing

All Javascript code was validated using eslint and passed with no errors.

### Lighthouse Testing

Pages were passed through Chrome's lighthouse test to test performance accessibility, below are the results for the login, sign up and backlog pages which are the three main working pages at this point.

#### Login Page

![Login Page Lighthouse Results](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Lighthouse-Login.png)

#### Sign Up Page

![Signup Page Lighthouse Results](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Lighthouse-Signup.png)

#### Backlog Page

![Backlog Lighthouse Results](https://s3.eu-west-1.wasabisys.com/ish.pm/docs/img/Lighthouse-Backlog.png)

### Manual Unit Testing

#### Test Case: Sign Up (Valid)

1. **Objective**: Verify that users can successfully sign up with valid data.
2. **Steps**:
   1. Enter all valid data into the sign-up form (unique username, correct and unique email, password that meets requirements).
   2. Click the sign-up button.
   3. Observe the results.
3. **Expected Results**:
   1. The user is redirected to the login screen.
   2. The login component displays a message alerting the user to the successful sign-up and prompts them to log in with their new credentials.

#### Test Case: Sign Up (Invalid)

1. **Objective**: Verify that error notifications are shown when invalid data is entered during sign-up.
2. **Steps**:
   1. Enter one item of invalid data into the sign-up form while keeping the rest of the data valid.
   2. Click the sign-up button.
   3. Observe the results.
   4. Repeat the process, changing the item that is invalid each time.
3. **Expected Results**:
   1. An error message is displayed in the sign-up form.
   2. The error message correlates to the invalid data entered, showing the corresponding error message.

#### Test Case: Login (Valid)

1. **Objective**: Verify that users can successfully log into their account with valid data.
2. **Steps**:
   1. Enter correct login details for an account.
   2. Click the login button.
   3. Observe the results.
3. **Expected Results**:
   1. The user is redirected to the dashboard page.
   2. They are logged into the correct account (account details match in the profile widget).
   3. Access tokens are saved to local storage.

#### Test Case: Login (Invalid)

1. **Objective**: Verify that error notifications are shown when invalid login credentials are used.
2. **Steps**:
   1. Enter incorrect login credentials (non-existing account or existing account with incorrect password).
   2. Click the login button.
   3. Observe the results.
3. **Expected Results**:
   1. An error message is displayed in the login form, alerting the user that the login credentials are incorrect.

#### Test Case: Logout

1. **Objective**: Verify that users are able to log out successfully.
2. **Steps**:
   1. Under the profile widget drop-down menu, click the logout button.
   2. Observe the results.
3. **Expected Results**:
   1. The user is logged out of the account and is redirected to the login screen.
   2. Attempting to access any page other than the login screen results in a redirection to the login screen.
   3. Access tokens are removed from local storage.

#### Test Case: Create Project

1. **Objective**: Verify that new projects are created successfully.
2. **Steps**:
   1. Click the create new project button in the project context switcher.
   2. Enter a title and description into the modal.
   3. Click the create button.
   4. Observe the results.
   5. Repeat the process with invalid data.
3. **Expected Results**:
   1. A modal window with the project creation form is shown.
   2. With valid data, the modal window closes, the project context switches to the new project, and the project context switcher is updated with the new project as an option.
   3. With invalid data, an error message is shown, the project is not created, and the window remains open.

#### Test Case: Switch Project

1. **Objective**: Verify that users are able to switch projects successfully.
2. **Steps**:
   1. Create two projects with some unique item data each.
   2. Have the backlog page open.
   3. Select one project from the context switcher.
   4. Observe the results.
   5. Switch to another project and observe the results.
3. **Expected Results**:
   1. The correct item data for the current project is shown on the backlog page.
   2. When the project is switched, all item data is cleared, and all item data from the newly selected project is loaded and displayed.
   3. The correct project title is displayed in the project context switcher.

#### Test Case: Create Epic

1. **Objective**: Verify that users are able to create epics successfully.
2. **Steps**:
   1. Have the backlog page open.
   2. Under the create drop-down menu, click the epic button.
   3. Fill out the form in the modal window with valid data.
   4. Click the create button.
   5. Repeat the process with invalid data.
3. **Expected Results**:
   1. A modal window opens with the create epic form.
   2. With valid data, the create button text changes to update, and the backlog page is re-rendered with the newly created epic displayed as a card.
   3. With invalid data, an error message is shown with a description of why the data is invalid.
   4. The new epic should reflect in the database.

#### Test Case: Delete Epic

1. **Objective**: Verify that users are able to delete epics successfully.
2. **Steps**:
   1. Have the backlog page open.
   2. Click the delete button on any epic.
   3. Confirm the choice in the confirmation dialog.
   4. Observe the results.
   5. Repeat the process but cancelling the action in the confirmation dialog.
3. **Expected Results**:
   1. When the delete button is clicked a confirmation dialog is shown.
   2. When the action is confirmed the dialog closes and the epic and all its children items are removed from the backlog page.
   3. The epic and all its children items are removed from the database.
   4. When the action is cancelled the confirmation dialog is closed and nothing else happens.

#### Test Case: Create Sprint

1. **Objective**: Verify that users are able to create sprints successfully.
2. **Steps**:
   1. Have the backlog page open.
   2. Under the create drop-down menu, click the sprint button.
   3. Fill out the form in the modal window with valid data.
   4. Click the create button.
   5. Repeat the process with invalid data.
3. **Expected Results**:
   1. A modal window opens with the create sprint form.
   2. With valid data, the modal window closes, the user is alerted with a toast to the success, and the sprint appears in the sprint filter drop-down.
   3. With invalid data, an error message is shown with a description of why the data is invalid.
   4. The new sprint should reflect in the database.

#### Test Case: Create Item

1. **Objective**: Verify that users are able to create items successfully.
2. **Steps**:
   1. Have the backlog page open.
   2. Under the create drop-down menu, click one of the create item buttons.
   3. Fill out the form in the modal window with valid data.
   4. Click the create button.
   5. Repeat the above process with invalid data.
   6. Repeat the above process for each item type (user story, task, documentation, bug).
3. **Expected Results**:
   1. A modal window opens with a form corresponding to the item type clicked.
   2. With valid data, the modal window closes, the user is alerted with a toast to the success, and the new item is rendered into the correct epic with correct data displayed in each column.
   3. With invalid data, an error message is shown with a description of why the data is invalid.
   4. The new item should reflect in the database.

#### Test Case: Delete Item

1. **Objective**: Verify that users are able to delete items successfully.
2. **Steps**:
   1. Have the backlog page open.
   2. Click the delete button on any item.
   3. Confirm the choice in the confirmation dialog.
   4. Observe the results.
   5. Repeat the process but cancelling the action in the confirmation dialog.
3. **Expected Results**:
   1. When the delete button is clicked a confirmation dialog is shown.
   2. When the action is confirmed the dialog closes and the item is removed from its corresponding item table.
   3. The item is removed from the database.
   4. When the action is cancelled the confirmation dialog is closed and nothing else happens.

#### Test Case: Update Item Epic

1. **Objective**: Verify that users are able to update item epics successfully.
2. **Steps**:
   1. Have the backlog page open.
   2. Click the view item button on any item.
   3. Select a different epic from the epic drop-down.
   4. Close the modal.
   5. Observe the results.
3. **Expected Results**:
   1. A modal window opens with the current epic loaded into the select epic field.
   2. When the epic is changed, the user is alerted to the successful change, and the new epic is set as the current epic in the epic select drop-down.
   3. When the modal is closed, the item should have been removed from the original epic and now be listed under the new epic.
   4. The updated item epic should reflect in the database.

#### Test Case: Update Item Attribute (Priority, Status, Due Date, Sprint)

1. **Objective**: Verify that users are able to update item attributes successfully.
2. **Steps**:
   1. Have the backlog page open.
   2. Click the view item button on any item.
   3. Select an alternate value for an attribute.
   4. Close the modal.
   5. Observe the results.
   6. Repeat the above process for each attribute.
3. **Expected Results**:
   1. A modal window opens with the current attribute value loaded into the relevant attribute field.
   2. When the attribute value is changed, the user is alerted to the successful change, and the new value is set as the current attribute value in the attribute select drop-down.
   3. When the modal is closed, the item row should have been re-rendered showing the newly selected attribute value in the relevant column for the item.
   4. The new item attribute value should reflect in the database.

#### Test Case: Update Item Description & User Story

1. **Objective**: Verify that users are able to update item descriptions and user stories successfully.
2. **Steps**:
   1. Have the backlog page open.
   2. Click the view item button on any item.
   3. Click the edit button for the description.
   4. Enter a new description.
   5. Click the save button.
   6. Observe the results.
   7. Repeat the above process for the user story.
3. **Expected Results**:
   1. A modal window opens with the current attribute value loaded into the relevant attribute field.
   2. When the attribute value is changed, the user is alerted to the successful change, and the new value is set as the current attribute value in the attribute select drop-down.
   3. When the modal is closed, the item row should have been re-rendered showing the newly selected attribute value in the relevant column for the item.
   4. The updated item description and user story should reflect in the database.

#### Test Case: Add Acceptance Criteria & Subtask

1. **Objective**: Verify that users are able to add acceptance criteria and subtasks successfully.
2. **Steps**:
   1. Click the view item button on any item.
   2. Click acceptance criteria add button
   3. Enter new acceptance criteria into the field.
   4. Click the save button.
   5. Observe the results.
   6. Repeat the above process for substasks.
3. **Expected Results**:
   1. A modal window opens with the current acceptance criteria loaded as fields under the acceptance criteria.
   2. When the add button is clicked a new text field is created at the bottom of the list.
   3. When the save button is clicked the field is re-rendered into a text field with an open checkbox and the save button is removed.
   4. The updated acceptance criteria is reflected in the item in the deatabase.

#### Test Case: Edit Acceptance Criteria & Subtask

1. **Objective**: Verify that users are able to edit acceptance criteria and subtasks successfully.
2. **Steps**:
   1. Click the view item button on any item (with acceptance criteria or subtasks).
   2. Click the edit button on any acceptance criteria
   3. Enter updated acceptance criteria into the fieldd
   4. Click the save button.
   5. Observe the results.
   6. Repeat the above process for substasks.
3. **Expected Results**:
   1. A modal window opens with the current acceptance criteria loaded as fields under the acceptance criteria and the fields are read-only by default.
   2. When the edit button on any acceptance critera is clicked the field becomes editable and save button replaces the edit and delete buttons.
   3. When the the save button is clicked the field again becomes read-only the save button is replaced with edit and delete buttons.
   4. The updated acceptance criteria is reflected in the item in the database.

#### Test Case: Edit Acceptance Criteria & Subtask Done Status

1. **Objective**: Verify that users are able to update the done status for acceptance criteria and subtasks successfully.
2. **Steps**:
   1. Click the view item button on any item (with acceptance criteria or subtasks).
   2. Click check box next to any acceptance criteria / subtask.
   3. Observe the results.
   4. Repeat the above process for substasks.
3. **Expected Results**:
   1. A modal window opens with the current acceptance criteria loaded with the checkbox checked status corresponding the the acceptance criteria done property in the database.
   2. If the checkbox is unchecked and the checkbox is clicked the checkbox then becomes checked and thetext in the corresponding textfield is set to gray and strike-through.
   3. If the chechbox is checked and the checbbox is clicked it becomes unchecked and the text in the corresponding text field returns to its original styling.
   4. After both above actions the updated acceptance criteria is reflected in the item in the database.

#### Test Case: Delete Acceptance Criteria & Subtask

1. **Objective**: Verify that users are able to delete acceptance criteria and substasks successfully.
2. **Steps**:
   1. Click the view item button on any item (with acceptance criteria or subtasks).
   2. Click the delete button on any acceptance criteria.
   3. Observe the results.
   4. Repeat the above process for substasks.
3. **Expected Results**:
   1. A modal window opens with the current acceptance criteria is loaded.
   2. When the delete button is clicked on any acceptance criteria that acceptance criteria item is removed from the list.
   3. The updated acceptance criteria is reflected in the database.

#### Test Case: Apply Attribute Filters

1. **Objective**: Verify that users are able to apply attribute filters successfully.
2. **Steps**:
   1. Click the filters menu and hover over an attribute filter sub-menu.
   2. Observe the results.
   3. Select or deselect any attribute.
   4. Observe the results.
   5. Repeat for every attribute and value.
3. **Expected Results**:
   1. When the attribute filter sub-menu is hovered over the attribute values for the attribute are shown and checked/unchecked in correspondance to their state in the filter options properties in the database.
   2. When a checked attribute value is unchecked all instances of items with that attribute value are removed from item tables in the backlog page.
   3. When an unchecked attribute value is checked all instances of items with that attribute value are added to items tables in the backlog page.
   4. After both actions the filter options are updated in the database with the correct corresponding data to the action that was performed on the attribute.

#### Test Case: Apply Sort By

1. **Objective**: Verify that users are able to sort by available attributes.
2. **Steps**:
   1. Click the filters menu and hover over the sort by sub-menu.
   2. Observe the results.
   3. Select or deselect any available attribute.
   4. Observe the results.
   5. Repeat for every attribute available attribute.
   6. Hover over the sort order sub-menu and change the sort order.
   7. Observe the results.
   8. Repeat the process for every sort by and sort order combination.
3. **Expected Results**:
   1. When the sort by sub-menu is hovered over the available attributes are shown and checked/unchecked in correspondance to their state in the filter options properties in the database.
   2. When an attribute is checked all items tables are re-rendered having the items sorted in ascending/descending order is accordance with the currently selected sort order value.
   3. When the sort order is changed all item tables are re-rendered having the items sorted by in ascending/descending according to what value is selected and in accordance with what attribute is selected in the sort by value.
   4. After both actions the filter options are updated in the database with the correct corresponding data to the action that was performed on the attribute.

#### Test Case: Apply Sprint Filter

1. **Objective**: Verify that users are able to apply the sprint filter successfully.
2. **Steps**:
   1. Click the sprint filter drop-down
   2. Observe the results.
   3. Select any sprint from the drop-down
   4. Observe the results.
3. **Expected Results**:
   1. When the sprint filter is clicked the sprint drop-down is shown and populated with an item for each print in the project.
   2. Clicking any sprint causes all item tables to be re-rendered with any items not in the selected sprint removed.
   3. After selecting a sprint the filter options are updated in the database according to the selected sprint.

#### Test Case: Hide Empty Epics

1. **Objective**: Verify that users are able to hide and show empty epics successfully.
2. **Steps**:
   1. Click the options drop-down
   2. Click the hide empty epics toggle
   3. Observe the results.
3. **Expected Results**:
   1. When the hide empty epics toggle is toggle to on all epic cards without any children are hidden from the backlog page.
   2. When the hide empty epics toggle is toggle to off all epic cards regardless of whether they contain children are shown
   3. After toggling the filter options are updated in the database according to new toggle status.

## Future Ideas & Roadmap

### Multiple Project Users

Functionality to allow multiple users to collaborate on a project with assignee functionality. This feature would enable team-based project management, allowing users to invite colleagues, assign tasks to specific team members, and track individual contributions. It would include role-based access control, real-time collaboration tools, and a notification system to keep all team members informed of project updates and changes. This enhancement would significantly expand the application's utility for larger teams and more complex projects, while maintaining its core simplicity and efficiency.

## Credits

### JWT Authentication

- Django React JWT Authentication tutorial by seanwarren on GitHub - https://github.com/seankwarren/Django-React-jwt-authentication
- Login & Regitser User tutorial by Emre Cevik on Medium - https://medium.com/django-rest/django-rest-framework-login-and-register-user-fd91cf6029d5
- JWT Authetication with React by Cosden Solutions on YouTube - https://www.youtube.com/watch?v=AcYF18oGn6Y
- Django & React JWT Authenticaion by ScalableScripts on YouTube - https://www.youtube.com/watch?v=PUzgZrS_piQ,

### Icons

- Lucide Icons - https://lucide.dev/icons/
- RadixUI Icons - https://www.radix-ui.com/icons

### Other

- Dockerizing a React application by Dhruv Patel on Medium - https://thedkpatel.medium.com/dockerizing-react-application-built-with-vite-a-simple-guide-4c41eb09defa
- UseContext Tutorial by Cosden Solutions on YouTube - https://www.youtube.com/watch?v=HYKDUF8X3qI

## Project Planning

Below are the project epics and related user stories.

### [EPIC] Critical Backend

Set up critical backend API infrastructure needed for most basic functionality

#### [USER STORY] Basic API Set Up - Models, Views & URLs

**Description**: Implement core backend functionality to enable front-end development and data management.

**User Story**: As a developer, I need to establish a robust backend infrastructure with comprehensive CRUD functionality for all data models, enabling seamless front-end development and efficient data operations.

**Acceptance Criteria**:

1. All models are accurately implemented according to the ERM specifications.
2. Full CRUD (Create, Read, Update, Delete) views are developed and functional for each model.
3. RESTful API endpoints are established and properly mapped for each view.
4. All models are accessible and manageable through the Django admin interface.
5. Authentication and authorization mechanisms are implemented to secure data access.

**Relation to Project Goal**: This user story is crucial for realizing the project's vision of a streamlined, efficient project management tool. By establishing a solid backend foundation with comprehensive data handling capabilities, it enables the development of a responsive and feature-rich front-end. This infrastructure supports the core functionalities of task and project management, ensuring that ish can offer a minimalistic yet powerful user experience. The robust backend also facilitates future scalability and feature additions, aligning with the adaptable nature of the application.

#### [USER STORY] Design ERM

**Description**: Design a comprehensive database entity-relationship model (ERM) to serve as the foundation for backend development.

**User Story**: As a developer, I need a clear and detailed entity-relationship model of the database, including all tables, fields, and their relationships, to efficiently implement the backend models and ensure data integrity.

**Acceptance Criteria**:

1. All required models (entities) are identified and clearly defined.
2. Each model includes a complete list of fields with their respective data types and constraints.
3. Relationships between models are explicitly defined, including relationships (one-to-one, one-to-many, many-to-many).
4. Primary keys and foreign keys are clearly identified for each model.
5. Any indexes or unique constraints are specified where necessary.
6. The ERM is visually represented in a diagram for easy comprehension.
7. The ERM documentation includes explanations for any complex relationships or business rules.

**Relation to Project Goal**: This user story directly supports the project's aim of creating a minimalistic yet effective project management tool. By designing a clear and efficient database structure, it ensures that ish can handle project data effectively, which is crucial for its core functionality as a versatile task and project management application.

### [EPIC] Login & Register

Create basic login an registration functionality.

#### [USER STORY] User Authentication

**Description**: Implement a secure and user-friendly login system that allows users to authenticate and access their personalized data within the application.

**User Story**: As a registered user, I want to securely log into the application so that I can access my projects, tasks, and personalized settings.

**Acceptance Criteria**:

- A clean and intuitive login form is accessible via a dedicated login URL.
- The login form includes fields for username/email and password, with appropriate input validation.
- Clicking the login button authenticates the user if the credentials are correct.
- Appropriate error messages are displayed for incorrect credentials or other login failures
- Successful login redirects the user to their personalized dashboard.
- The login page is responsive and works well on both desktop and mobile devices.
- There is link to allow users to access the sign up page from the login form

**Relation to Project Goal**: This user story is crucial for realizing ish's vision as a personalized project management tool. By implementing a secure and efficient login system, we ensure that users can access their individual projects and tasks, maintaining data privacy and enabling a tailored experience. This aligns with our goal of creating a minimalistic yet powerful tool that adapts to each user's workflow.

#### [USER STORY] User Registration

**Description**: Implement a secure and user-friendly registration system that allows new users to create an account and join the application.

**User Story**: As a new user, I want to easily sign up for an account so that I can start using the application to manage my projects and tasks.

**Acceptance Criteria**:

- A clean and intuitive registration form is accessible via a dedicated sign-up URL.
- The registration form includes fields necessary to register an account.
- The password field enforces strong password requirements.
- Clicking the sign-up button creates a new user account if all input is valid and the username/email is not already in use.
- Appropriate error messages are displayed for invalid input, existing usernames/emails, or other registration failures.
- Successful registration redirects the user to a welcome page or directly to their new, empty dashboard.
- The registration page is responsive and works well on both desktop and mobile devices.
- There is a link to allow users to access the login page from the registration form.

**Relation to Project Goal**: This user story is essential for growing the user base of ish and allowing new users to easily join the platform. By providing a straightforward and secure registration process, we ensure that users can quickly get started with managing their projects and tasks. This aligns with the goal of creating an accessible and user-friendly tool that caters to individual workflows from the very beginning of the user journey.

#### [USER STORY] User Log Out

**Description**: Implement a secure and user-friendly log out functionality that allows users to safely end their session and protect their account.

**User Story**: As an authenticated user, I want to be able to log out of my account easily and securely from any page in the application, so that I can protect my account information and ensure my privacy, especially when using shared or public devices.

**Acceptance Criteria**:

- A clearly visible log out button or link is accessible from any page within the application, from within the profile widget dropdown.
- Clicking the log out button immediately ends the user's session.
- All access tokens and session data are removed from the local storage of the user's device.
- After logging out, the user is redirected to the login page or a public landing page.
- The application prevents access to authenticated areas after logout without re-authentication.
- If the user attempts to use a back button or cached page after logout, they should still be redirected to the login page.

**Relation to Project Goal**: This user story supports the project's commitment to security and user privacy. By providing a robust and easily accessible logout feature, ish ensures that users can maintain control over their account access, which is crucial for a personal productivity tool. This aligns with the goal of creating a trustworthy and user-centric application that respects user privacy and security, enhancing the overall user experience.

### [EPIC] UI Framework

Develope the core components of the UI to create a framework for building the more functional components of the application.

#### [USER STORY] Application Design / Wireframe

**Description**: Create a comprehensive mockup application design and wireframe that outlines the visual structure, layout, and user interface elements of the ish project management tool.

**User Story**: As a developer, I want to have access to a detailed application design and wireframe so that I can understand the intended user experience, layout, and functionality, enabling me to develop the application accurately and efficiently.

**Acceptance Criteria**:

- A wireframe design mockup is available to view in Figma.
- The design shows the content and placement of all core components.

**Relation to Project Goal**: By creating a comprehensive design and wireframe, we ensure that the development process aligns closely with the intended user experience supporting the goal of creating a well design, easy to use interaface.

#### [USER STORY] Application Design / Wireframe

**Description**: Create a comprehensive mockup application design and wireframe that outlines the visual structure, layout, and user interface elements of the ish project management tool.

**User Story**: As a developer, I want to have access to a detailed application design and wireframe so that I can understand the intended user experience, layout, and functionality, enabling me to develop the application accurately and efficiently.

**Acceptance Criteria**:

- A wireframe design mockup is available to view in Figma.
- The design shows the content and placement of all core components.

**Relation to Project Goal**: By creating a comprehensive design and wireframe, we ensure that the development process aligns closely with the intended user experience supporting the goal of creating a well designed, easy to use interaface.

#### [USER STORY] Navigation Bar

**Description**: Implement a responsive and user-friendly navigation sidebar that provides easy access to all available pages within the application.

**User Story**: As a user, I want to have access to a navigation component with links to all available pages so that I can easily navigate through different sections of the application, regardless of the device I'm using.

**Acceptance Criteria**:

- A sidebar navigation menu is implemented and visible on all pages of the application.
- The sidebar contains clearly labeled links to all available pages and sections of the application.
- The navigation menu is responsive and adapts to different screen sizes:
  - On desktop, it appears as a full sidebar.
  - On mobile devices, it is collapsible and can be toggled with a menu icon.
- The current page or section is visually highlighted in the navigation menu.
- The navigation menu is accessible and can be used with keyboard navigation.
- Hover and focus states are implemented for better user interaction.
- The sidebar includes a logo or brand name at the top for consistent branding.

**Relation to Project Goal**: Implementing an effective navigation system is crucial for enhancing user experience and productivity. By providing a clear, accessible, and responsive navigation bar, we ensure that users can efficiently move between different sections of the application. This aligns with the goal of creating an intuitive and user-friendly interface that supports individual workflows and improves overall productivity.

#### [USER STORY] Profile & Settings Dropdown Menu

**Description**: Implement a globally accessible dropdown menu that displays the user's basic information (name and email) and provides quick access to important global links and functions.

**User Story**: As a user, I want to have access to a profile and settings dropdown menu so that I can quickly view my account information, access critical global functionality, and manage my account settings efficiently.

**Acceptance Criteria**:

- The profile widget is consistently available in the application header across all pages.
- Clicking the widget reveals a dropdown menu.
- The dropdown displays the user's name and email address.
- The menu includes a logout button
- Clicking outside the dropdown or pressing the ESC key closes the component.
- Hover and focus states are implemented for better user interaction.

**Relation to Project Goal**: Implementing a comprehensive profile and settings dropdown menu enhances user experience by providing quick access to essential account functions. This feature supports the project's goal of creating an intuitive and efficient interface, allowing users to manage their accounts and access important features without navigating away from their current context. It contributes to a more streamlined and user-friendly application, ultimately improving productivity and user satisfaction.

### [EPIC] Projects

Develop functionality related to viewing, changing and creating projects.

#### [USER STORY] Project Switcher

**Description**: Implement a project switcher dropdown in the primary site header to allow users to easily switch between their projects.

**User Story**: As a user, I want to be able to quickly switch between different projects I'm working on, so that I can efficiently manage and access multiple projects without navigating through multiple pages.

**Acceptance Criteria**:

- A project switcher dropdown component is implemented in the primary site header, visible on all pages.
- The dropdown is populated with projects owned by or accessible to the current user.
- Projects in the dropdown are clearly labeled and easily distinguishable.
- Selecting a project from the dropdown immediately switches the current project context.
- Upon project selection, all relevant data for the selected project is fetched and displayed.
- The currently selected project is visually highlighted in the dropdown.
- The component is responsive and works well on both desktop and mobile devices.
- Appropriate loading indicators are shown during the project switch process.
- Error handling is implemented to manage cases where project data cannot be fetched.

**Relation to Project Goal**: Implementing an efficient project switcher aligns with the goal of creating an intuitive and user-friendly interface. By allowing users to seamlessly switch between projects, we enhance productivity and streamline workflow management. This feature supports the overall aim of creating a tool that adapts to individual work styles and improves task organization across multiple projects.

#### [USER STORY] Project Creation

**Description**: Implement a robust and user-friendly functionality for creating new projects within the application.

**User Story**: As a user, I want to be able to create a new project easily and efficiently, so that I can quickly start organizing my work and collaborating with my team.

**Acceptance Criteria**:

- The project select dropdown includes a clearly labeled option to create a new project.
- This option is easily distinguishable from existing projects.
- Clicking the "Create New Project" option opens a modal dialog with a comprehensive project creation form.
- The form includes all necessary fields for project creation, such as project name and description
- Client-side validation is implemented for all form fields to ensure data integrity.
- Clear, user-friendly error messages are displayed next to the relevant fields if validation fails.
- Upon successful client-side validation, a POST request is made to the server to create the project.
- If server-side errors occur during project creation, clear and specific error messages are displayed to the user.
- The user is given the option to correct the errors and resubmit the form without losing previously entered data.
- Upon successful project creation, a confirmation notification is shown to the user.
- The creation modal is automatically closed.
- The application immediately switches context to the newly created project.
- The project switcher dropdown is updated to include the new project, with the new project selected.
- The form and modal are responsive, providing a consistent experience across desktop and mobile devices.

**Relation to Project Goal**: Implementing an efficient and user-friendly project creation process directly supports the project goal of enhancing productivity and streamlining workflow management. By allowing users to quickly set up new projects with all necessary details, ish enables them to organize their work more effectively from the outset. This feature contributes to the overall intuitive design of the application, reducing the time and effort required to start new projecrs. Furthermore, by immediately switching to the new project context upon creation, we ensure that users can begin their work without delay, thus improving overall efficiency and user satisfaction.

### [EPIC] Backlog

Develop basic backlog page functionality that enables CRUD operations for the relevant data models.

#### [USER STORY] Epic Card View

**Description**: Implement functionality to display epics as interactive cards on the backlog page.

**User Story**: As a user, I want to see epics displayed as visually distinct cards on the backlog page, so that I can quickly understand and manage the high-level structure of my project.

**Acceptance Criteria**:

- On the backlog page, an epic card component is rendered for each epic in the project.
- Each epic card prominently displays the epic's title, description (truncated if necessary), status, and priority.
- Epic cards are interactive, allowing users to click or tap to view more details or edit the epic.
- The cards are responsive and display well on both desktop and mobile devices.
- A distinct card or section is provided for items (e.g., user stories or tasks) that are not associated with any epic.
- Skeletons are shown while epics are loading.
- The page implements efficient loading and rendering to handle projects with a large number of epics.

**Relation to Project Goal**:
Implementing an intuitive epic card view directly supports the project's goal of enhancing productivity and streamlining workflow management. By providing a clear, visual representation of epics, users can quickly grasp the structure and progress of their projects. This feature contributes to the overall user-friendly interface, allowing for more efficient project navigation and management. The ability to see all epics at a glance, including their key details, enables users to make informed decisions about project priorities and resource allocation, thus improving overall project organization and collaboration.

#### [USER STORY] Epic Creation

**Description**: Implement a robust and user-friendly functionality for creating new epics within the application.

**User Story**: As a user, I want to be able to create a new epic easily and efficiently, so that I can quickly start organizing high-level project objectives and track progress towards major milestones.

**Acceptance Criteria**:

- A clearly labeled "Epic" creation button is prominently displayed in the create dropdown menu.
- Clicking this button opens a modal dialog with a comprehensive epic creation form.
- The form includes all necessary fields for epic creation, such as title, description, status, priority, etc.
- Client-side validation is implemented for all form fields to ensure data integrity.
- Clear, user-friendly error messages are displayed next to the relevant fields if validation fails.
- Upon successful client-side validation, a POST request is made to the server to create the epic.
- If server-side errors occur during epic creation, clear and specific error messages are displayed to the user.
- The user is given the option to correct the errors and resubmit the form without losing previously entered data.
- Upon successful epic creation, a confirmation notification is shown to the user.
- The creation modal is automatically closed after successful creation.
- The backlog page is immediately updated to include the newly created epic, with the new epic card visible and properly positioned.
- The form and modal are responsive, providing a consistent experience across desktop and mobile devices.

**Relation to Project Goal**: Implementing an efficient and user-friendly epic creation process directly supports the project's goal of enhancing productivity and streamlining workflow management. By allowing users to quickly set up new epics with all necessary details, ish enables them to organize their work more effectively at a high level. This feature contributes to the overall intuitive design of the application, reducing the time and effort required to start new major project initiatives. Furthermore, by immediately updating the backlog with the new epic, we ensure that users can begin planning and working withour delay, thus improving overall project structure, visibility, and productivity.

#### [USER STORY] Epic Editing

**Description**: Implement functionality to edit and update epic details within the application.

**User Story**: As a user, I want to be able to edit the details of an existing epic, so that I can keep the epic information up-to-date and accurately reflect changes in project scope or priorities.

**Acceptance Criteria**:

- An "Edit" button or icon is clearly visible and accessible on all epic cards.
- Clicking the edit button opens a modal dialog containing a pre-populated form with the current epic details.
- The edit form includes all editable fields for the epic, such as title, description, status, priority, etc.
- All form fields have appropriate client-side validation to ensure data integrity.
- Clear, user-friendly error messages are displayed if validation fails.
- When the "Update" button is clicked, all data is pre-validated on the client side before submission.
- If pre-validation passes, a PATCH request is made to the server to update the epic.
- Any server-side errors are clearly communicated to the user with specific error messages.
- The user is given the option to correct errors and resubmit without losing their changes.
- Upon successful update, a confirmation message is displayed to the user.
- The edit modal automatically closes after a successful update.
- The epic card and any related views are immediately refreshed to reflect the updated information.
- The edit form and modal are responsive, providing a consistent experience across desktop and mobile devices.

**Relation to Project Goal**: Implementing a robust epic editing functionality directly supports the project's goal of enhancing productivity and streamlining workflow management. By allowing users to easily update epic details, ish ensures that project information remains accurate and up-to-date. This feature contributes to the overall flexibility and adaptability of the application, enabling users to respond quickly to changes in project scope or priorities. The ability to maintain current and accurate epic information improves project visibility, facilitates better decision-making, and ultimately enhances team collaboration and productivity.

#### [USER STORY] Epic Deletion

**Description**: Implement functionality to safely and efficiently delete epics from the project management system.

**User Story**: As a userd, I want to be able to delete epics that are no longer relevant or needed, so that I can maintain a clean and organized project structure, ensuring that only active and necessary epics are visible to myself (and team).

**Acceptance Criteria**:

- Each epic card displays a clearly visible and accessible delete button or icon.
- Clicking the delete button triggers a confirmation dialog to prevent accidental deletions.
- The confirmation dialog clearly states the consequences of deleting the epic, including any associated tasks or stories.
- Upon user confirmation, a DELETE request is sent to the server to remove the epic.
- On successful deletion, a success notification is shown, and the confirmation dialog is automatically closed.
- If the deletion fails, a specific error message is displayed, explaining the reason for the failure
- After successful deletion, the epic data is immediately refreshed, and the deleted epic is removed from all relevant views
- The system ensures that all child items (stories, tasks) associated with the deleted epic are deleted..

**Relation to Project Goal**: Implementing a robust epic deletion feature directly supports the project's goal of enhancing productivity and streamlining workflow management. By allowing users to remove obsolete or unnecessary epics, this functionality helps maintain a clean and focused project structure. This contributes to improved organization, reduced clutter, and enhanced visibility of active and relevant work items. Ultimately, this feature empowers teams to keep their project management system up-to-date and aligned with current objectives, facilitating better decision-making and productivity.

#### [USER STORY] Item Table View

**Description**: Implement a comprehensive table view for items within each epic card, enhancing visibility and interaction capabilities.

**User Story**: As a user, I want to see all items in an epic displayed in a clear, organized table within the epic card, so that I can easily review the work that needs to be done and efficiently interact with individual items.

**Acceptance Criteria**:

- Each epic card contains a well-structured table displaying all associated items.
- The table includes columns for key item attributes such as ID, title, status, priority and due date.
- The table view is responsive and adapts well to different screen sizes.
- The table updates in real-time when items are added, modified, or removed from the epic.

**Relation to Project Goal**: Implementing a detailed and interactive table view for items within epics directly supports the project's goal of enhancing productivity and streamlining workflow management. By providing users with a clear, organized view of all items within an epic, this feature significantly improves project visibility and facilitates quicker decision-making. The ability to easily sort, search, and interact with items enables users to manage their work more efficiently, leading to improved task prioritization and resource allocation. This enhanced overview of epic contents contributes to better project structure, more effective progress tracking, and ultimately, increased productivity.

### [EPIC] Filtration & Sorting

#### [USER STORY] Item Type Filtering in Table View

**Description**: Implement functionality to allow users to filter items in the item table by their type, enhancing the ability to focus on specific categories of work.

**User Story**: As a user, I want to filter items by type in the table view so that I can focus on items with the type that is most relevant to my current needs, improving my productivity and task management.

**Acceptance Criteria**:

- A "Filter" dropdown menu is prominently displayed above in the backlog page toolbar.
- Within the "Filter" dropdown, there is a submenu specifically for "Item Type".
- The "Item Type" submenu contains checkboxes for each available item type (e.g., Task, Bug, User Story, etc.).
- The initial state of the checkboxes reflects the current project filter options.
- Selecting or deselecting a type checkbox immediately updates the visual state of the checkbox.
- When a type is deselected, the table view is instantly refreshed, hiding all items of that type.
- When a type is selected, the table view is instantly refreshed, displaying all items of that type.
- Multiple types can be selected or deselected simultaneously.
- The table view updates in real-time as types are selected or deselected.
- The selected filter options persist across user sessions until manually changed.
- The filter state is visually indicated when active

**Relation to Project Goal**: Implementing item type filtering in the table view directly supports the project's goal of enhancing productivity and streamlining workflow management. By allowing users to quickly focus on specific types of items, this feature significantly improves task prioritization and information accessibility. Users can more efficiently manage their workload by concentrating on relevant item types, leading to better time management and increased productivity. This granular control over item visibility contributes to a more organized and tailored project view, ultimately supporting more effective decision-making and project progression.

#### [USER STORY] Item Status Filtering in Table View

**Description**: Implement functionality to allow users to filter items in the item table by their status, enhancing the ability to focus on specific stages of work.

**User Story**: As a user, I want to filter items by status in the table view so that I can focus on items with the status that is most relevant to my current needs, improving my productivity and task management.

**Acceptance Criteria**:

- A "Filter" dropdown menu is prominently displayed in the backlog page toolbar.
- Within the "Filter" dropdown, there is a submenu specifically for "Item Status".
- The "Item Status" submenu contains checkboxes for each available status (e.g., To Do, In Progress, Review, Done, etc.).
- The initial state of the checkboxes reflects the current project filter options.
- Selecting or deselecting a status checkbox immediately updates the visual state of the checkbox.
- When a status is deselected, the table view is instantly refreshed, hiding all items with that status.
- When a status is selected, the table view is instantly refreshed, displaying all items with that status.
- Multiple statuses can be selected or deselected simultaneously.
- The table view updates in real-time as statuses are selected or deselected.
- The selected filter options persist across user sessions until manually changed.
- The filter state is visually indicated when active

**Relation to Project Goal**: Implementing item status filtering in the table view directly supports the project's goal of enhancing productivity and streamlining workflow management. By allowing users to quickly focus on items in specific stages of completion, this feature significantly improves task prioritization and workflow visibility. Users can more efficiently manage their workload by concentrating on items in relevant statuses, leading to better progress tracking and increased productivity. This granular control over item visibility based on status contributes to a more organized and tailored project view, ultimately supporting more effective decision-making, resource allocation, and project progression.

#### [USER STORY] Item Priority Filtering in Table View

**Description**: Implement functionality to allow users to filter items in the item table by their priority, enhancing the ability to focus on tasks of varying importance.

**User Story**: As a user, I want to filter items by priority in the table view so that I can focus on items with the priority level that is most relevant to my current needs, improving my productivity and task management.

**Acceptance Criteria**:

- A "Filter" dropdown menu is prominently displayed in the backlog page toolbar.
- Within the "Filter" dropdown, there is a submenu specifically for "Item Priority".
- The "Item Priority" submenu contains checkboxes for each available priority level
- The initial state of the checkboxes reflects the current project filter options.
- Selecting or deselecting a priority checkbox immediately updates the visual state of the checkbox.
- When a priority is deselected, the table view is instantly refreshed, hiding all items with that priority.
- When a priority is selected, the table view is instantly refreshed, displaying all items with that priority.
- Multiple priority levels can be selected or deselected simultaneously.
- The table view updates in real-time as priorities are selected or deselected.
- The selected filter options persist across user sessions until manually changed.
- The filter state is visually indicated when active

**Relation to Project Goal**: Implementing item priority filtering in the table view directly supports the project's goal of enhancing productivity and streamlining workflow management. By allowing users to quickly focus on items of specific priority levels, this feature significantly improves task prioritization and resource allocation. Users can more efficiently manage their workload by concentrating on high-priority items when needed or addressing lower-priority tasks during less critical periods. This granular control over item visibility based on priority contributes to a more strategic approach to project management, enabling teams to address the most critical tasks first and manage their time more effectively.

#### [USER STORY] Sprint Filtering in Backlog View

**Description**: Implement functionality to allow users to filter epics and items by sprint in the backlog view, enhancing the ability to focus on specific time-boxed work periods.

**User Story**: As a user, I want to filter epics and items by sprint in the backlog view so that I can focus on the relevant sprint, improving my sprint planning and execution.

**Acceptance Criteria**:

- A "Select Sprint" dropdown is prominently displayed in the backlog view toolbar.
- The dropdown is populated with all sprints in the project, including both active and completed sprints.
- Each sprint item in the dropdown displays the sprint name and its date range (e.g., "Sprint 1 (May 1 - May 14)").
- The initial state of the dropdown shows "All Sprints" or a similar label to indicate no filter is applied.
- Selecting a sprint from the dropdown immediately updates the filter data.
- When the filter data is updated, the backlog view is instantly refreshed to show only epics and items associated with the selected sprint.
- An option to clear the sprint filter and show all items is available.
- The selected sprint filter persists across user sessions until manually changed.

**Relation to Project Goal**: Implementing sprint filtering in the backlog view directly supports the project's goal of enhancing productivity and streamlining workflow management. By allowing users to focus on epics and items within a specific sprint, this feature significantly improves sprint planning, execution, and review processes. Users can more efficiently manage their workload by concentrating on the current or upcoming sprint, leading to better time management and increased productivity. This targeted view of sprint-specific work contributes to more effective decision-making, resource allocation, and overall project progression, ultimately supporting agile methodologies and improving productivity.

#### [USER STORY] Hide Empty Epics in Backlog View

**Description**: Implement functionality to allow users to hide epics with no associated items in the backlog view, enhancing the organization and visualization of project data.

**User Story**: As a user, I want to be able to hide epics that have no items associated with them in the backlog view, so that I can better organize and visualize my project data, focusing on active and relevant work.

**Acceptance Criteria**:

- A "Hide Empty Epics" toggle switch is prominently displayed in the backlog view toolbar.
- The initial state of the toggle is "off" (empty epics are visible by default).
- Clicking the toggle switch immediately updates its visual state (on/off).
- When the toggle is switched on Epics with no associated items are instantly hidden from the backlog view.
- The view is refreshed to reflect this change without requiring a page reload.
- When the toggle is switched offAll epics, including those with no items, are displayed in the backlog view.
- The state of the toggle persists across user sessions until manually changed.

**Relation to Project Goal**: Implementing the ability to hide empty epics in the backlog view directly supports the project's goal of enhancing productivity and streamlining workflow management. By allowing users to focus on epics that contain active work items, this feature significantly improves the organization and clarity of the project backlog. Users can more efficiently manage their workload by reducing visual clutter and concentrating on relevant, actionable epics. This targeted view contributes to more effective sprint planning, resource allocation, and overall project progression. Additionally, it supports agile methodologies by helping teams maintain a clean and focused backlog, ultimately improving productivity and decision-making processes.

### [EPIC] Item CRUD

CRUD functionality for items in item tables.

#### [USER STORY] Item Detailed View

**Description**: Implement functionality to allow users to open an expanded, detailed view of an item with all its fields for comprehensive viewing and editing.

**User Story**: As a user, I want to view an item in detail on its own dedicated screen so that I can focus on that specific item, examine all its attributes, and easily edit its data when necessary.

**Acceptance Criteria**:

- Each item row in the item table has a clearly visible and accessible "View Details" button or icon.
- Clicking this button opens a modal dialog showing a comprehensive form with all item data fields.
- The detailed view includes all relevant item information, such as title, description, status, priority, assigned sprint, related epic, etc.
- All fields are accurately populated with the current data for the item being viewed.
- Each field is presented using the appropriate input type (e.g., text fields, dropdowns, date pickers) based on the nature of the data it represents.
- The detailed view provides options to edit the item's information directly from this screen.
- The detailed view includes a "Close" or "Back" option to return.
- The UI is responsive and maintains a consistent, user-friendly design across different device sizes.

**Relation to Project Goal**: Implementing a detailed item view directly supports the project's goal of enhancing productivity and streamlining workflow management. By providing users with a comprehensive, focused view of individual items, this feature significantly improves the ability to review, update, and manage task details efficiently. This granular access to item information enables more informed decision-making, facilitates accurate updates, and supports thorough project tracking. The ability to quickly access and modify item details contributes to maintaining an up-to-date and well-organized project backlog, ultimately supporting agile methodologies and improving overall project management effectiveness.

#### [USER STORY] Item Delete

**Description**: Implement functionality to allow users to delete items from the project backlog efficiently and safely.

**User Story**: As a user, I want to be able to delete items from the backlog that are no longer relevant or needed, so that I can maintain a clean and up-to-date project overview.

**Acceptance Criteria**:

- Each item row in the item table has a clearly visible and accessible delete button or icon.
- Clicking the delete button prompts a confirmation dialog to prevent accidental deletions.
- The confirmation dialog clearly states the consequences of deleting the item and asks for user confirmation.
- Upon confirmation, a DELETE request is sent to the server to remove the item.
- If the deletion fails, an error notification is displayed to the user with a clear explanation of the issue.
- On successful deletion, a success message is briefly shown to the user.
- After successful deletion, the item table is automatically refreshed to reflect the changes without requiring a page reload.

**Relation to Project Goal**: Implementing a robust item deletion feature directly supports the project's goal of streamlining workflow management and enhancing productivity. By allowing users to efficiently remove obsolete or unnecessary items, this feature helps maintain a clean, relevant, and manageable backlog. This contributes to improved focus on active and important tasks, reduces clutter, and supports agile methodologies by ensuring the backlog remains a dynamic and accurate reflection of current project needs. The careful implementation with confirmation dialogs and clear feedback also aligns with the project's aim to provide a user-friendly and error-resistant interface, ultimately leading to more effective project management and increased productivity.

#### [USER STORY] Edit Item Epic

**Description**: Implement functionality to allow users to modify an item's associated epic.

**User Story**: As a user, I want to be able to change an item's associated epic so that I can maintain accurate project organization and adapt to evolving project structures.

**Acceptance Criteria**:

- The item detail form includes a clearly labeled dropdown field for selecting an epic.
- The epic dropdown is populated with all available epics in the project.
- When a new epic is selected, a PATCH request is automatically sent to update the item's epic association.
- Upon successful update a success notification is displayed to the user.
- The epic field in the form is updated to reflect the new selection.
- The item is visually moved from its original epic's item table to the new epic's item table in the backlog view.
- If the update fails an error notification is shown with a clear explanation of the issue.
- If the update fails the epic field reverts to its original value.

**Relation to Project Goals**: This feature directly supports the project's aim of streamlining workflow management and enhancing productivity. By allowing users to easily reassign items to different epics, it facilitates dynamic project organization, enabling teams to adapt quickly to changing priorities or project structures. This flexibility is crucial for maintaining an up-to-date and relevant backlog, which is essential for effective agile project management. The seamless update process, with its immediate visual feedback, contributes to a more intuitive and efficient user experience, ultimately leading to improved project oversight and productivity.

#### [USER STORY] Edit Item Priority

**Description**: Implement functionality to allow users to modify an item's priority level efficiently within the item view.

**User Story**: As a user, I want to be able to update an item's priority level quickly and easily, so that I can accurately reflect changing project needs and maintain an up-to-date backlog.

**Acceptance Criteria**:

- The item detail view includes a clearly labeled dropdown menu for selecting priority levels.
- The priority dropdown is populated with all available priority levels (Optional, Beneficial, Essential & Critical).
- When a new priority is selected, a PATCH request is automatically sent to update the item's priority.
- Upon successful update, a success notification is displayed to the user.
- The priority field in the form is immediately updated to reflect the new selection.
- The item's priority in the backlog view is visually updated without requiring a page reload.
- If the update fails, an error notification is shown with a clear explanation of the issue.
- In case of failure, the priority field reverts to its original value.

**Relation to Project Goals**: This feature directly supports the project's aim of streamlining workflow management and enhancing productivity. By allowing users to quickly adjust item priorities, it enables teams to respond dynamically to changing project demands. This flexibility is crucial for maintaining an accurate and relevant backlog, which is essential for effective agile project management. The seamless update process, with its immediate visual feedback, contributes to a more intuitive and efficient user experience, ultimately leading to improved project oversight, better resource allocation, and increased overall productivity.

#### [USER STORY] Edit Item Status

**Description**: Implement functionality to allow users to modify an item's status efficiently within the item detail view.

**User Story**: As a user, I want to be able to update an item's status quickly and easily, so that I can accurately reflect the current progress of tasks and maintain an up-to-date project overview.

**Acceptance Criteria**:

- The item detail view includes a clearly labeled dropdown menu for selecting status options.
- The status dropdown is populated with all available status options (To Do, In Progress, Review, Done).
- When a new status is selected, a PATCH request is automatically sent to update the item's status.
- Upon successful update, a success notification is displayed to the user.
- The status field in the form is immediately updated to reflect the new selection.
- The item's status in the backlog view is visually updated without requiring a page reload.
- If the update fails, an error notification is shown with a clear explanation of the issue.
- In case of failure, the status field reverts to its original value.

**Relation to Project Goals**: This feature directly supports the project's aim of streamlining workflow management and enhancing productivity. By allowing users to quickly update item statuses, it enables teams to maintain an accurate and real-time view of project progress. This functionality is crucial for effective agile project management, as it facilitates transparency, improves communication, and helps in identifying bottlenecks or delays promptly. The seamless update process, with its immediate visual feedback, contributes to a more intuitive and efficient user experience, ultimately leading to improved project oversight, better task management, and increased overall productivity.

#### [USER STORY] Edit Item Due Date

**Description**: Implement functionality to allow users to modify an item's due date efficiently within the item detail view.

**User Story**: As a user, I want to be able to update an item's due date quickly and easily, so that I can accurately reflect changing deadlines and maintain an up-to-date project timeline.

**Acceptance Criteria**:

- The item detail view includes a clearly labeled date picker component for selecting the due date.
- The date picker is pre-populated with the item's current due date if one exists.
- When a new date is selected, the date is correctly formatted according to project standards.
- Upon date selection, a PATCH request is automatically sent to update the item's due date.
- Upon successful update, a success notification is displayed to the user.
- The due date field in the form is immediately updated to reflect the new selection.
- The item's due date in the backlog view is visually updated without requiring a page reload.
- If the update fails, an error notification is shown with a clear explanation of the issue.
- In case of failure, the due date field reverts to its original value.

**Relation to Project Goals**: This feature directly supports the project's aim of streamlining workflow management and enhancing productivity. By allowing users to easily update item due dates, it enables teams to maintain an accurate and up-to-date project timeline. This functionality is crucial for effective project management, as it helps in prioritizing tasks, managing resources, and meeting deadlines. The seamless update process, with its immediate visual feedback, contributes to a more intuitive and efficient user experience, ultimately leading to improved project oversight, better time management, and increased overall productivity.

#### [USER STORY] Edit Item Sprint

**Description**: Implement functionality to allow users to modify an item's assigned sprint efficiently within the item detail view.

**User Story**: As a user, I want to be able to update an item's sprint assignment quickly and easily, so that I can effectively manage the project's timeline and resource allocation across sprints.

**Acceptance Criteria**:

- The item detail view includes a clearly labeled dropdown component for selecting the sprint.
- The sprint dropdown is populated with all available sprints in the project.
- The dropdown's default value is set to the item's current sprint if one is assigned.
- When a new sprint is selected, a PATCH request is automatically sent to update the item's sprint assignment.
- Upon successful update, a success notification is displayed to the user.
- The sprint field in the form is immediately updated to reflect the new selection.
- The item's sprint assignment in the backlog view is visually updated without requiring a page reload.
- If the update fails, an error notification is shown with a clear explanation of the issue.
- In case of failure, the sprint field reverts to its original value.

**Relation to Project Goals**: This feature directly supports the project's aim of providing a streamlined and efficient project management tool. By allowing users to easily reassign items to different sprints, it enhances the flexibility of project planning and facilitates agile methodologies. This functionality is crucial for maintaining an up-to-date and accurate project timeline, enabling teams to adapt quickly to changing priorities or resource constraints. The seamless update process, with its immediate visual feedback across different views, contributes to a more intuitive and efficient user experience. This aligns with the project's goal of offering a minimalistic yet powerful tool that enhances productivity and simplifies project management processes.

#### [USER STORY] Edit Item Description

**Description**: Implement functionality to allow users to edit an item's description efficiently within the item detail view.

**User Story**: As a user, I want to be able to edit an item's description easily, so that I can provide and maintain accurate and up-to-date information about the item.

**Acceptance Criteria**:

- The item detail view displays a text area for the item's description.
- The text area is pre-populated with the current description if one exists.
- By default, the description field is in read-only mode.
- An "Edit" button is clearly visible near the description field.
- Clicking the "Edit" button makes the description field editable and changes the button to "Save".
- While editing, users can modify the existing text or add new content.
- Clicking the "Save" button triggers a PATCH request to update the item's description.
- Upon successful update:
  - A success notification is displayed to the user.
  - The description field returns to read-only mode.
  - The "Save" button changes back to "Edit".
- If the update fails:
  - An error notification is shown with a clear explanation.
  - The description field remains editable.
  - The user can retry saving or cancel the edit.

**Relation to Project Goals**: This feature directly supports the project's aim of providing a streamlined and efficient project management tool. By allowing users to easily view and update item descriptions, it enhances communication and clarity within the project. This functionality is crucial for maintaining detailed and accurate information about tasks, which is essential for effective collaboration and project execution. The intuitive edit-save process, with its immediate feedback, contributes to a user-friendly experience that aligns with ish's goal of offering a minimalistic yet powerful tool. This feature enhances overall productivity by ensuring that all team members have access to up-to-date and comprehensive item information, facilitating better decision-making and task management.

#### [USER STORY] Edit Item User Story

**Description**: Implement functionality to allow users to edit and update an item's user story efficiently within the item detail view.

**User Story**: As a user, I want to be able to edit an item's user story easily, so that I can provide and maintain accurate and up-to-date information about the user story.

**Acceptance Criteria**:

- The item detail view includes a text field for the user story.
- The text field is pre-populated with the item's current user story if one exists.
- By default, the user story field is in read-only mode.
- An "Edit" button is clearly visible near the user story field.
- Clicking the "Edit" button makes the user story field editable and changes the button to "Save".
- While editing, users can modify the existing text or add new content.
- Clicking the "Save" button triggers a PATCH request to update the item's user story.
- Upon successful update:
  - A success notification is displayed to the user.
  - The user story field returns to read-only mode.
  - The "Save" button changes back to "Edit".
- If the update fails:
  - An error notification is shown with a clear explanation.
  - The user story field remains editable.

**Relation to Project Goals**: This feature directly supports the project's aim of providing a streamlined and efficient project management tool. By allowing users to easily view and update user stories, it enhances communication and clarity within the project. This functionality is crucial for maintaining detailed and accurate information about tasks, which is essential for effective collaboration and project execution. The intuitive edit-save process, with its immediate feedback, contributes to a user-friendly experience that aligns with ish's goal of offering a minimalistic yet powerful tool. This feature enhances overall productivity by ensuring that all team members have access to up-to-date and comprehensive user story information, facilitating better decision-making and task management.

#### [USER STORY] Add Item Subtasks

**Description**: Implement functionality to allow users to add and view subtasks within an item.

**User Story**: As a user, I want to be able to add and view subtasks for an item, so that I can break down tasks into smaller, manageable parts and track their progress.

**Acceptance Criteria**:

- The item detail view includes a container that lists all existing subtasks, if any.
- Each subtask is displayed as a checkbox and a read-only text field.
- The text field is populated with the subtask title.
- The subtask container has an "Add" button.
- Clicking the "Add" button generates a new blank subtask item.
- Focus is automatically set to the new subtask item's text field.
- The new subtask item's text field includes a "Save" button.
- Clicking the "Save" button sends a PATCH request to the server with an updated JSON object that includes the new subtask.
- Upon successful request:
  - The "Save" button disappears and is replaced by "Edit" and "Delete" buttons.
  - A success notification is displayed to the user.
- If the request fails:
  - An error notification is shown with a clear explanation.
  - The subtask item remains editable.

**Relation to Project Goals**: This feature supports the project's goal of providing a streamlined and efficient project management tool. By allowing users to add and manage subtasks, it enhances task organization and tracking, which is essential for effective project execution. This functionality aligns with ish's aim of offering a minimalistic yet powerful tool, improving overall productivity by enabling users to break down tasks into smaller, manageable parts and track their progress efficiently.

#### [USER STORY] Edit Item Subtasks

**Description**: Implement functionality to allow users to edit subtasks within an item.

**User Story**: As a user, I want to be able to edit subtasks within an item so that I can update and maintain accurate information about the subtasks.

**Acceptance Criteria**:

- Each subtask item includes an edit button within the text field.
- The edit button is hidden by default and becomes visible when hovering over the subtask item.
- The subtask item text field is read-only by default.
- Clicking the edit button makes the text field editable.
- When the edit button is clicked, it is replaced with a save button.
- Clicking the save button sends a PATCH request to the server with the updated subtasks JSON object.
- Upon successful update:
  - A success notification is displayed to the user.
  - The text field becomes read-only again.
  - The save button is replaced by the edit button.
- If the update fails:
  - An error notification is shown to the user with a clear explanation.
  - The text field remains in its editable state.

**Relation to Project Goals**: This feature directly supports the project's goal of providing a streamlined and efficient project management tool. By allowing users to easily edit subtasks, it enhances task management and ensures that all information remains accurate and up-to-date. This functionality is crucial for maintaining detailed and organized task information, which is essential for effective project execution and collaboration. The intuitive edit-save process, with immediate feedback, aligns with ish's goal of offering a minimalistic yet powerful tool, ultimately improving overall productivity and task management efficiency.

#### [USER STORY] Delete Item Subtasks

**Description**: Implement functionality to allow users to delete subtasks within an item.

**User Story**: As a user, I want to be able to delete subtasks within an item so that I can remove tasks that are no longer needed or relevant.

**Acceptance Criteria**:

- Each subtask item includes a delete button within the text field.
- The delete button is hidden by default and becomes visible when hovering over the subtask item.
- Clicking the delete button removes the subtask item from the JSON and makes a PATCH request to the server with the updated JSON object.
- Upon successful update:
  - A success notification is shown to the user.
  - The subtask item is removed from the list.
- If the update fails:
  - An error notification is shown to the user with a clear explanation.
  - The subtask item remains in the list.

**Relation to Project Goals**: This feature supports the project's goal of providing a streamlined and efficient project management tool. By allowing users to delete subtasks, it enhances task management and ensures that only relevant tasks are tracked. This functionality aligns with ish's aim of offering a minimalistic yet powerful tool, improving overall productivity by enabling users to maintain an organized and up-to-date task list.

#### [USER STORY] Toggle Subtask Done Status

**Description**: Implement functionality to toggle the done status of subtasks within an item.

**User Story**: As a user, I want to be able to mark subtasks as done or not done so that I can easily track the progress of my tasks.

**Acceptance Criteria**:

- Each subtask item includes a checkbox.
- The checked/unchecked state of the checkbox corresponds to the `done` property in the subtask JSON object.
- When a subtask item is marked as done, the text in the text field is displayed with a strikethrough and greyed out.
- Clicking the checkbox toggles the `done` property in the subtask JSON object and sends a PATCH request to the server with the updated JSON object.
- The text of the subtask item updates to reflect the done status (original for not done, strikethrough and greyed out for done) when the checkbox is clicked.
- Upon successful update:
  - A success notification is displayed to the user.
- If the update fails:
  - An error notification is shown to the user.

**Relation to Project Goals**: This feature supports the project's goal of providing a streamlined and efficient project management tool. By allowing users to easily mark subtasks as done or not done, it enhances task tracking and organization. This functionality aligns with ish's aim of offering a minimalistic yet powerful tool, improving overall productivity by enabling users to visually track the completion status of their tasks.

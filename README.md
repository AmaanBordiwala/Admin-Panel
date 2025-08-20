# Admin Panel Project

This project is an admin panel built with Next.js, React, and TypeScript. It features a protected route, theme switching (light/dark mode), and form management with Formik and Yup.

## Folder Structure

```
D:\wizcoder_project\admin_panel - Copy\
├───.gitignore
├───components.json
├───eslint.config.mjs
├───next.config.ts
├───package-lock.json
├───package.json
├───postcss.config.mjs
├───README.md
├───tsconfig.json
├───.git\...
├───.next\
│   ├───cache\...
│   ├───server\...
│   ├───static\...
│   └───types\...
├───node_modules\...
├───public\
│   ├───file.svg
│   ├───globe.svg
│   ├───next.svg
│   ├───vercel.svg
│   └───window.svg
└───src\
    ├───app\
    │   ├───favicon.ico
    │   ├───globals.css
    │   ├───layout.tsx
    │   ├───(admin)
    │   │   ├───layout.tsx
    │   │   ├───page.tsx
    │   │   ├───analytics\
    │   │   │   └───page.tsx
    │   │   └───settings\
    │   │       └───page.tsx
    │   └───login\
    │       └───page.tsx
    ├───components\
    │   ├───ContentSidebar.tsx
    │   ├───Header.tsx
    │   ├───IconSidebar.tsx
    │   ├───InputField.tsx
    │   ├───DomainInitializer.tsx
    │   └───ui\
    │       └───dropdown-menu.tsx
    ├───lib\
    │   └───utils.ts
    ├───types\
    │   ├───index.ts
    │   └───menuConfig.tsx
    └───context\
        ├───AuthContext.tsx
        └───ThemeContext.tsx
```

## Key Components

### `src/app/layout.tsx`
**Definition:** This is the root layout of the Next.js application. It defines the basic HTML structure and wraps the entire application with global providers.
**Usage:** It imports and uses `ThemeProvider` and `AuthProvider` to provide theme and authentication context to all child components.

### `src/app/(admin)/layout.tsx`
**Definition:** This is the layout for the admin section of the application. It acts as a protected route.
**Usage:** It uses the `useAuth` hook to check authentication status and redirects unauthenticated users to the login page. It also integrates `IconSidebar`, `ContentSidebar`, and `Header` components.

### `src/app/login/page.tsx`
**Definition:** The login page component.
**Usage:** It uses Formik and Yup for form management and validation. It includes `InputField` for reusable input fields and `DomainInitializer` to pre-fill the domain from URL query parameters. It also uses `useTheme` for theme toggling and `useAuth` to log in users.

### `src/app/(admin)/analytics/page.tsx`
**Definition:** A placeholder page for the analytics section within the admin layout.
**Usage:** This page is rendered when the user navigates to `/analytics` after authentication.

### `src/app/(admin)/settings/page.tsx`
**Definition:** A placeholder page for the settings section within the admin layout.
**Usage:** This page is rendered when the user navigates to `/settings` after authentication.

### `src/components/Header.tsx`
**Definition:** The header component displayed across the admin section.
**Usage:** It displays a dashboard title, a user dropdown menu with a logout option, and a theme toggle icon. It uses `useTheme` to change its colors based on the current theme and `useAuth` for logout functionality.

### `src/components/IconSidebar.tsx`
**Definition:** The icon-only sidebar component.
**Usage:** It displays a list of icons representing different menu categories. On hover, it shows the `ContentSidebar`, and on click, it pins/unpins the `ContentSidebar`. It uses `useSidebarStore` to manage sidebar state and `useTheme` for theme-dependent styling.

### `src/components/ContentSidebar.tsx`
**Definition:** The content sidebar component that displays detailed menu items.
**Usage:** It shows a list of links based on the active menu from `IconSidebar`. Its visibility and animation are controlled by `useSidebarStore`. It uses `useTheme` for theme-dependent styling.

### `src/components/InputField.tsx`
**Definition:** A reusable input field component for forms.
**Usage:** It integrates with Formik's `Field` and `ErrorMessage` components, providing consistent styling, labels, placeholders, and optional password visibility toggling. Used in `login/page.tsx`.

### `src/components/DomainInitializer.tsx`
**Definition:** A helper component to initialize the domain input field from URL query parameters.
**Usage:** It uses `useSearchParams` and `useFormikContext` to set the 'Domain' field value in Formik when the component mounts. Used in `login/page.tsx`.

### `src/context/ThemeContext.tsx`
**Definition:** React Context for managing the application's theme (light/dark mode).
**Usage:** Provides `theme`, `toggleTheme`, `primaryColor`, and `secondaryColor` to any component that consumes it via the `useTheme` hook. It persists the theme preference in `localStorage`.

### `src/context/AuthContext.tsx`
**Definition:** React Context for managing user authentication state.
**Usage:** Provides `isAuthenticated`, `login`, and `logout` functions to any component that consumes it via the `useAuth` hook. It simulates authentication by storing a flag in `localStorage`.

### `src/lib/store.ts`
**Definition:** A Zustand store for managing the state of the sidebars (visibility and pinned status).
**Usage:** Provides `isContentSidebarVisible`, `isPinned`, `setContentSidebarVisibility`, and `setIsPinned` to components like `IconSidebar` and `ContentSidebar`.

### `src/lib/utils.ts`
**Definition:** A utility file for common helper functions.
**Usage:** (Details not provided in context, but typically contains general utility functions).

### `src/types/index.ts` and `src/types/menuConfig.tsx`
**Definition:** TypeScript type definition files.
**Usage:** Define interfaces and types used across the application, such as `MenuId` and `menuConfig` for sidebar navigation.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd admin_panel - Copy
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Application

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
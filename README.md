[English](README.md) | [中文](README_zh.md)

# QuizPlatform

QuizPlatform is a web-based quiz application built with Angular. It allows users to take quizzes, view results, and provides a modular structure for extending quiz features. The project is organized for scalability and maintainability.

## Project Structure

The main application code is located in `src/app`:

```
src/app/
├── app.component.*        # Root component (HTML, SCSS, TS, spec)
├── app.module.ts          # Main Angular module
├── app.config.*           # App configuration files
├── app.routes.*           # App routing configuration
├── components/            # Feature and UI components
│   ├── header/            # Header (navigation)
│   ├── home/              # Home/landing page
│   ├── quiz/              # Quiz interface (taking quizzes)
│   └── quiz-results/      # Quiz results display
├── models/                # TypeScript interfaces and models
├── services/              # Application services (e.g., data, quiz logic)
```

### Main Components
- **Header**: Displays the navigation bar.
- **Home**: Welcome page, introduction, and navigation entry point.
- **Quiz**: Handles quiz questions, user input, and quiz flow.
- **Quiz Results**: Shows user performance and results after a quiz.

### Extending the App
- **Add a new component:**
  ```bash
  ng generate component components/new-component
  ```
- **Add a new service:**
  ```bash
  ng generate service services/new-service
  ```
- **Add models:** Place TypeScript interfaces in `models/` for type safety.

## Development

To start a local development server, run:

```bash
ng serve
```

Open your browser at `http://localhost:4200/`.

## Building

To build the project:

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

## Testing

- **Unit tests:**
  ```bash
  ng test
  ```
- **End-to-end (e2e) tests:**
  ```bash
  ng e2e
  ```
  (Configure your preferred e2e framework if needed.)

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Official Documentation](https://angular.dev/)

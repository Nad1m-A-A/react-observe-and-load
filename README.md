# React Observe and Load

React Higher-Order Component (HOC) that tracks a UI element's visibility and dynamically fetches data, loads an image, or triggers animations.

[![GitHub](https://img.shields.io/badge/GitHub-View%20on%20GitHub-blue?logo=github)](https://github.com/Nad1m-A-A/react-observe-and-load)
[![Demo](https://img.shields.io/badge/Demo-View%20Demo-green?logo=react)](https://github.com/Nad1m-A-A/English-LandingPage)

## Features

- 🔍 Intersection Observer integration
- 🎨 Animation triggers on visibility
- 📦 Lazy loading of data
- 🌳 Tree-shakeable exports
- ⚡ Optimized bundle size

## Installation

```bash
npm install react-observe-and-load
# or
yarn add react-observe-and-load
```

## Usage

### Basic Animation Example

```jsx
import { withViewObserver } from "react-observe-and-load";

function MyComponent() {
  return <div>This will animate when scrolled into view</div>;
}

const AnimatedComponent = withViewObserver(MyComponent, {
  animate: true,
  afterWrapperIsVisibleClass: "fade-in",
  rootMargin: "50px",
});

function App() {
  return <AnimatedComponent />;
}
```

### Lazy Loading Example

```jsx
import { withViewObserver } from "react-observe-and-load";

function DataComponent({ content, loading, error }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{content}</div>;
}

const LazyLoadedComponent = withViewObserver(DataComponent, {
  lazyLoad: true,
  files: ["/path/to/data.json"],
  animate: true,
});

function App() {
  return <LazyLoadedComponent />;
}
```

### Using Individual Hooks

```jsx
import { useElementObserver, useLazyLoadData } from "react-observe-and-load";

function CustomComponent() {
  const { ref, inView } = useElementObserver({
    rootMargin: "50px",
    threshold: 0.5,
  });

  const { data, loading, error } = useLazyLoadData(
    ["/path/to/data.json"],
    inView
  );

  return (
    <div ref={ref}>
      {inView ? "Visible!" : "Not visible"}
      {loading ? "Loading..." : data}
    </div>
  );
}
```

## API

### withViewObserver

```jsx
withViewObserver(WrappedComponent, options);
```

#### Options

| Option                       | Type     | Default             | Description                            |
| ---------------------------- | -------- | ------------------- | -------------------------------------- |
| `animate`                    | boolean  | false               | Whether to apply animation classes     |
| `afterWrapperIsVisibleClass` | string   | "visible_wrapper"   | Class to apply when visible            |
| `initialWrapperClass`        | string   | "invisible_wrapper" | Initial class when not visible         |
| `rootMargin`                 | string   | "0px"               | Margin around the root element         |
| `threshold`                  | number   | 0                   | Visibility threshold (0-1)             |
| `root`                       | Element  | null                | Root element for intersection observer |
| `triggerOnce`                | boolean  | true                | Whether to trigger only once           |
| `lazyLoad`                   | boolean  | false               | Whether to enable lazy loading         |
| `files`                      | string[] | []                  | Files to lazy load                     |

### useElementObserver

```jsx
const { ref, inView } = useElementObserver(options);
```

#### Options

| Option        | Type    | Default | Description                            |
| ------------- | ------- | ------- | -------------------------------------- |
| `rootMargin`  | string  | "0px"   | Margin around the root element         |
| `threshold`   | number  | 0       | Visibility threshold (0-1)             |
| `triggerOnce` | boolean | true    | Whether to trigger only once           |
| `root`        | Element | null    | Root element for intersection observer |

### useLazyLoadData

```jsx
const { data, error, loading } = useLazyLoadData(files, inView);
```

#### Parameters

| Parameter | Type     | Description                    |
| --------- | -------- | ------------------------------ |
| `files`   | string[] | Array of file paths to load    |
| `inView`  | boolean  | Whether the element is in view |

## CSS Example

```css
.invisible_wrapper {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.visible_wrapper {
  opacity: 1;
  transform: translateY(0);
}

/* Custom animation class */
.fade-in {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

## Browser Support

This package uses the Intersection Observer API. For browsers that don't support it, you'll need to include a polyfill:

```jsx
import "intersection-observer";
```

## Changelog

### [1.0.0] - 2024-03-04

- Initial release
- Added withViewObserver HOC
- Added useElementObserver hook
- Added useLazyLoadData hook
- Added tree-shaking support
- Added minification support

## License

MIT

## Author

Nad1m-A-A
# react-observe-and-load
# react-observe-and-load

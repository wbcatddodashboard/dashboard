# Headless Button Component

A truly headless button component that provides functionality without dictating visual representation, following SOLID principles.

## What is a Headless Component?

Headless components provide functionality and behavior without imposing any visual styling or structure. They give you complete control over rendering while handling the complex logic.

## Features

- Follows SOLID principles
- Truly headless - provides functionality without visual opinions
- Custom rendering through props
- Full accessibility support
- Loading state handling
- TypeScript support

## Usage Examples

```tsx
import Button from '@/app/components/ui/Button';

// Basic usage with your own styling
<Button
  onClick={() => console.log('Clicked!')}
  className="px-4 py-2 bg-blue-600 text-white rounded-md"
>
  Click Me
</Button>

// With loading state and custom loading indicator
<Button
  isLoading={isSubmitting}
  renderLoading={({ isLoading }) => isLoading && (
    <span className="mr-2">⏳</span>
  )}
  className="px-4 py-2 bg-green-600 text-white rounded-md"
>
  Submit
</Button>

// Using a custom element
<Button
  as="a"
  href="/dashboard"
  className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md"
>
  Go to Dashboard
</Button>

// Building your own styled button with the headless component
function PrimaryButton({ children, ...props }) {
  return (
    <Button
      {...props}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
      renderLoading={({ isLoading }) =>
        isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )
      }
    >
      {children}
    </Button>
  );
}
```

## Props

| Prop          | Type                                         | Default   | Description                                          |
| ------------- | -------------------------------------------- | --------- | ---------------------------------------------------- |
| children      | ReactNode                                    | required  | Button content                                       |
| isLoading     | boolean                                      | false     | Whether the button is in a loading state             |
| as            | ElementType                                  | 'button'  | Custom element to render instead of button           |
| renderLoading | (props: { isLoading: boolean }) => ReactNode | undefined | Custom render function for loading indicator         |
| ...props      | ButtonHTMLAttributes<HTMLButtonElement>      |           | All other props are passed to the underlying element |

## How It Works

The Button component uses the `useButton` hook to handle all button logic like loading states and disabled states. The component itself doesn't impose any styling or structural decisions, letting you control the presentation entirely through props.

For full accessibility, the component adds appropriate ARIA attributes automatically:

- `aria-busy="true"` when loading
- `disabled` attribute when loading or explicitly disabled

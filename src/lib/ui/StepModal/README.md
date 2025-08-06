# StepModal Component - Headless Architecture

A completely headless, reusable modal component that supports both multi-step wizards and single modal dialogs. Built with React, TypeScript, and follows SOLID principles with a compound component pattern.

## Architecture

This component follows **headless UI principles** and **SOLID design principles**:

- **Single Responsibility**: Each component has one clear purpose
- **Open/Closed**: Easily extensible without modifying core logic
- **Liskov Substitution**: Components can be swapped with custom implementations
- **Interface Segregation**: Minimal, focused interfaces
- **Dependency Inversion**: UI depends on abstractions, not implementations

## Features

- **🎯 Headless Architecture**: Complete control over styling and structure
- **🧩 Compound Components**: Composable parts for maximum flexibility
- **📋 Multi-step Wizard Support**: Create guided workflows with step navigation
- **💬 Single Modal Mode**: Use as a standard modal dialog
- **✅ Step Validation**: Validate each step before allowing navigation
- **📊 Progress Indicators**: Visual progress bar and step numbers
- **🎨 Fully Customizable**: Style each component independently
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🎬 Animation Support**: Smooth transitions between steps and modal states
- **🔧 TypeScript**: Complete type safety with comprehensive definitions

## Usage

### Basic Single Modal

```tsx
import { StepModal } from '@lib/ui/StepModal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <StepModal.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <StepModal.Overlay>
          <StepModal.Content size="md">
            <StepModal.Header>
              <StepModal.Title>Confirmation</StepModal.Title>
              <StepModal.Close />
            </StepModal.Header>
            
            <StepModal.Body>
              <StepModal.Step>
                <p>Are you sure you want to continue?</p>
              </StepModal.Step>
            </StepModal.Body>
            
            <StepModal.Footer>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={handleConfirm}>Confirm</button>
            </StepModal.Footer>
          </StepModal.Content>
        </StepModal.Overlay>
      </StepModal.Root>
    </>
  );
}
```

### Multi-Step Wizard

```tsx
import { StepModal, StepConfig } from '@lib/ui/StepModal';

function MyWizard() {
  const [isOpen, setIsOpen] = useState(false);
  
  const steps: StepConfig[] = [
    {
      id: 'step1',
      title: 'Personal Info',
      content: () => <PersonalInfoForm />,
      onValidate: () => validatePersonalInfo()
    },
    {
      id: 'step2',
      title: 'Preferences',
      content: () => <PreferencesForm />,
      isValid: true
    },
    {
      id: 'step3',
      title: 'Confirmation',
      content: () => <ConfirmationView />,
      onValidate: () => validateTerms()
    }
  ];

  return (
    <StepModal.Root
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      steps={steps}
      onFinish={handleComplete}
    >
      <StepModal.Overlay>
        <StepModal.Content size="lg">
          <StepModal.Header>
            <StepModal.Title>Setup Wizard</StepModal.Title>
            <StepModal.Close />
          </StepModal.Header>
          
          <StepModal.Body>
            <StepModal.Progress showBar={true} showNumbers={true} />
            <StepModal.Step />
          </StepModal.Body>
          
          <StepModal.Footer>
            <StepModal.Navigation>
              <CustomNavigationButtons />
            </StepModal.Navigation>
          </StepModal.Footer>
        </StepModal.Content>
      </StepModal.Overlay>
    </StepModal.Root>
  );
}

// Custom navigation using context
function CustomNavigationButtons() {
  const { 
    canGoPrevious, 
    canGoNext, 
    isLastStep, 
    goToPreviousStep, 
    goToNextStep, 
    closeModal 
  } = StepModal.useContext();

  return (
    <div className="flex justify-between w-full">
      {canGoPrevious && (
        <button onClick={goToPreviousStep}>Previous</button>
      )}
      <div className="space-x-2">
        <button onClick={closeModal}>Cancel</button>
        {!isLastStep && canGoNext && (
          <button onClick={goToNextStep}>Next</button>
        )}
        {isLastStep && (
          <button onClick={closeModal}>Finish</button>
        )}
      </div>
    </div>
  );
}
```

## Component API

### StepModal.Root

The root component that provides context to all child components.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls modal visibility |
| `onClose` | `() => void` | - | Called when modal should close |
| `steps` | `StepConfig[]` | `[]` | Array of step configurations |
| `onStepChange` | `(step: number, config: StepConfig) => void` | - | Called when step changes |
| `onFinish` | `() => void` | - | Called when wizard completes |
| `allowBackdropClose` | `boolean` | `true` | Allow closing by clicking backdrop |
| `allowEscapeKey` | `boolean` | `true` | Allow closing with Escape key |

### StepModal.Overlay

The backdrop overlay component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |
| `onClick` | `(event) => void` | - | Click handler (combined with backdrop logic) |

### StepModal.Content

The main modal content container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `position` | `'center' \| 'top' \| 'bottom'` | `'center'` | Modal position |
| `children` | `ReactNode` | - | Child components |
| `className` | `string` | `''` | Additional CSS classes |

### StepModal.Header

Header section of the modal.

### StepModal.Title

Title component for the modal header.

### StepModal.Close

Close button component that automatically handles closing.

### StepModal.Body

Body section of the modal.

### StepModal.Footer

Footer section of the modal.

### StepModal.Progress

Progress indicator component for stepped modals.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showBar` | `boolean` | `true` | Show progress bar |
| `showNumbers` | `boolean` | `true` | Show step numbers |

### StepModal.Navigation

Container for navigation elements.

### StepModal.Step

Step content component that renders current step or children.

### StepModal.useContext()

Hook to access the modal context from any child component.

Returns:
- `currentStep`: Current step index
- `totalSteps`: Total number of steps
- `currentStepConfig`: Current step configuration
- `isFirstStep`: Whether on first step
- `isLastStep`: Whether on last step
- `canGoNext`: Whether can navigate forward
- `canGoPrevious`: Whether can navigate backward
- `goToNextStep`: Function to go to next step
- `goToPreviousStep`: Function to go to previous step
- `goToStep`: Function to go to specific step
- `closeModal`: Function to close modal
- `isOpen`: Whether modal is open

## StepConfig Interface

```typescript
interface StepConfig {
  id: string;
  title: string;
  content: ReactNode | ((props: StepContentProps) => ReactNode);
  isValid?: boolean;
  canSkip?: boolean;
  onValidate?: () => Promise<boolean> | boolean;
}
```

## SOLID Principles Implementation

### Single Responsibility Principle
- Each component has one clear responsibility
- Logic is separated from presentation
- Context handles state, components handle UI

### Open/Closed Principle
- Easily extensible through compound components
- Can add new functionality without modifying existing code
- Custom components can be composed freely

### Liskov Substitution Principle
- Any component can be replaced with a custom implementation
- All components follow the same interface contracts
- Styled components are completely replaceable

### Interface Segregation Principle
- Small, focused interfaces for each component
- No component is forced to depend on unused methods
- Context provides only what's needed

### Dependency Inversion Principle
- UI components depend on abstractions (context)
- Logic doesn't depend on specific UI implementations
- Easy to test and mock

## Examples

See the `examples/` directory for complete implementations:

- `HeadlessSteppedExample.tsx` - Multi-step wizard with custom navigation
- `HeadlessSingleExample.tsx` - Various single modal configurations
- `SteppedModalExample.tsx` - Legacy example (for comparison)
- `SingleModalExample.tsx` - Legacy example (for comparison)

## Styling

The component is completely unstyled by default. The included styled components use Tailwind CSS but can be completely replaced:

```tsx
// Use your own styled components
<StepModal.Content className="my-custom-modal-styles">
  <MyCustomHeader>
    <MyCustomTitle>Custom Title</MyCustomTitle>
  </MyCustomHeader>
  {/* ... */}
</StepModal.Content>
```

## Migration from Legacy API

If you have existing modals using the old monolithic API, migration is straightforward:

```tsx
// Old API
<StepModal
  isOpen={isOpen}
  onClose={onClose}
  title="My Modal"
  size="lg"
  steps={steps}
/>

// New Headless API
<StepModal.Root isOpen={isOpen} onClose={onClose} steps={steps}>
  <StepModal.Overlay>
    <StepModal.Content size="lg">
      <StepModal.Header>
        <StepModal.Title>My Modal</StepModal.Title>
        <StepModal.Close />
      </StepModal.Header>
      <StepModal.Body>
        <StepModal.Progress />
        <StepModal.Step />
      </StepModal.Body>
    </StepModal.Content>
  </StepModal.Overlay>
</StepModal.Root>
```

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript features
- React 16.8+ (hooks)
- CSS Grid and Flexbox
- CSS Custom Properties
import type { CollapseContextType, CollapseProps } from './Collapse.d';
import { CollapseProvider } from './context/CollapseContext';
import useCollapse from './hooks/useCollapse';

function Collapse({
  isOpen,
  onToggle,
  disabled = false,
  defaultOpen = false,
  animated = true,
  duration = 300,
  iconPosition = 'right',
  icon,
  children,
  ...rest
}: CollapseProps) {
  const hookProps = {
    isOpen,
    onToggle,
    disabled,
    defaultOpen,
    animated,
    duration,
    iconPosition,
    icon,
  };
  const collapseState = useCollapse(hookProps);

  const {
    isOpen: currentIsOpen,
    toggleOpen,
    animated: isAnimated,
    duration: animationDuration,
  } = collapseState;

  const contextValue: CollapseContextType = {
    isOpen: currentIsOpen,
    disabled,
    toggleOpen,
    animated: isAnimated,
    duration: animationDuration,
    iconPosition,
    icon,
  };

  return (
    <CollapseProvider value={contextValue}>
      <div {...rest}>{children ? children(contextValue) : null}</div>
    </CollapseProvider>
  );
}

export default Collapse;

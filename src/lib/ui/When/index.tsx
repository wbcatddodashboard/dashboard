import type { WhenProps } from './When';

function When({ condition, children }: WhenProps) {
  return condition ? <>{children}</> : null;
}

export default When;

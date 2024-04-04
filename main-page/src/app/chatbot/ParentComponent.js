import { useClient } from 'your-nextjs-client-library';
import Page from './page';

export default function ParentComponent() {
  useClient(); // Marking this component as a client component
  return <Page />;
}
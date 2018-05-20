/**
 *
 * Asynchronously loads the component for NewTask
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

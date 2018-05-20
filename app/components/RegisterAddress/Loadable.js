/**
 *
 * Asynchronously loads the component for RegisterAddress
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});

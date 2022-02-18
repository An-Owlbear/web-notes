import { callback } from '../../../lib/auth';
import { withSession } from '../../../lib/ironSession';

export default withSession(callback);
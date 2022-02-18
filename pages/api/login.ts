import { login } from '../../lib/auth';
import { withSession } from '../../lib/ironSession';

export default withSession(login);
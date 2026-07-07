import type { Dict } from '../types';
import enGB from './en-GB';

// English (Simplified) — American English. Reuses the British source and only
// overrides keys whose SPELLING differs (colour→color, recognise→recognize,
// -ise→-ize). Everything else inherits from en-GB automatically.
const overrides: Dict = {
  'person.hobby.socialising': 'Socializing',
  'meta.closeup.teach': 'Teach it to recognize you',
  'meta.fp.blurb':
    'A hash of the traits below. No cookies, no login — this combination alone is usually enough to recognize you across the web.',
  'meta.fpr.screenNote': '{depth}-bit color'
};

const enUS: Dict = { ...enGB, ...overrides };

export default enUS;

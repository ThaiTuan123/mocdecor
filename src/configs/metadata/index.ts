// config/metadata.ts

import type {Metadata} from 'next';
import languages from '@/configs/languages';

const metadata: Metadata = {
    title: languages.get('title'),
    description: languages.get('description'),
};

export default metadata;
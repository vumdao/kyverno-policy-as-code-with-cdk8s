import { KyvernoProps } from './kyvernoProps';

export const REQUIRE_APP_LABEL: KyvernoProps = {
  name: 'require-app-label',
  message: 'The label `app` is required.',
  namespace: 'default',
  pattern: {
    metadata: {
      labels: {
        app: '?*',
      },
    },
  },
};
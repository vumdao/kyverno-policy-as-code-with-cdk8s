import { KyvernoProps } from './kyvernoProps';

export const REQUIRE_REQUEST_LIMIT: KyvernoProps = {
  name: 'require-request-limit',
  message: 'All containers must have CPU and memory resource requests and limits defined.',
  pattern: {
    spec: {
      containers: [{
        name: '*',
        resources: {
          limits: { memory: '?*' },
          requests: { memory: '?*', cpu: '?*' },
        },
      }],
    },
  },
};
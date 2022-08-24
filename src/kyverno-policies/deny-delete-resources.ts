import { KyvernoProps } from './kyvernoProps';

export const DENY_DELETE: KyvernoProps = {
  name: 'deny-deletes',
  message: 'This resource is protected and changes are not allowed. Please seek a cluster-admin.',
  resources: {
    selector: {
      matchLabels: { protected: 'true' },
    },
  },
  exclude: {
    any: [{
      clusterRoles: ['cluster-admin'],
    }],
  },
  deny: {
    conditions: {
      any: [{
        key: '{{request.operation}}',
        operator: 'Equals',
        value: 'DELETE',
      }],
    },
  },
};
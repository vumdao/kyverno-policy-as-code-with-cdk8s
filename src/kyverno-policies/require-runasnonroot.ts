import { ClusterPolicySpecValidationFailureAction } from '../imports/kyverno.io';
import { KyvernoProps } from './kyvernoProps';

export const REQUIRE_RUN_AS_NONROOT: KyvernoProps = {
  name: 'run-as-non-root',
  message: 'Containers must be required to run as non-root users. This policy ensures runAsNonRoot is set to true',
  action: ClusterPolicySpecValidationFailureAction.AUDIT,
  anyPatterns: [
    {
      spec: {
        securityContext: { runAsNonRoot: 'true' },
        ['=(ephemeralContainers)']: [{ ['=(securityContext)']: { '=(runAsNonRoot)': 'true' } }],
        ['=(initContainers)']: [{ ['=(securityContext)']: { '=(runAsNonRoot)': 'true' } }],
        containers: [{ ['=(securityContext)']: { '=(runAsNonRoot)': 'true' } }],
      },
    },
    {
      spec: {
        containers: { securityContext: { runAsNonRoot: 'true' } },
        ['=(ephemeralContainers)']: [{ securityContext: { '=(runAsNonRoot)': 'true' } }],
        ['=(initContainers)']: [{ ['=(securityContext)']: { '=(runAsNonRoot)': 'true' } }],
      },
    },
  ],
};
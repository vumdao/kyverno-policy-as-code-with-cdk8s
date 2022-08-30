import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import { KubeClusterRole } from './imports/k8s';

/**
 * Beginning in 1.8.0, Kyverno uses aggregated ClusterRoles to search for and combine ClusterRoles which apply to Kyverno
 * Kyverno with following aggregation rule will combine all clusterRole with label `app: kyverno` into one
 * ```
   aggregationRule:
     clusterRoleSelectors:
       - matchLabels:
           app: kyverno
   ```
 */
export class KyvernoClusterRole extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new KubeClusterRole(this, 'kyernoClusterRole', {
      metadata: { name: 'kyverno:create-deployments', labels: { app: 'kyverno' } },
      rules: [
        {
          apiGroups: ['apps'],
          resources: ['deployments'],
          verbs: [
            'create', 'patch', 'update', 'get', 'list', 'watch',
          ],
        },
      ],
    });
  }
}


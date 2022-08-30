import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import { ClusterPolicy } from '../imports/kyverno.io';

export class RestartOnConfgmapChange extends Chart {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new ClusterPolicy(this, 'RestartOnConfgmapChange', {
      metadata: {
        name: 'restart-on-configmap-change',
        annotations: {
          'policies.kyverno.io/title': 'Restart Deployment On Configmap Change',
          'policies.kyverno.io/subject': 'Deployment',
        },
      },
      spec: {
        mutateExistingOnPolicyUpdate: false,
        rules: [
          {
            name: 'update-configmap',
            match: {
              any: [
                {
                  resources: {
                    kinds: ['ConfigMap'],
                    names: ['inflate-test-configmap'],
                    namespaces: ['default'],
                  },
                },
              ],
            },
            preconditions: {
              all: [
                {
                  key: '{{request.operation}}',
                  operator: 'Equals',
                  value: 'UPDATE',
                },
              ],
            },
            mutate: {
              targets: [
                {
                  apiVersion: 'apps/v1',
                  kind: 'Deployment',
                  name: 'inflate-positive-test',
                  namespace: 'default',
                },
              ],
              patchStrategicMerge: {
                spec: {
                  template: {
                    metadata: {
                      annotations: {
                        'ops.corp.com/triggerrestart': '{{request.object.metadata.resourceVersion}}',
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });
  }
}
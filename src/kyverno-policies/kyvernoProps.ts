import { Chart } from 'cdk8s';
import { Construct } from 'constructs';
import { ClusterPolicy, ClusterPolicySpecRulesExclude, ClusterPolicySpecRulesValidateDeny, ClusterPolicySpecValidationFailureAction } from '../imports/kyverno.io';

export interface KyvernoProps {
  name: string;
  message: string;
  namespaces?: Array<string>;
  action?: ClusterPolicySpecValidationFailureAction;
  kinds?: Array<string>;
  resources?: {};
  exclude?: ClusterPolicySpecRulesExclude;
  deny?: ClusterPolicySpecRulesValidateDeny;
  pattern?: {};
  anyPatterns?: {};
};

export class KyvernoClusterPolicy extends Chart {
  constructor(scope: Construct, name: string, kyvernoProps: KyvernoProps) {
    super(scope, name);

    const _namespace = kyvernoProps.namespaces || ['default'];

    new ClusterPolicy(this, `${kyvernoProps.name}`, {
      metadata: {
        name: kyvernoProps.name,
        annotations: {
          'policies.kyverno.io/category': 'Pod Security Standards',
        },
      },
      spec: {
        validationFailureAction: kyvernoProps.action || ClusterPolicySpecValidationFailureAction.ENFORCE,
        rules: [{
          name: kyvernoProps.name,
          match: {
            any: [{
              resources: kyvernoProps.resources || { kinds: ['Pod'], namespaces: _namespace },
            }],
          },
          validate: {
            deny: kyvernoProps.deny || undefined,
            message: kyvernoProps.message,
            pattern: kyvernoProps.pattern || undefined,
            anyPattern: kyvernoProps.anyPatterns || undefined,
          },
          exclude: kyvernoProps.exclude || undefined,
        }],
      },
    });
  }
}
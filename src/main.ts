import { App } from 'cdk8s';
import { KyvernoClusterRole } from './kyverno-clusterrole';
import { KYVERNO_POLICIES } from './kyverno-policies/kverno-list';
import { KyvernoClusterPolicy } from './kyverno-policies/kyvernoProps';
import { RestartOnConfgmapChange } from './kyverno-policies/restart-on-configmap-changes';

// Roles
const role = new App({
  outputFileExtension: '.yaml',
  outdir: 'dist/role',
});
new KyvernoClusterRole(role, 'kyverno-create-deployments-clusterrole');
role.synth();

// Kyverno
const kyverno = new App({
  outputFileExtension: '.yaml',
  outdir: 'dist/kyverno',
});

for (var _kyvn of KYVERNO_POLICIES) {
  new KyvernoClusterPolicy(kyverno, `${_kyvn.name}-kyverno-policy`, _kyvn);
}
new RestartOnConfgmapChange(kyverno, 'restart-on-configmap-change-policy');
kyverno.synth();
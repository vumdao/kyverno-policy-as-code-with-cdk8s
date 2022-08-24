import { App } from 'cdk8s';
import { KYVERNO_POLICIES } from './kyverno-policies/kverno-list';
import { KyvernoClusterPolicy } from './kyverno-policies/kyvernoProps';

// Kyverno
const kyverno = new App({
  outputFileExtension: '.yaml',
  outdir: 'dist/kyverno',
});

for (var _kyvn of KYVERNO_POLICIES) {
  new KyvernoClusterPolicy(kyverno, `${_kyvn.name}-kyverno-policy`, _kyvn);
}
kyverno.synth();
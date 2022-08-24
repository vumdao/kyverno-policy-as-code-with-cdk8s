import { REQUIRE_APP_LABEL } from './require-app-labels';
import { REQUIRE_REQUEST_LIMIT } from './require-requests-limits';
import { REQUIRE_RUN_AS_NONROOT } from './require-runasnonroot';

export const KYVERNO_POLICIES = [
  REQUIRE_APP_LABEL, REQUIRE_REQUEST_LIMIT, REQUIRE_RUN_AS_NONROOT,
];
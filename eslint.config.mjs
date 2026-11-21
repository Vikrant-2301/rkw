import nextConfig from "eslint-config-next";

const customConfig = [
  ...nextConfig,
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
    },
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
];

export default customConfig;

'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NProgress = () => {
  return (
    <ProgressBar
      height="4px"
      color="hsl(var(--accent))"
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
};

export default NProgress;

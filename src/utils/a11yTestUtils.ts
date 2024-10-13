import { render } from '@testing-library/react';
import React from 'react';
import { axe } from 'vitest-axe';

export const renderWithA11y = (
  Component: React.ReactElement,
  wrapper?: React.ComponentType<{ children: React.ReactNode }>,
) => {
  const { container, ...rest } = render(Component, { wrapper });
  return { container, ...rest };
};

export const runA11yAudit = async (container: HTMLElement) => {
  return axe(container);
};

export const testA11y = async (
  Component: React.ReactElement,
  wrapper?: React.ComponentType<{ children: React.ReactNode }>,
) => {
  const { container } = renderWithA11y(Component, wrapper);
  return runA11yAudit(container);
};

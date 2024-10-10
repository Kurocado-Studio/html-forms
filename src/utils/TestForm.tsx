import { FormProvider, useForm } from '@conform-to/react';

export function TestForm({ children }: { children: React.ReactNode }) {
  const [form] = useForm({});

  return (
    <FormProvider context={form.context}>
      <form id={form.id}>{children}</form>
    </FormProvider>
  );
}

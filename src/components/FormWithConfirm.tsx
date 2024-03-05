'use client';

import { ReactNode } from 'react';

export default function FormWithConfirm({
  action,
  confirmText,
  children,
  onClearForm
}: {
  action: (data: FormData) => Promise<void>
  confirmText: string
  children: ReactNode,
  onClearForm?:() => void
}) {
  return (
    <form
      action={action}
      onSubmit={e => {
        if (!confirm(confirmText)) {
          e.preventDefault();
          return
        } else {
          e.currentTarget.requestSubmit();
          if(onClearForm){
            onClearForm()
          }
        }
      }}
    >
      {children}
    </form>
  );
};

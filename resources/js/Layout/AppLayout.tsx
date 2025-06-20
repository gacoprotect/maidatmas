import { Head } from '@inertiajs/react';
import React from 'react';

type AppLayoutProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

const AppLayout = ({ children, title, className = '' }: AppLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Head title={title} />
      <div className="relative mx-auto min-h-screen max-w-xl bg-primary shadow-sm rounded-t-lg">
        <main className={`min-h-[calc(100vh-4rem)] pb-6 ${className}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
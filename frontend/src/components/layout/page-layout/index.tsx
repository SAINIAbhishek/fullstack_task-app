import React from 'react';
import ContentLayout from '@/components/layout/content-layout';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageLayout = ({ children, className }: Props) => {
  return (
    <ContentLayout className={`pt-5 pb-10 h-full grow w-full ${className}`}>
      {children}
    </ContentLayout>
  );
};

export default PageLayout;

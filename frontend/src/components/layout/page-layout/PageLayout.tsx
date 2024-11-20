import React from 'react';
import ContentLayout from '@/components/layout/content-layout/ContentLayout';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageLayout = ({ children, className }: Props) => {
  return (
    <ContentLayout className={`pt-5 pb-10 h-full grow ${className}`}>
      {children}
    </ContentLayout>
  );
};

export default PageLayout;

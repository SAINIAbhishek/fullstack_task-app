type Props = {
  children: React.ReactNode;
  className?: string;
};

const ContentLayout = ({ children, className }: Props) => {
  return (
    <div className={`max-w-screen-2xl flex mx-8 px-4 ${className}`}>
      {children}
    </div>
  );
};

export default ContentLayout;

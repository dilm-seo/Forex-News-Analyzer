import React from 'react';

interface CardRootProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const Root = ({ children, className = '' }: CardRootProps) => (
  <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
    {children}
  </div>
);

const Header = ({ children, className = '' }: CardHeaderProps) => (
  <div className={`p-6 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

const Content = ({ children, className = '' }: CardContentProps) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Footer = ({ children, className = '' }: CardFooterProps) => (
  <div className={`p-6 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

const Title = ({ children, className = '' }: CardTitleProps) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export const Card = {
  Root,
  Header,
  Content,
  Footer,
  Title,
};
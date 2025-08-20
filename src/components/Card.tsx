'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="p-6 rounded-lg bg-card text-card-foreground shadow-md">
      {children}
    </div>
  );
};

export default Card;

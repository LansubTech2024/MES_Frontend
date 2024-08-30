// src/components/ui/card.js or src/components/ui/card.jsx
import React from 'react';

// Basic Card component
export function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
      {children}
    </div>
  );
}

// CardHeader component
export function CardHeader({ children }) {
  return (
    <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
      {children}
    </div>
  );
}

// CardTitle component
export function CardTitle({ children }) {
  return (
    <h2 style={{ fontSize: '1.5em', marginBottom: '8px' }}>
      {children}
    </h2>
  );
}

// CardContent component
export function CardContent({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

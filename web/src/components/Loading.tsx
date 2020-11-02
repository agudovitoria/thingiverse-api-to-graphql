import React from 'react';
import { LoadingProps } from '../domain/LoadingProps';

export default ({ content }: LoadingProps) => (
  <div className="row">
    <div className="col">
      <span>{content}</span>
    </div>
  </div>
);
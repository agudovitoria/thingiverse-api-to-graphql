import React from 'react';
import { ErrorResponse } from '../domain/ErrorResponse';

export default function ErrorMessage({ message }: ErrorResponse) {
  return (
    <div className="row">
      <div className="col">
        <span className="error-message">{message || 'No message'}</span>
      </div>
    </div>
  );
}

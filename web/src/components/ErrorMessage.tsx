import React from 'react';
import { ErrorResponse } from '../domain/ErrorResponse';

export default ({ message }: ErrorResponse) => (
  <div className="row">
    <div className="col">
      <span className="error-message">{message || 'No message'}</span>
    </div>
  </div>
);
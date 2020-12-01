import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function Filters() {
  const [activeButton, setActiveButton] = useState(0);
  return (
    <ButtonGroup size="sm">
      <Button variant={activeButton === 0 ? 'info' : 'primary'} onClick={() => setActiveButton(0)}>
        Popular
      </Button>
      <Button variant={activeButton === 1 ? 'info' : 'primary'} onClick={() => setActiveButton(1)}>
        Newest
      </Button>
      <Button variant={activeButton === 2 ? 'info' : 'primary'} onClick={() => setActiveButton(2)}>
        Featured
      </Button>
    </ButtonGroup>
  );
}

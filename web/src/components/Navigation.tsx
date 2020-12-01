import React from 'react';
import { Form, Nav, Navbar } from 'react-bootstrap';
import Filters from './Filters';

export default function NavigationPreloadManager() {
  return (
    <>
      <Navbar>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        <Form inline>
          <Filters />
        </Form>
      </Navbar>
    </>
  );
}

import React from "react";
import { createUseStyles } from 'react-jss';
import { login } from "../service/LoginService";
import { Button, Col, Container, Row } from "react-bootstrap";

export default () => {
    const useStyles = createUseStyles({
        title: {
            fontSize: '48px',
            textAlign: 'center'
        }
    });

    const styles = useStyles();
    return (
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <span className={styles.title}>Thingiverse Graphql</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="outline-primary"
                                    onClick={() => login()}>
                                LOGIN
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

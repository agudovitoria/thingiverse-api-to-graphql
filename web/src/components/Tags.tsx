import React from 'react';
import { Container, Badge } from 'react-bootstrap';
import { createUseStyles } from 'react-jss';

import { Tag } from '../domain/Tag';

const useStyles = createUseStyles({
  badge: {
    margin: '4px',
  },
});

export default function Tags({ tags }: { tags: Tag[] }) {
  const styles = useStyles();

  return (
    <Container fluid>
      {tags.map(({ name }: Tag, index: number) => (
        <Badge variant="primary" className={styles.badge} key={`tag-${index}`}>
          {name}
        </Badge>
      ))}
    </Container>
  );
}

import React from 'react';
import { createUseStyles } from 'react-jss';
import { TitleProps } from '../domain/TitleProps';

export default ({ title }: TitleProps) => {
  const useStyles = createUseStyles({
    title: {
      fontSize: '48px',
      textAlign: 'center'
    }
  });

  const styles = useStyles();

  return (
    <div className="row">
      <div className="col">
        <span className={styles.title}>{title || 'untitled'}</span>
      </div>
    </div>
  );
};
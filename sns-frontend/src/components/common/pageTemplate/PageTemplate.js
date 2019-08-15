import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PageTemplate = ({children})=>(
    <div className={cx('page-template')}>
        {children}
    </div>
)

export default PageTemplate;
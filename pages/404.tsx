import Link from 'next/link';
import { Link as UILink } from '@mui/material';

import styles from './404.module.scss';

const Custom404 = () => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <h1>Upps! The page is not found :( </h1>
      <h2>
        <Link href="/" passHref legacyBehavior>
          <UILink underline="hover" color="white" className={styles.link}>
            Back to main page
          </UILink>
        </Link>
      </h2>
    </div>
  </div>
);

export default Custom404;

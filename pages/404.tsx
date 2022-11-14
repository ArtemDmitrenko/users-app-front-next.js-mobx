import Link from 'next/link';
import { Link as UILink } from '@mui/material';

import styles from './404.module.scss';

const Custom404 = () => (
  <div className={styles.wrapper}>
    <div className={styles.card}>
      <h1>Ой! Данная страница не найдена :( </h1>
      <h2>
        <Link href="/" passHref legacyBehavior>
          <UILink underline="hover" color="white" className={styles.link}>
            Вернуться на главную
          </UILink>
        </Link>
      </h2>
    </div>
  </div>
);

export default Custom404;

import Head from 'next/head';

import Header from 'Components/Header/Header';
import navigation from './navigation.json';
import styles from './layout.module.scss';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  keywords?: string;
};

const Layout = (props: LayoutProps) => {
  const {
    children,
    title,
    description = 'Default description words',
    keywords = 'Default keywords',
  } = props;

  return (
    <div className={styles.wrapper}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Head>
      <Header pages={navigation} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;

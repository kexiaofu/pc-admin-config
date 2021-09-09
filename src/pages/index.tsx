import styles from './index.less';
import {useEffect} from 'react';

export default function IndexPage() {
  useEffect(() => {
    console.log('---> on --> ')
  }, [])
  return (
    <div>
      <h1 className={styles.title}>Page index 876 hello ?</h1>
    </div>
  );
}

import { Link, useRouteError } from "react-router-dom";
import styles from './error.module.scss';

const Error = ({ errorMessage }) => {
  const error = useRouteError();

  return (
      <section className={styles.errorPage} id="error-page">
        <h1 className={styles.text404}>404</h1>
        {error && error}
        {errorMessage ?
            <p className={styles.errorMessage}>{errorMessage}</p> :
            <p className={styles.errorMessage}>Oups! La page que vous demandez n'existe pas.</p>
        }

        <Link className={styles.homeLink} to={'/'}>Retourner sur la page d’accueil</Link>
      </section>
  );
};

export default Error;
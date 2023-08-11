import styles from './App.module.css';
import Form from './components/Form/Form';

function App() {
  return (
    <div className={styles.App}>
      <h1>Submit your Information</h1>
      <Form />
    </div>
  );
}

export default App;

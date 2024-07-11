import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  offersCount: number;
};

const App = ({ offersCount }: AppProps): JSX.Element => (
  <MainScreen offersCount={offersCount} />
);

export default App;

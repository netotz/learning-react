import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';
import './App.css';
import SignUp from './components/SignUp';

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: 'dark'
};
const darkTheme = extendTheme({ config });

function App() {
  return (
    <ChakraProvider theme={darkTheme} resetCSS>
      <main className="App">
        <SignUp></SignUp>
      </main>
    </ChakraProvider>
  );
}

export default App;

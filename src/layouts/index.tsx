import {Container, Spacer, Navbar, NextUIProvider, Text} from "@nextui-org/react";
import {Logo} from './Logo'
import PromptPage from '../components/prompt-page'

export default function Layout() {

  return (
    <NextUIProvider>
      <Container>
        <Navbar isBordered>
          <Navbar.Brand>
            <Logo/>
            <Text b color="inherit" hideIn="xs">
              Stable Diffusion Prompts
            </Text>
          </Navbar.Brand>
        </Navbar>
        <Spacer y={2}/>
        <PromptPage/>
      </Container>
    </NextUIProvider>
  );
}

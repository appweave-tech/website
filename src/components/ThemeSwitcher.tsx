import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, Button } from "@chakra-ui/react";
import React from "react";

const ThemeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return ( 
        <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
     );
}
 
export default ThemeSwitcher;

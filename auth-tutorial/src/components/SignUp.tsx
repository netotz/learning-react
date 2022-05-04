import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props {

}

interface InputForm {
    text: string;
    isValid: boolean;
    isFocused: boolean;
}

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]){3,23}$/

export default function SignUp({ }: Props) {
    const userInputRef = useRef<HTMLInputElement>();
    const errorRef = useRef<HTMLParagraphElement>(null);

    const [userInput, setUserInput] = useState<InputForm>({
        text: "",
        isValid: false,
        isFocused: true
    });
    const [passwordInput, setPasswordInput] = useState<InputForm>({
        text: "",
        isValid: false,
        isFocused: false
    });
    const [matchingPasswordInput, setMatchingPasswordInput] = useState<InputForm>({
        text: "",
        isValid: false,
        isFocused: false
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [isPasswordShown, setIsPasswordShown] = useState(false);

    function togglePasswordShown() {
        setIsPasswordShown(!isPasswordShown);
    }

    // focus on user input when component initializes
    useEffect(() => {
        userInputRef.current?.focus();
    }, []);

    useEffect(() => {
        const isUserValid = USER_REGEX.test(userInput.text);
        console.log(isUserValid);
        console.log(userInput.text);

        setUserInput({ ...userInput, isValid: isUserValid });
    }, [userInput.text]);

    useEffect(() => {
        const isPasswordValid = PASSWORD_REGEX.test(passwordInput.text);
        console.log(isPasswordValid);
        console.log(passwordInput.text);

        setPasswordInput({ ...passwordInput, isValid: isPasswordValid });

        const isMatchValid = PASSWORD_REGEX.test(matchingPasswordInput.text);
        const doMatch = passwordInput.text === matchingPasswordInput.text;
        setMatchingPasswordInput({ ...matchingPasswordInput, isValid: doMatch && isMatchValid });
    }, [passwordInput.text, matchingPasswordInput.text]);

    useEffect(() => {
        setErrorMessage("");
    }, [userInput.text, passwordInput.text, matchingPasswordInput.text]);

    return (
        <Flex w="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Sign up</Heading>
                </Box>
                <Box my={2} textAlign="left">
                    <form>
                        <FormControl isRequired isInvalid={!userInput.isValid}>
                            <FormLabel htmlFor="userName">Username</FormLabel>
                            <Input id="userName"
                                value={userInput.text}
                                onChange={e => setUserInput({ ...userInput, text: e.target.value })}
                                onFocus={() => setUserInput({ ...userInput, isFocused: true })}
                                onBlur={() => setUserInput({ ...userInput, isFocused: false })} />
                            {userInput.isValid ? null : (
                                <FormErrorMessage>Username is invalid</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isRequired isInvalid={!passwordInput.isValid}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <InputGroup>
                                <Input id="password"
                                    type={isPasswordShown ? "text" : "password"}
                                    value={passwordInput.text}
                                    onChange={e => setPasswordInput({ ...passwordInput, text: e.target.value })}
                                    onFocus={() => setPasswordInput({ ...passwordInput, isFocused: true })}
                                    onBlur={() => setPasswordInput({ ...passwordInput, isFocused: false })} />
                                <InputRightElement w={10}>
                                    <Button size="sm" onClick={togglePasswordShown}>
                                        {isPasswordShown ? '👀' : '🙈'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {passwordInput.isValid ? null : (
                                <FormErrorMessage>Password doesn't meet requirements.</FormErrorMessage>
                            )}
                        </FormControl>

                        <Button w="full" mt={4} type="submit">
                            Sign up
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}
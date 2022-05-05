import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Spinner } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { ApiClient, Routes } from "../services/apiClient";

interface InputForm {
    text: string;
    isValid: boolean;
    isFocused: boolean;
}

interface SignupDto {
    username: string;
    password: string;
}

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{3,23}$/

export default function SignUp() {
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
    const [isSigningUp, setIsSigningUp] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isMatchingPasswordVisible, setIsMatchingPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function toggleMatchingPasswordVisibility() {
        setIsMatchingPasswordVisible(!isMatchingPasswordVisible);
    }

    // focus on user input when component initializes
    useEffect(() => {
        userInputRef.current?.focus();
    }, []);

    useEffect(() => {
        const isUserValid = USER_REGEX.test(userInput.text);

        setUserInput({ ...userInput, isValid: isUserValid });
    }, [userInput.text]);

    useEffect(() => {
        const isPasswordValid = PASSWORD_REGEX.test(passwordInput.text);

        setPasswordInput({ ...passwordInput, isValid: isPasswordValid });

        const isMatchValid = PASSWORD_REGEX.test(matchingPasswordInput.text);
        const doMatch = passwordInput.text === matchingPasswordInput.text;
        setMatchingPasswordInput({ ...matchingPasswordInput, isValid: doMatch && isMatchValid });
    }, [passwordInput.text, matchingPasswordInput.text]);

    useEffect(() => {
        setErrorMessage("");
    }, [userInput.text, passwordInput.text, matchingPasswordInput.text]);

    async function handleSignUpAsync() {
        setIsSigningUp(true);
        try {
            const response = await ApiClient.post(
                Routes.Users,
                {
                    username: userInput.text,
                    password: passwordInput.text
                } as SignupDto
            );

            console.log(response);
            setIsSuccess(true);
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.log(axiosError);
            }
        }
        finally {
            setIsSigningUp(false);
        }
    }

    return (
        <Flex w="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Registration</Heading>
                </Box>
                <Box my={2} textAlign="left">
                    <form onSubmit={async e => {
                        e.preventDefault();
                        await handleSignUpAsync();
                    }}>
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
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={passwordInput.text}
                                    onChange={e => setPasswordInput({ ...passwordInput, text: e.target.value })}
                                    onFocus={() => setPasswordInput({ ...passwordInput, isFocused: true })}
                                    onBlur={() => setPasswordInput({ ...passwordInput, isFocused: false })} />
                                <InputRightElement w={10}>
                                    <Button size="sm" onClick={togglePasswordVisibility}>
                                        {isPasswordVisible ? '👀' : '🙈'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {passwordInput.isValid ? null : (
                                <FormErrorMessage>Password doesn't meet requirements.</FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isRequired isInvalid={!matchingPasswordInput.isValid}>
                            <FormLabel htmlFor="matchingPassword">Confirm password</FormLabel>
                            <InputGroup>
                                <Input id="matchingPassword"
                                    type={isMatchingPasswordVisible ? "text" : "password"}
                                    value={matchingPasswordInput.text}
                                    onChange={e => setMatchingPasswordInput({ ...matchingPasswordInput, text: e.target.value })}
                                    onFocus={() => setMatchingPasswordInput({ ...matchingPasswordInput, isFocused: true })}
                                    onBlur={() => setMatchingPasswordInput({ ...matchingPasswordInput, isFocused: false })} />
                                <InputRightElement w={10}>
                                    <Button size="sm" onClick={toggleMatchingPasswordVisibility}>
                                        {isMatchingPasswordVisible ? '👀' : '🙈'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            {passwordInput.text === matchingPasswordInput.text ? null : (
                                <FormErrorMessage>Passwords don't match.</FormErrorMessage>
                            )}
                        </FormControl>

                        <Button w="full" mt={4} type="submit"
                            disabled={
                                isSigningUp
                                || !userInput.isValid
                                || !passwordInput.isValid
                                || !matchingPasswordInput.isValid
                            }>
                            {isSigningUp ? (
                                <Spinner />
                            ) : "Sign up"}
                        </Button>
                    </form>
                </Box>

                <Box textAlign="left">
                    <Divider />
                    <p>Already registered? </p>
                    <Link href="#" color="skyblue">
                        Sign in
                    </Link>
                </Box>
            </Box>
        </Flex>
    );
}
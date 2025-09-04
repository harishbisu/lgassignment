import React, { useState } from "react";
import {
  Box,
  Button,
  Code,
  Container,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  VStack,
  HStack,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
} from "@chakra-ui/react";
import { Mail, Server, Send, CheckCircle } from "lucide-react";
import { trackEmail } from "../services/api";

const EmailTracker = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const projectConfig = {
    subject: "Lucid Email Tracker",
    email: "harishbisu94@gmail.com",
  };

  const handleTrackEmail = async () => {
    setLoading(true);
    setError(null);
    setApiResponse(null);

    try {
      const data = await trackEmail(projectConfig.subject);
      setApiResponse(data);
    } catch (err) {
      setError(err.message || "Failed to track email servers");
      setTimeout(() => {
        setApiResponse(null);
        setError(null);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bgGradient="linear(to-br, blue.50, white, purple.50)"
      minH="100vh"
      py={10}
    >
      <Container maxW="4xl">
        {/* Header */}
        <VStack spacing={3} textAlign="center" mb={10}>
          <Flex
            w={16}
            h={16}
            align="center"
            justify="center"
            bg="blue.600"
            color="white"
            rounded="full"
          >
            <Icon as={Mail} w={8} h={8} />
          </Flex>
          <Heading size="xl">Email Route Tracker</Heading>
          <Text color="gray.600">
            Track intermediate servers in email delivery chain
          </Text>
        </VStack>

        {/* Instructions */}
        <Box
          bgGradient="linear(to-r, blue.600, purple.600)"
          color="white"
          p={6}
          rounded="xl"
        >
          <Heading size="md" mb={4}>
            <Flex align="center">
              <Icon as={Send} mr={2} /> How to Use
            </Flex>
          </Heading>
          <VStack align="start" spacing={2}>
            <Text>1. Send an email to the address below</Text>
            <Text>2. Click "Track Email Servers" to analyze the route</Text>
          </VStack>
        </Box>

        {/* Email Details */}
        <Stack direction={["column", "row"]} spacing={6} mt={6}>
          <Box flex={1}>
            <Text fontWeight="medium">Subject Line:</Text>
            <Box
              bg="gray.50"
              p={3}
              rounded="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <Code>{projectConfig.subject}</Code>
            </Box>
          </Box>
          <Box flex={1}>
            <Text fontWeight="medium">Email Address:</Text>
            <Box
              bg="gray.50"
              p={3}
              rounded="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <HStack>
                <Icon as={Mail} color="gray.500" />
                <Code>{projectConfig.email}</Code>
              </HStack>
            </Box>
          </Box>
        </Stack>

        {/* Button */}
        <Box mt={6}>
          <Button
            w="100%"
            colorScheme="blue"
            onClick={handleTrackEmail}
            isDisabled={loading}
            leftIcon={loading ? <Spinner size="sm" /> : <Server />}
          >
            {loading ? "Analyzing Email Route..." : "Track Email Servers"}
          </Button>
        </Box>

        {/* Results */}
        <Box mt={6}>
          {error && (
            <Alert status="error" rounded="md" mb={6}>
              <AlertIcon />
              <Box>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Box>
            </Alert>
          )}

          {apiResponse && (
            <VStack align="stretch" spacing={6}>
              <HStack>
                <Icon as={CheckCircle} color="green.500" />
                <Heading size="md">Email Route Analysis</Heading>
              </HStack>

              <Stack direction={["column", "row"]} spacing={4}>
                <Box flex={1}>
                  <Text fontWeight="medium">From Email:</Text>
                  <Box
                    bg="blue.50"
                    p={3}
                    rounded="md"
                    border="1px solid"
                    borderColor="blue.200"
                  >
                    <Code>{apiResponse.fromEmail}</Code>
                  </Box>
                </Box>
                <Box flex={1}>
                  <Text fontWeight="medium">To Email:</Text>
                  <Box
                    bg="green.50"
                    p={3}
                    rounded="md"
                    border="1px solid"
                    borderColor="green.200"
                  >
                    <Code>{apiResponse.toEmail}</Code>
                  </Box>
                </Box>
              </Stack>

              <Box>
                <Text fontWeight="medium">Email Service Provider:</Text>
                <HStack
                  bg="purple.50"
                  p={3}
                  rounded="md"
                  border="1px solid"
                  borderColor="purple.200"
                >
                  <Badge colorScheme="purple">{apiResponse.ESP}</Badge>
                </HStack>
              </Box>

              <Box>
                <Text fontWeight="medium">
                  Intermediate Servers ({apiResponse.servers.length}):
                </Text>
                <VStack align="stretch" spacing={2} mt={2}>
                  {apiResponse.servers.map((server, index) => (
                    <HStack
                      key={index}
                      p={3}
                      bg="gray.50"
                      rounded="md"
                      border="1px solid"
                      borderColor="gray.200"
                      justify="space-between"
                    >
                      <HStack>
                        <Flex
                          w={8}
                          h={8}
                          align="center"
                          justify="center"
                          bg="gray.600"
                          color="white"
                          rounded="full"
                          fontSize="sm"
                        >
                          {index + 1}
                        </Flex>
                        <Code>{server}</Code>
                      </HStack>
                      <Icon as={Server} color="gray.500" />
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Box
                bg="blue.50"
                p={4}
                rounded="md"
                border="1px solid"
                borderColor="blue.200"
              >
                <Text>
                  Email routed through{" "}
                  <strong>
                    {apiResponse.servers.length} intermediate servers
                  </strong>{" "}
                  using <strong>{apiResponse.ESP}</strong> as the email service
                  provider.
                </Text>
              </Box>
            </VStack>
          )}

          {!apiResponse && !loading && !error && (
            <VStack py={10} color="gray.500">
              <Icon as={Server} boxSize={12} />
              <Text>
                Send an email and click the button above to track the route
              </Text>
            </VStack>
          )}
        </Box>

        {/* Footer */}
        <Text mt={10} textAlign="center" color="gray.500" fontSize="sm">
          Email Route Tracker - Analyze email delivery infrastructure
        </Text>
      </Container>
    </Box>
  );
};

export default EmailTracker;

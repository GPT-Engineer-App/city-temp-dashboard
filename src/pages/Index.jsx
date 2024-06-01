import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const toast = useToast();

  const fetchWeather = async () => {
    if (!city) {
      toast({
        title: "City name is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        toast({
          title: "City not found.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error fetching weather data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} flex="1" />
          <IconButton aria-label="Search weather" icon={<FaSearch />} onClick={fetchWeather} />
        </HStack>
        {weather && (
          <Box p={4} borderWidth="1px" borderRadius="lg" width="100%" textAlign="center">
            <Text fontSize="2xl">{weather.name}</Text>
            <Text fontSize="4xl">{weather.main.temp}°C</Text>
            <Text>{weather.weather[0].description}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;

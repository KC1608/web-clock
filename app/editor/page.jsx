"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import CodeEditor from "../../components/CodeEditor";
import Provider from "../provider";
import Link from "next/link";

function App() {
  return (
    <Provider>
      <Link href={"/"}>Home Screen</Link>
      <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
        <CodeEditor />
      </Box>
    </Provider>
  );
}

export default App;

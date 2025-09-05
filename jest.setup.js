// Jest setup file to include custom matchers from @testing-library/jest-dom
import "@testing-library/jest-dom";

// Polyfill TextEncoder and TextDecoder for Node.js test environment
import { TextEncoder, TextDecoder } from "util";
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder;
}

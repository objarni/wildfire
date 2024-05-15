import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        globals: true, // Enables global APIs like `describe` and `it`
        environment: 'node', // Specify the environment
        include: ['**/*test.ts'], // Custom regex for test files
        // exclude: [], // Custom regex for test files
    },
});

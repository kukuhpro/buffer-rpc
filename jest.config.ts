export default {
    clearMocks: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    globals: {
        "ts-jest": {
            "compiler": "ttypescript"
        }
    },
    moduleFileExtensions: [
        "js",
        "jsx",
        "ts",
        "tsx",
    ],
    roots: [
        "./test"
    ],
    setupFiles: [
        "./test/config.jest.ts"
    ],
    testEnvironment: "node",
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    }
};

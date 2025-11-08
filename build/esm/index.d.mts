declare const directlyTestMethod: () => string;
declare const kmTestTemplate: {
    example: {
        nestedTestMethod: () => string;
    };
};

export { kmTestTemplate as default, directlyTestMethod };

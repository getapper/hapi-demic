export const generateRouteIndex = () => `// METHODS
import methods from './methods';

// ROUTES
import routes from './routes';

export default () => routes().concat(methods());
`;

export const generateRoutesIndex = (routes) => `// ROUTES
${routes.map(r => `import ${r} from './${r}';`).join('\n')}

export default () => [
${routes.map(r => `  ...(${r}()),`).join('\n')}
];
`;

export const generateMethodsIndex = (methods) => `// METHODS
${methods.map(m => `import ${m} from './${m}';`).join('\n')}

export default () => [
${methods.map(m => `  ${m}(),`).join('\n')}
];
`;

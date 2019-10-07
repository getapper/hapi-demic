// HELPERS
import capitalize from 'root/helpers/capitalize';

export const generateRouteIndex = () => `// METHODS
import methods from './methods';

// ROUTES
import routes from './routes';

export default () => routes().concat(methods());
`;

export const generateRoutesIndex = (routes) => `// ROUTES
${routes.map(r => `import ${r
  .split('-')
  .map((s, index) => index === 0 ? s : capitalize(s))
  .join('')
} from './${r}';`).join('\n')}

export default () => [
${routes.map(r => `  ...(${r
  .split('-')
  .map((s, index) => index === 0 ? s : capitalize(s))
  .join('')
}()),`).join('\n')}
];
`;

export const generateMethodsIndex = (methods) => `// METHODS
${methods.map(m => `import ${m}Method from './${m}';`).join('\n')}

export default () => [
${methods.map(m => `  ${m}Method(),`).join('\n')}
];
`;

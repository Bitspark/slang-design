// Bitspark's imprint and privacy policy, published on the product website.
// The policy's #design section covers this site.
export const LEGAL = {
  imprint: 'https://slang.bitspark.com/imprint/',
  privacy: 'https://slang.bitspark.com/privacy/#design',
};

export const operators = [
  {
    name: 'Multiply',
    icon: '×',
    type: 'number',
    category: 'Math',
    description: 'Multiply two numbers. A small building block for bigger ideas.',
    input: '{ a: number, b: number }',
    output: 'number',
  },
  {
    name: 'Read CSV',
    icon: '≋',
    type: 'string',
    category: 'Data',
    description: 'Turn tabular text into a stream of structured records.',
    input: 'string',
    output: 'stream<map>',
  },
  {
    name: 'Filter',
    icon: '⋈',
    type: 'generic',
    category: 'Control',
    description: 'Keep the values that match your condition.',
    input: 'stream<T>',
    output: 'stream<T>',
  },
  {
    name: 'Format',
    icon: '{}',
    type: 'string',
    category: 'Data',
    description: 'Bring values together in a readable string.',
    input: 'map',
    output: 'string',
  },
  {
    name: 'Add',
    icon: '+',
    type: 'number',
    category: 'Math',
    description: 'Combine two numbers and emit their sum.',
    input: '{ a: number, b: number }',
    output: 'number',
  },
  {
    name: 'Boolean equal',
    icon: '=',
    type: 'boolean',
    category: 'Control',
    description: 'Find out whether two boolean values agree.',
    input: '{ a: boolean, b: boolean }',
    output: 'boolean',
  },
  {
    name: 'Decode JSON',
    icon: '{ }',
    type: 'generic',
    category: 'Data',
    description: 'Read a JSON string as a structured value.',
    input: 'string',
    output: 'T',
  },
  {
    name: 'Map to stream',
    icon: '⇉',
    type: 'generic',
    category: 'Data',
    description: 'Let each entry in a map flow through independently.',
    input: 'map<T>',
    output: 'stream<T>',
  },
  {
    name: 'Delay',
    icon: '◷',
    type: 'generic',
    category: 'Control',
    description: 'Give a value a little time before passing it on.',
    input: 'T',
    output: 'T',
  },
];

export const sources = [
  {
    name: 'slang-ui',
    role: 'The studio anatomy',
    detail:
      'Operator palettes, a graph canvas, an inspector, and an output console inform the studio example. Brand styling comes from the cloud and web family.',
    file: 'src/app/components/editor.component.html',
    sha: 'e4bb0c7fb13cc24bee2bc33c458c1031d6b32561',
    access: 'Public',
  },
  {
    name: 'slang-editor',
    role: 'The graph language',
    detail:
      'Roboto, compact rectangular nodes, typed ports, curved connections, and semantic type colors.',
    file: 'src/styles/studio.ts',
    sha: 'ed1fe3e93c1a26e9953694fd69ba882eb9fd0e6f',
    access: 'Public',
  },
  {
    name: 'slang.cloud',
    role: 'The application shell',
    detail:
      'Petrol actions, raspberry accents, charcoal toolbar, permanent navigation, blueprint cards and deployment tables.',
    file: 'src/theme.ts',
    sha: 'c5d49c23f044f93cf6e1b032f0276c5504942980',
    access: 'Private',
  },
  {
    name: 'bitspark.de',
    role: 'The public voice',
    detail:
      'Light Roboto Slab headlines, white space, blue hero sections, diagram-led storytelling and operator documentation.',
    file: 'scss/partials/_themes-b6k.scss',
    sha: '93ea37d72e78b6abd1b5aa3fc3d161ad3eeb7f02',
    access: 'Private',
  },
  {
    name: 'search.bitspark.de',
    role: 'Finding an operator',
    detail:
      'Documentation search and a small web-component example. This informs search behavior, not a separate visual theme.',
    file: 'README.md',
    sha: '767508cf5eba313b619f5371d6eb189d96afe8a0',
    access: 'Private',
  },
  {
    name: 'playground.tryslang.com',
    role: 'The hosted experience',
    detail:
      'Session-based playground infrastructure. It serves the editor rather than defining another independent visual language.',
    file: 'README.md',
    sha: '737813dc3b824a4c0e95c894e63a6ef97f25fc1d',
    access: 'Private',
  },
  {
    name: 'repo.bitspark.de',
    role: 'The operator collection',
    detail:
      'Generated bundles inform the library vocabulary. No independent website design was found.',
    file: 'README.md',
    sha: '0934da9f6ebb282f05b3fd1929e7f9b85f460af3',
    access: 'Private',
  },
  {
    name: 'slang-showcases',
    role: 'Practical applications',
    detail:
      'Integration examples rather than a reusable frontend. The sample applications here use new, fictional content.',
    file: '',
    sha: 'fb13578539340d0fba9fd3abf7696287b3fff904',
    access: 'Private',
  },
];

export function calculate(input, factor) {
  if (
    input === '' ||
    factor === '' ||
    !Number.isFinite(Number(input)) ||
    !Number.isFinite(Number(factor))
  )
    throw new Error('Enter a finite number in both fields.');
  const result = Number(input) * Number(factor);
  if (!Number.isFinite(result)) throw new Error('The result is too large. Try smaller numbers.');
  return result;
}

export function filterOperators(query = '', category = 'All') {
  const search = query.trim().toLocaleLowerCase();
  return operators.filter(
    (op) =>
      (category === 'All' || op.category === category) &&
      `${op.name} ${op.description} ${op.type}`.toLocaleLowerCase().includes(search),
  );
}

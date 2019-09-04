export default {
  name: 'v-container',
  booleans: [
    'align-self-baseline',
    'align-self-center',
    'align-self-content-center',
    'align-self-content-end',
    'align-self-content-space-around',
    'align-self-content-start',
    'align-self-end',
    'align-self-start',
    'grow',
    'shrink'
  ],
  strings: [
    'id',
    'tag'
  ],
  enums: [
    {name: 'grid-list-{size}', items: ['xs', 'sm', 'md', 'lg', 'xl']},
    {name: 'd-{type}', items: ['flex', 'block', 'inline-flex']},
  ]
}

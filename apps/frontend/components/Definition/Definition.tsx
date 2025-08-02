import React from 'react';
import glossaryData from '../../public/data/glossary.json';

const flattenTerms = () => {
  return glossaryData.flatMap(category =>
    category.terms.map(term => ({
      term: term.term.toLowerCase(),
      definition: term.definition,
    }))
  );
};

const termMap = new Map(flattenTerms().map(t => [t.term, t.definition]));

type Props = {
  term: string;
  text: string;
};

const Definition: React.FC<Props> = ({ term,  text }) => {
  const def = termMap.get(term.toLowerCase());

  if (!def) {
    return <span style={{ color: 'red' }}>{text}</span>;
  }

  return (
    <span title={def} style={{ borderBottom: '1px dotted #999', cursor: 'help' }}>
      {text}
    </span>
  );
};

export default Definition;

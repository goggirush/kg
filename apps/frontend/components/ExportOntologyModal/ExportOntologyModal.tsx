import React, { useState } from 'react';
import { Writer, DataFactory, Parser, Quad } from 'n3';
import Modal from '../Modal/Modal.tsx';
import Input from '../Input/Input.tsx';
import RadioButton from '../RadioButton/RadioButton.tsx';
import Accordion from '../Accordion/Accordion.tsx';
import Button from '../Button/Button.tsx';


type ExportOntologyModalProps = {
};

const { namedNode, literal } = DataFactory;

const ExportOntologyModal: React.FC<ExportOntologyModalProps> = ({ edges, nodes, isOpen, onClose }) => {
  const [exportFileName, setExportFileName] = useState('');
  const [exportFormat, setExportFormat] = useState('ttl');
  const [exportInferred, setExportInferred] = useState('false');

    const exportFormats = [
      { label: 'Turtle (.ttl)', value: 'ttl' },
      { label: 'JSON', value: 'json' }
    ];
  
     const inferredDataOptions = [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' }
    ];

    const exportToTurtle = () => {
        const writer = new Writer({
          prefixes: {
            ex: 'http://example.org/',
            rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            owl: 'http://www.w3.org/2002/07/owl#',
          },
          format: 'Turtle',
          explicit: true,
        });
    
        const iri = (label: string) =>
          `http://example.org/${label.replace(/^"|"$/g, '').replace(/[^a-zA-Z0-9]/g, '_')}`;
    
        const hasTypeEdge = new Set<string>();
    
        // Pass 1: Track existing is_a edges (which become rdf:type)
        edges.forEach((edge) => {
          if (edge.label === 'is_a') {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            if (sourceNode) {
              const label = sourceNode.data?.label?.replace(/^"|"$/g, '').trim();
              if (label) {
                hasTypeEdge.add(label);
              }
            }
          }
        });
    
        // Pass 2: Declare node types
        nodes.forEach((node) => {
          const label = node.data?.label?.replace(/^"|"$/g, '').trim();
          if (!label) return;
    
          const subject = namedNode(iri(label));
    
          if (node.type === 'class') {
            writer.addQuad(subject, namedNode('rdf:type'), namedNode('owl:Class'));
          }
    
          if (node.type === 'individual' && !hasTypeEdge.has(label)) {
            writer.addQuad(subject, namedNode('rdf:type'), namedNode('owl:NamedIndividual'));
          }
        });
    
        // Pass 3: Add edges
        edges.forEach((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return;
    
          const subject = namedNode(iri(sourceNode.data?.label || 'Unknown'));
    
          const predicate =
            edge.label === 'is_a'
              ? namedNode('rdf:type')
              : namedNode(iri(edge.label || 'relatedTo'));
    
          const object =
            targetNode.type === 'literal'
              ? literal(targetNode.data?.label?.replace(/^"|"$/g, '') || '')
              : namedNode(iri(targetNode.data?.label || 'Unknown'));
    
          writer.addQuad(subject, predicate, object);
        });
    
        writer.end((error, result) => {
          if (error) {
            alert('Failed to generate Turtle');
            console.error(error);
            return;
          }
    
          const blob = new Blob([result], { type: 'text/turtle' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'ontology-export.ttl';
          a.click();
          URL.revokeObjectURL(url);
        });
      };
  
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} title="Export ontology">
            <h4>File information</h4>
            <div>
                <Input
                    label="File name:"
                    value={exportFileName}
                    onChange={(e) => setExportFileName(e.target.value)}
                    placeholder="Name your file to be exported"
                />
            </div>
            <div>
                <RadioButton
                    label="Format:"
                    name="format"
                    options={exportFormats}
                    selectedValue={exportFormat}
                    onChange={setExportFormat}
                />
            </div>

            <div>
                <RadioButton
                    label="Inferred data:"
                    name="inferred"
                    options={inferredDataOptions}
                    selectedValue={exportInferred}
                    onChange={setExportInferred}
                />
            </div>

            <h4>Content: </h4>
            <Accordion title={`Edges (${edges.length})`}>
                <h6>Unique edges:</h6>
                {
                    [...new Set(edges.map(edge => edge.label))].map((label, i) => (
                        <div key={i}>{label}</div>
                    ))
                }
            </Accordion>
            <Accordion title={`Nodes (${nodes.length})`}>
                <h6>Classes:</h6>
                {
                    [...new Set(nodes.map(node => node.data))]
                        .filter(data => data.nodeType === "class")
                        .map((data, i) => (
                            <div key={i}>{data.label}</div>
                        ))
                }
                <h6>Individuals/Instances:</h6>
                {
                    [...new Set(nodes.map(node => node.data))]
                        .filter(data => data.nodeType === "individual")
                        .map((data, i) => (
                            <div key={i}>{data.label}</div>
                        ))
                }
                <h6>Literals:</h6>
                {
                    [...new Set(nodes.map(node => node.data))]
                        .filter(data => data.nodeType === "literal")
                        .map((data, i) => (
                            <div key={i}>{data.label}</div>
                        ))
                }
            </Accordion>

            <Accordion title={`Orphans`}>
                {
                    [...new Set(nodes.map(node => node.data))]
                        .filter(data => data.isUnconnected === true)
                        .map((data, i) => (
                            <div key={i}>{data.label}</div>
                        ))
                }
            </Accordion>
            <Button text="Export" onClick={exportToTurtle} />
        </Modal>
    );
};

export default ExportOntologyModal;

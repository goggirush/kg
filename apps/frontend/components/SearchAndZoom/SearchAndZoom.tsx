import { useState } from 'react';
import { useReactFlow, useStore } from '@xyflow/react';
import Button from '../Button/Button.tsx';
import Input from '../Input/Input.tsx';

const SearchAndZoom = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { setCenter } = useReactFlow();
  const nodes = useStore((state) => state.nodes);

  const handleSearch = () => {
    const match = nodes.find((node) =>
      node.data?.label?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (match) {
      const { x, y } = match.position;
      setCenter(x, y, { zoom: 2, duration: 800 });
    } else {
      alert('No matching node found');
    }
  };

  return (
    <div style={{display: 'flex', gap: '10px'}}>
      <Input
        placeholder="Search node"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        styled={false}
      />
      <Button style={{height: '33px'}} onClick={handleSearch} text="Search"/>
    </div>
  );
}

export default SearchAndZoom;
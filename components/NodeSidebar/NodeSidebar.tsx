import React from 'react';
import { useGraphUI } from '../../state/useGraphUI.ts';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getConnectedEdgesWithDirection } from '../../utils/helper.ts';
import styles from './NodeSidebar.module.scss';
import type { Node, Edge } from '@xyflow/react';

type NodeSidebarProps = {
  nodes: Node[];
  edges: Edge[];
  onClose: () => void;
};

const NodeSidebar = ({ nodes, edges, onClose }: NodeSidebarProps) => {
  const selectedNode = useGraphUI((state) => state.selectedNode);
  const connected = getConnectedEdgesWithDirection(selectedNode.id, nodes, edges);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className={styles.container}>
        <div style={{display: 'flex', justifyContent: 'end'}}>
          <FontAwesomeIcon icon="x" onClick={onClose}/>
        </div>
                      <h4 style={{ marginBottom: '0px' }} className={styles.tableItem}>Information</h4>

        <div className={`${styles.selectedNodeContainer}`}>
          <div className={styles.flexContainer}>
            <div className={styles.flexItem}>
              <span className={styles.key}>Type:</span>
              <span className={styles.value}>{selectedNode?.type}</span>
            </div>
            <div className={styles.flexItem}>
              <span className={styles.key}>Label:</span>
              <span className={styles.value}>{selectedNode?.data?.label}</span>
            </div>
            <div className={styles.flexItem}>
              <span className={styles.key}>Orphan:</span>
              <span className={styles.value}>{selectedNode?.data?.isUnconnected ? 'True' : 'False'}</span>
            </div>
          </div>
          <div className={styles.flexContainer}>
            <div className={styles.flexItem}>
              <span className={styles.key}>ID:</span>
              <span className={styles.value}>{selectedNode.id}</span>
            </div>
            <div className={styles.flexItem}>
              <span className={styles.key}>Parent:</span>
              <span className={styles.value}>{selectedNode?.data?.isParentClass ? 'True' : 'False'}</span>
            </div>
          </div>
          {/*isUnconnected isParentClass}*/}


        </div>
        < hr style={{ margin: '20px 0px' }} />


        {selectedNode?.data?.datatypeProperties &&
          <>
            <div>
              <h4 style={{ marginBottom: '0px' }} className={styles.tableItem}>Attributes</h4>
              <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                  <div className={styles.tableItem}>Name</div>
                  <div className={styles.tableItem}>Type</div>
                </div>
                {selectedNode?.data?.datatypeProperties?.map((property) => (
                  <div className={styles.tableRow}>
                    <div className={styles.tableItem}>{property.label}</div>
                    <div className={styles.tableItem}>{property.range}</div>
                  </div>
                ))}
              </div>
            </div>
            < hr style={{ margin: '20px 0px' }} />
          </>
        }
          <>
            <h4 style={{ marginBottom: '0px' }}>Connections</h4>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <div className={styles.tableItem}>Label</div>
                <div className={styles.tableItem}>Direction</div>
                <div className={styles.tableItem}>Node</div>
              </div>
              {connected.map(({ direction, node, edge }) => (


                <div className={styles.tableRow}>
                  <div className={styles.tableItem}>{edge.label}</div>
                  <div className={styles.tableItem}>
                    {direction === 'outgoing' ? <FontAwesomeIcon icon="arrow-right-long" /> : <FontAwesomeIcon icon="arrow-left-long" />}
                  </div>

                  <div className={styles.tableItem}>{node.data.label}</div>
                </div>

              ))}
            </div>
          </>
      </div>
    </motion.div>
  );
};

export default NodeSidebar;
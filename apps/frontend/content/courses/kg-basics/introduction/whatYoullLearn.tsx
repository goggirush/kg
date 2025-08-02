import BulletList from '@/components/BulletList/BulletList';
import styles from '@/components/BulletList/BulletList.module.scss';
import Definition from '@/components/Definition/Definition';

export default function WhatYoullLearnSlide() {
    return (

        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
            <div style={{ flex: .4, alignSelf: 'center' }}>
                <img
                    src={"/images/courses/kg-basics/introduction/whatyoullearn.png"}
                    alt="Intro graph"
                    width="100%"
                />
            </div>
            <div style={{ flex: .5 }}>
                <h2>What you'll learn</h2>
                <p>
                    This learning journey will guide you through the core ideas behind knowledge graphs — and how they can be applied at Scania.
                </p>

                <p>Along the way, you’ll learn how to:</p>
                <BulletList>
                    <li className={styles.green}>Understand what a knowledge graph is and how it models real-world things</li>
                    <li className={styles.orange}><span>Explore how we can use <Definition term="node" text="nodes" /> and relationships to connect Scania’s data</span></li>
                    <li className={styles.default}><span>Learn about <Definition term="ontology" text="ontologies" /> — the rules and structure behind smart data</span></li>
                    <li className={styles.purple}>Write simple queries to find answers in a knowledge graph</li>
                </BulletList>


                <p>
                    Through real-world examples and interactive tools, you’ll gain a practical understanding of how knowledge graphs support smarter systems, better insights, and more connected solutions across Scania.
                </p>
                <p>
                    Whether you’re new to the topic or just need a clearer mental model, you’ll finish this course with the confidence to think in graphs — and use them effectively.
                </p>
            </div>

        </div>
    );
}      

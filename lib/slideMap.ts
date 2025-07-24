export const slideComponents = {
  "kg-basics": {
    introduction: {
      welcome: () => import("@/content/courses/kg-basics/introduction/welcome"),
      whatYoullLearn: () => import("@/content/courses/kg-basics/introduction/whatYoullLearn"),
      challengeAtScania: () => import("@/content/courses/kg-basics/introduction/challengeAtScania"),
      introQuiz: () => import("@/content/courses/kg-basics/introduction/introQuiz"),
      bridgeToRdf: () => import("@/content/courses/kg-basics/introduction/bridgeToRdf"),
    },
    rdf: {
      rdfIntro: () => import("@/content/courses/kg-basics/rdf/rdfIntro"),
      anatomyOfATriple: () => import("@/content/courses/kg-basics/rdf/anatomyOfATriple"),
      whyTriplesMatter: () => import("@/content/courses/kg-basics/rdf/whyTriplesMatter"),
      exerciseBuildATriple: () => import("@/content/courses/kg-basics/rdf/exerciseBuildATriple"),
      URIsAndLinkedData: () => import("@/content/courses/kg-basics/rdf/URIsAndLinkedData"),
      fullURIsNamespacesAndPrefixes: () => import("@/content/courses/kg-basics/rdf/fullURIsNamespacesAndPrefixes"),
      introRDFQuiz: () => import("@/content/courses/kg-basics/rdf/introRDFQuiz"),
      rdfRecap: () => import("@/content/courses/kg-basics/rdf/rdfRecap"),
    },
    ontologies: {
      ontologiesIntro: () => import("@/content/courses/kg-basics/ontologies/ontologiesIntro"),
      ontologiesBlueprint: () => import("@/content/courses/kg-basics/ontologies/ontologiesBlueprint"),
      exerciseBuildOntologyStatement: () => import("@/content/courses/kg-basics/ontologies/exerciseBuildOntologyStatement"),
      ontologyVsData: () => import("@/content/courses/kg-basics/ontologies/ontologyVsData"),
      ontologyRealWorldAnalogy: () => import("@/content/courses/kg-basics/ontologies/ontologyRealWorldAnalogy"),
      exerciseBuildTinyOntology: () => import("@/content/courses/kg-basics/ontologies/exerciseBuildTinyOntology"),
      introOntologyQuiz: () => import("@/content/courses/kg-basics/ontologies/introOntologyQuiz"),
      ontologyRecap: () => import("@/content/courses/kg-basics/ontologies/ontologyRecap"),
    },
    knowledgeGraphs: {
      knowledgeGraphsIntro: () => import("@/content/courses/kg-basics/knowledgeGraphs/knowledgeGraphsIntro"),
      knowledgeGraphsWhereAreTheyUsed: () => import("@/content/courses/kg-basics/knowledgeGraphs/knowledgeGraphsWhereAreTheyUsed"),
      knowledgeGraphsWhyUseThem: () => import("@/content/courses/kg-basics/knowledgeGraphs/knowledgeGraphsWhyUseThem"),
      knowledgeGraphsDisconnectedData: () => import("@/content/courses/kg-basics/knowledgeGraphs/knowledgeGraphsDisconnectedData"),
      knowledgeGraphsUseOntologies: () => import("@/content/courses/kg-basics/knowledgeGraphs/knowledgeGraphsUseOntologies"),
      introKnowledgeGraphsQuiz: () => import("@/content/courses/kg-basics/knowledgeGraphs/introKnowledgeGraphsQuiz"),
      knowledgeGraphsRecap: () => import("@/content/courses/kg-basics/knowledgeGraphs/knowledgeGraphsRecap")
    },
    querying: {
      queryingIntro: () => import("@/content/courses/kg-basics/querying/queryingIntro"),
      queryingPrepareFirstQuery: () => import("@/content/courses/kg-basics/querying/queryingPrepareFirstQuery"),
      queryingFilterQuery: () => import("@/content/courses/kg-basics/querying/queryingFilterQuery"),
      queryingDistinct: () => import("@/content/courses/kg-basics/querying/queryingDistinct"),
      queryingFilter: () => import("@/content/courses/kg-basics/querying/queryingFilter"),
      exerciseSortSPARQLQuery: () => import("@/content/courses/kg-basics/querying/exerciseSortSPARQLQuery"),
      introQueryingQuiz: () => import("@/content/courses/kg-basics/querying/introQueryingQuiz"),
      queryingRecap: () => import("@/content/courses/kg-basics/querying/queryingRecap"),

    }
  },
  "sparql-fundamentals": {
    introduction: {
      welcome: () => import("@/content/courses/sparql-fundamentals/introduction/sparqlFundamentalsWelcome"),
    },
  },

};
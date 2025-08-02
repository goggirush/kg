export async function runStardogQuery(sparqlQuery: string) {
    const endpoint = 'https://devtest-scania.stardog.cloud:443/gmirmz_test/query';
    const username = 'gmirmz_service_user';
    const password = 'T15Gsu4h!5imba1337App!';
  
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/sparql-query',
        'Accept': 'application/sparql-results+json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      },
      body: sparqlQuery
    });
  
    if (!response.ok) {
      throw new Error(`Stardog query failed: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.results.bindings;
  }
  
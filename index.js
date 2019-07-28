const SharedState = require("shared-state-js");
const { strMapToObj, objToStrMap } = require('obj2map');
const fetch = require('node-fetch');

// Create a shared-state object
const myState = new SharedState({author: 'marcos'})

const httpSharedStateMerge = (table) => {
    const hostUrl = `http://thisnode.info/cgi-bin/shared-state/${table}`;
    return fetch(hostUrl, {
        method: 'POST',
        body: JSON.stringify(strMapToObj(myState.show(table)))
    })
    .then(res => res.json())
    .catch(err => console.log('Http merge error', err));
}

async function runExample(){
    //Merge node data into my shared-state
    const nodeData = await httpSharedStateMerge('dnsmasq-hosts');
    myState.merge(objToStrMap(nodeData) ,false,'dnsmasq-hosts');
    //Show results
    myState.show('dnsmasq-hosts').forEach(console.log)
}

runExample();

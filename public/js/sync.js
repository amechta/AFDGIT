
function WriteJsonOnFile(data,filename){
    const fs = require('fs');

    fs.writeFile(filename, JSON.stringify(data), (err) => {
    
        if (err) console.log(err);
    
        console.log('Data has been written to file.txt');
    
    });
}


function WriteTextOnFile(data,filename){
    const fs = require('fs');

    fs.writeFile(filename, data, (err) => {
    
        if (err) console.log(err);
    
        console.log('Data has been written to file.txt');
    
    });
}


function GetFileContentFromGitBranch(file_path,file_name,branch,issueId){
const request = require('request');
const apiEndpoint= "https://api.github.com/repos/amechtaO/AFD/contents";
const apiToken="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";

//const file_name="CreateEventTest.feature";

//const file_path = "src/test/resources/features/event/create";

const full_path=apiEndpoint+"/"+file_path+"/"+file_name+"?ref="+branch;

console.log(full_path);
console.log(apiToken);


const headers = {
   'Authorization': `Bearer ${apiToken}`,
    'Contenet-type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'amechta'
};

//const headers= {

  //  'User-Agent': 'amechta',

    //'Authorization': `Token ${apiToken}`

  //};

request.get({url:full_path,headers},(error,response,body)=>{


if(error){
    console.log(error);
}else{

    const data = JSON.parse(body);
    //console.log(data);

let buff = new Buffer(data.content,'Base64');
let text = buff.toString('ascii');
WriteTextOnFile(text,"Lastmodifiedfile.txt");

console.log(text);
UpdateJiraDescription(text,issueId);
}


});

}

function GetInfoGitFromJira(issueId){

    
// This code sample uses the 'node-fetch' library:

// https://www.npmjs.com/package/node-fetch

const fetch = require('node-fetch');

const path ='https://afd-git-dev.atlassian.net/rest/api/2/issue/'+issueId+'?fields=summary,customfield_10200,customfield_10201';

fetch(path, {

  method: 'GET',

  headers: {
    'Authorization': `Basic ${Buffer.from(
    'amechta@afdtech.com:4QkgemNJZma5Lo7ClJ3LA7CD'
    ).toString('base64')}`,
    'Accept': 'application/json',
    'X-Atlassian-Token': 'no-check'
}

})

  .then(response => {


    return response.json();

  })

  .then(data =>{ 
    
    const branch = data.fields.summary;
    const file_name = data.fields.customfield_10200;
    const file_path = data.fields.customfield_10201;
    
    GetFileContentFromGitBranch(file_path,file_name,branch,issueId)
  
  })

  .catch(err => console.error(err));

}


function UpdateJiraDescription(text,issueId){
// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

const bodyData = '{"fields":{"description":"'+text+'"}}';

const path ='https://afd-git-dev.atlassian.net/rest/api/2/issue/'+issueId;


fetch(path, {
  method: 'PUT',
  headers: {
    'Authorization': `Basic ${Buffer.from(
    'amechta@afdtech.com:4QkgemNJZma5Lo7ClJ3LA7CD'
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Atlassian-Token': 'no-check'
},
  body: bodyData
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));
}


function reload(){AP.navigator.reload();}

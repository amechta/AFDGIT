function AddJiraAttachements(filePath){
    // This code sample uses the 'node-fetch' and 'form-data' libraries:
 // https://www.npmjs.com/package/node-fetch
 // https://www.npmjs.com/package/form-data
 const fetch = require('node-fetch');
 const FormData = require('form-data');
 const fs = require('fs');

 //const filePath = './Repo/Git.txt';
 const form = new FormData();
 const stats = fs.statSync(filePath);
 const fileSizeInBytes = stats.size;
 const fileStream = fs.createReadStream(filePath);

 form.append('file', fileStream, {knownLength: fileSizeInBytes});

 fetch('https://afd-dev.atlassian.net/rest/api/3/issue/DT-65/attachments', {
     method: 'POST',
     body: form,
     headers: {
         'Authorization': `Basic ${Buffer.from(
         'amechta@afdtech.com:GR6Ktple3oZDokZ8d62J9604'
         ).toString('base64')}`,
         'Accept': 'application/json',
         'X-Atlassian-Token': 'no-check'
     }
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


function GetFileContentFromGit(file_path){
const request = require('request');
const apiEndpoint= "https://api.github.com/repos/dfrancesAfd/MATE_BACK/contents";
const apiToken="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";

//const file_name="CreateEventTest.feature";

//const file_path = "src/test/resources/features/event/create";

const full_path=apiEndpoint+"/"+file_path;

//console.log(full_path);
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

let buff = new Buffer(data.content,'Base64');
let text = buff.toString('ascii');
WriteTextOnFile(text,"Lastmodifiedfile.txt");
 AddJiraAttachements("Lastmodifiedfile.txt");

console.log(text);

}


});

}

  function GetLastCommitFromGitOCTOKIT(){
   

        const { Octokit } = require("@octokit/rest");
          const octokit = new Octokit({
      
              auth: "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"
      
          });
      
      
      
          const  owner = "dfrancesAfd";
          const repo = "MATE_BACK";
      
          const branch = "dev";
      
          const res ="";
      
         octokit.repos.listCommits({ owner, repo, sha: branch })
      
          .then(({ data }) => {
            const fs = require('fs');

fs.writeFile('result.txt', data, (err) => {

    if (err) console.log(err);

    console.log('Data has been written to file.txt');

});
              const mergeCommits = data.filter(({ commit }) => commit.message.startsWith("Merge"))
      
              if (mergeCommits.length > 0) {
      
                  const lastMergeCommit = mergeCommits[mergeCommits.length - 1];
                    
                    
      
                  // Use the lastMergeCommit as needed
      
              }else{
      
                  //handle no merge commits found
      
              }
      
          })
      
          .catch((error) => {
      
              // handle error
      
          });
      
    
          
     


    }

    function GetChangedfilesfromlastcommit(lastcommitsha){
        const request = require('request');
    const apiEndpoint= "https://api.github.com/repos/dfrancesAfd/MATE_BACK/commits/dev?sha="+lastcommitsha;
    const apiToken="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";
    
    
    
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
    
    request.get({url:apiEndpoint,headers},(error,response,body)=>{
    
    
    if(error){
        console.log(error);
    }else{
    
        const data = JSON.parse(body);
        //WriteJsonOnFile(data);
        const Changedfiles=data.files;

        Changedfiles.forEach(element => {

            console.log("the file name is is " + element.filename);
            WriteJsonOnFile(element.filename,"GetChangedfilesfromlastcommit.txt");
            GetFileContentFromGit(element.filename);
          });
       // console.log(Changedfiles);
            
    
    }
    
    
    });
  
    }    
    
function GetLastCommitFromGit(){
    const request = require('request');
const apiEndpoint= "https://api.github.com/repos/dfrancesAfd/MATE_BACK/branches/dev";
const apiToken="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";



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

request.get({url:apiEndpoint,headers},(error,response,body)=>{


if(error){
    console.log(error);
}else{

    const data = JSON.parse(body);
    const lastcommitsha=data.commit.sha;
    console.log(lastcommitsha);
    GetChangedfilesfromlastcommit(lastcommitsha);
    //WriteJsonOnFile(data.files);

}


});

} 


module.exports ={GetFileContentFromGit,GetLastCommitFromGit} 
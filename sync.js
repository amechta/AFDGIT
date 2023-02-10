const { isNull } = require('util');

function lines(text) {  

  return text.split('\n');

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
    
        console.log('Data has been written to '+filename);
    
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
//UpdateJiraDescription(text,issueId);
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
    'amechta@afdtech.com:ATATT3xFfGF0xbq82cDKvG7Qxm2NdCTjcHNxmTUE1cBC3AIWJANq1RbS0gTOALDWczLHNDUDCKTfIWGlbNjFetD_mlyXsDky_ReIjHIWduXyGocEdSAazF9Nv_vqt64AX8BpeyGHQehyfu91BUcGPrEKWTFhxTWyCxJtoKiEuOSojL4aIElCMto=43822627'
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
const code= '"{code:title=Detailed Results|theme=FadeToGrey|linenumbers=true|language=javascript|firstline=0001|collapse=true}'+text.replace(/\n/g, "\\n")+'{code}"';
const bodyData = `{"fields":{"description":"{code:title=Detailed Results|theme=FadeToGrey|linenumbers=true|language=javascript|firstline=0001|collapse=true}`+text.replace(/\n/g, "\\n").replace(/"/g, '\\"')+`{code}"}}`;
console.log(bodyData);
const path ='https://afd-git-dev.atlassian.net/rest/api/2/issue/'+issueId;


fetch(path, {
  method: 'PUT',
  headers: {
    'Authorization': `Basic ${Buffer.from(
    'amechta@afdtech.com:ATATT3xFfGF0xbq82cDKvG7Qxm2NdCTjcHNxmTUE1cBC3AIWJANq1RbS0gTOALDWczLHNDUDCKTfIWGlbNjFetD_mlyXsDky_ReIjHIWduXyGocEdSAazF9Nv_vqt64AX8BpeyGHQehyfu91BUcGPrEKWTFhxTWyCxJtoKiEuOSojL4aIElCMto=43822627'
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
 function CreateGherkin(code,file_name,file_path,summary){

  // This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

//const bodyData = '{ "update": {},"fields": {"summary": "Main order flow broken","issuetype": {"id": "10047"},"project": {"id": "10023"},"customfield_10200": "'+file_name+'","customfield_10201": "'+file_path+'","customfield_10202": "Oui","description":"{code:title=Detailed Results|theme=FadeToGrey|linenumbers=true|language=javascript|firstline=0001|collapse=true} '+code.replace(/\n/g, "\\n")+'{code}"}}';
const bodyData = '{ "update": {},"fields": {"summary": "'+summary+'","issuetype": {"id": "10047"},"project": {"id": "10023"},"customfield_10200": "'+file_name+'","customfield_10201": "'+file_path+'","customfield_10202": "Oui"}}';



//console.log(bodyData);
//console.log("create gherkin function");

fetch('https://afd-git-dev.atlassian.net/rest/api/3/issue', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
    'amechta@afdtech.com:ATATT3xFfGF0xbq82cDKvG7Qxm2NdCTjcHNxmTUE1cBC3AIWJANq1RbS0gTOALDWczLHNDUDCKTfIWGlbNjFetD_mlyXsDky_ReIjHIWduXyGocEdSAazF9Nv_vqt64AX8BpeyGHQehyfu91BUcGPrEKWTFhxTWyCxJtoKiEuOSojL4aIElCMto=43822627'
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Atlassian-Token': 'no-check'
},
  body: bodyData
})
  .then(response => {

    return response.json();
  })
  .then(async data =>{ console.log(data.key);await UpdateJiraDescription(code,data.key);})
  .catch(err => console.error(err));
 }  

 function GetDirectorycontent(path){
  const request = require('request');
  const apiEndpoint= "https://api.github.com/repos/dfrancesAfd/MATE_BACK/contents/"+path+"?ref=dev";
  const apiToken="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";

  
  //const full_path=apiEndpoint+"/"+file_path+"/"+file_name+"?ref="+branch;
  
  //console.log(full_path);
  //console.log(apiToken);
  
  
  const headers = {
     'Authorization': `Bearer ${apiToken}`,
      'Contenet-type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'amechta'
  };

  
  request.get({url:apiEndpoint,headers},(error,response,body)=>{
  
  
  if(error){
      console.log(error);
  }else{
  
      const data = JSON.parse(body);
      //console.log(data);
      const fs = require('fs');
      var out = fs.createWriteStream("GherkinGit.txt", { flags : 'a' });

      data.forEach(function(dir) { 
        
        let dirname = dir.name;
        if(dirname.includes(".feature")){ 
          //console.log(dirname+" is   a gherkin");
        
          out.write(dirname+";"+dir.path+"\n", 'utf-8');

          GetFileContentFromGitBranchinfile(dir.name,dir.path,"dev","gherkintitle.txt");

        } 
        else{ //console.log(dirname+" is  a directory ")
      
        GetDirectorycontent(dir.path);
      
      } 
        //console.log(dir.path); 
      });
      out.end();
 // let buff = new Buffer(data.content,'Base64');
  //let text = buff.toString('ascii');
  //WriteTextOnFile(text,"Lastmodifiedfile.txt");
  
  //console.log(text);

  }
  
  
  });
  
  }

async function GetGherkinsInProgress(){
// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

const bodyData = `{
  "expand": [
    "names",
    "schema",
    "operations"
  ],
  "jql": "project = MATE and issuetype = gherkin and status in ('Developpement en cours 2' , 'Developpement à valider 2', 'Développement à valider 2')",
  "fields": [
    "summary"
  ]

}`;

const response = await fetch('https://afd-git-dev.atlassian.net/rest/api/3/search', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
    'amechta@afdtech.com:ATATT3xFfGF0xbq82cDKvG7Qxm2NdCTjcHNxmTUE1cBC3AIWJANq1RbS0gTOALDWczLHNDUDCKTfIWGlbNjFetD_mlyXsDky_ReIjHIWduXyGocEdSAazF9Nv_vqt64AX8BpeyGHQehyfu91BUcGPrEKWTFhxTWyCxJtoKiEuOSojL4aIElCMto=43822627'
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
   // const data = JSON.parse(response.total);
    return response.json();
  })
  .then(data =>{
     console.log("Le total est : "+data.total);
     const gherkins = data.issues;
     //console.log("issue : "+gherkins);
     const fs = require('fs');
      var out = fs.createWriteStream("GherkinJira.txt", { flags : 'a' });
      
      const fsj = require('fs');
      var outj = fsj.createWriteStream("GherkinJirakeys.txt", { flags : 'a' });

      gherkins.forEach(function(issue) { 
        
        let issuekey = issue.fields.summary;
        
        //console.log("issue : "+issue.key);
         
        
          out.write(issuekey+"\n", 'utf-8');
          outj.write(issuekey+";"+issue.key+"\n", 'utf-8');
        
        //console.log(dir.path); 
      });
      out.end();
      outj.end();
    return "done";
 
    
    })
  .catch(err => console.error(err));
} 

function GetFileContentFromGitBranchinfile(file_name,file_path,branch,res_file){
  const request = require('request');
  const apiEndpoint= "https://api.github.com/repos/dfrancesAfd/MATE_BACK/contents";
  const apiToken="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";
  
  //const file_name="CreateEventTest.feature";
  
  //const file_path = "src/test/resources/features/event/create";
  
  const full_path=apiEndpoint+"/"+file_path+"?ref="+branch;
  
  //console.log(full_path);
  //console.log(apiToken);
  
  
  const headers = {
     'Authorization': `Bearer ${apiToken}`,
      'Contenet-type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'amechta'
  };
  
  
  request.get({url:full_path,headers},(error,response,body)=>{
  
  
  if(error){
      console.log(error);
  }else{
  
      const data = JSON.parse(body);
      //console.log(data);
  
  let buff = new Buffer(data.content,'Base64');
  let text = buff.toString('ascii');
  let filelines = lines(text);
  //WriteTextOnFile(text,file_name+".txt");
  let gherkinname = filelines[0].split(':'); 
  //console.log("fichier : "+file_name+" nom : "+gherkinname[1]);
  
  const fs = require('fs');
  var out = fs.createWriteStream(res_file, { flags : 'a' });

    
      //out.write(gherkinname[1]+";"+file_path+";"+file_name+"\n", 'utf-8');
        out.write(gherkinname[1]+"\n", 'utf-8'); 
  out.end();

  const fs1 = require('fs');
  var out1 = fs1.createWriteStream("inter.txt", { flags : 'a' });

    
      //out.write(gherkinname[1]+";"+file_path+";"+file_name+"\n", 'utf-8');
        out1.write(gherkinname[1]+";"+file_path+";"+file_name+"\n", 'utf-8');
  out.end();
  }
  
  
  });
  
  }

  function syncReadFile(filename) {
    const {readFileSync} = require('fs');
    const contents = readFileSync(filename, 'utf-8');
  
    const arr = contents.split(/\r?\n/);
  
    //console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']
  
    return arr;
  }

  function JiraToGitSync(file_path,file_name,summary){
    const request = require('request');
    const apiEndpoint= "https://api.github.com/repos/dfrancesAfd/MATE_BACK/contents";
    const apiToken="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";
    
    //const file_name="CreateEventTest.feature";
    
    //const file_path = "src/test/resources/features/event/create";
    
    const full_path=apiEndpoint+"/"+file_path+"?ref=dev";
    
    console.log(full_path);
    //console.log(apiToken);
    
    
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
    
    request.get({url:full_path,headers},async (error,response,body)=>{
    
    
    if(error){
        console.log(error);
    }else{
    
        const data = JSON.parse(body);
        //console.log("sync function");
    
    let buff = new Buffer(data.content,'Base64');
    let text = buff.toString('ascii');
    //WriteTextOnFile(text,"Lastmodifiedfile.txt");
    await CreateGherkin(text,file_name,file_path,summary);
    //console.log(text);
    //UpdateJiraDescription(text,issueId);
    }
    
    
    });
    
    }

function GitJiraCompare(){

 // console.log(GetGherkinsInProgress());

  let  GherkinJira= syncReadFile("GherkinJira.txt");
  let  GherkinGit= syncReadFile("gherkintitle.txt");
  let  GherkinDetails= syncReadFile("inter.txt");
  let  JiraDetails= syncReadFile("GherkinJirakeys.txt");

  
  let areEqual = true;


  if (GherkinJira.length !== GherkinGit.length) {
    
    console.log("Jira lenght = "+GherkinJira.length);
    console.log("Git lenght = "+GherkinGit.length);
    
    if (GherkinJira.length > GherkinGit.length){ 
      //let difference = GherkinJira.filter(x =>!GherkinGit.includes(x));
      let difference = arrdiff(GherkinJira,GherkinGit);
      //console.log("difference using new funtion "+difference.length);
      //console.log("difference lenght = "+difference.length);

      difference.forEach(function(JiraIssue) { 
        //console.log("trouver "+JiraIssue); 
        JiraDetails.forEach(function(JD) { 
        
        
          let jiraD = JD.split(";");
          let jiraname = jiraD[0];

          
          //console.log("trouver "+jiraname); 

          if (JiraIssue === jiraname) {
            //console.log("trouver "+JiraIssue); 
          CheckBranch(jiraD[1],jiraD[1]); 
        } 
  
          //console.log(dir.path); 
        });


        //console.log(dir.path); 
      });




      //CheckBranch(branch,issueId)
      //console.log(difference.length); 
    } 
    if (GherkinJira.length < GherkinGit.length){
      
      //let difference = GherkinGit.filter(x =>!GherkinJira.includes(x));
      let difference = arrdiff(GherkinGit,GherkinJira);
      //console.log("difference using new funtion "+difference.length);
      
      //console.log("difference lenght = "+difference.length);

      difference.forEach(function(gherkins) { 
        //console.log(gherkins); 
        GherkinDetails.forEach(function(GD) { 
        
        
          let gherkinD = GD.split(";");
          let gherkinname = gherkinD[0];

          //console.log(gherkinname); 

          if (gherkins.trim() === gherkinname.trim()) {console.log("trouver "+gherkinname); 
          JiraToGitSync(gherkinD[1],gherkinD[2],gherkinname.trim()); 
        } 
  
          //console.log(dir.path); 
        });


        //console.log(dir.path); 
      });
      // console.log("difference = "+difference.length);


    } 

    areEqual = false;

} else {






  Getpullrequestslist();
  //GetUpdatedGherkinsInProgress();

}



console.log(areEqual);
} 

function CheckBranch(branch,issueId){
  const request = require('request');
  const apiEndpoint= "https://api.github.com/repos/dfrancesAfd/MATE_BACK/branches";
  const apiToken="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";
  
  //const file_name="CreateEventTest.feature";
  
  //const file_path = "src/test/resources/features/event/create";
  
  const full_path=apiEndpoint+"/"+branch;
  
  
  
  const headers = {
     'Authorization': `Bearer ${apiToken}`,
      'Contenet-type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'amechta'
  };
  

  
  request.get({url:full_path,headers},(error,response,body)=>{
  
  
  if(error){
      console.log(error);
  }else{
  
      const data = JSON.parse(body);
      if(data.message === "Branch not found"){
        
        UpdateJirafield(issueId);
      
      } 
      

  }
  
  
  });
  
  }

  function UpdateJirafield(issueId){
    // This code sample uses the 'node-fetch' library:
    // https://www.npmjs.com/package/node-fetch
    const fetch = require('node-fetch');
    //const code= '"{code:title=Detailed Results|theme=FadeToGrey|linenumbers=true|language=javascript|firstline=0001|collapse=true}'+text.replace(/\n/g, "\\n")+'{code}"';
    const bodyData = `{"fields":{"customfield_10203" : "Oui"}}`;
    console.log(bodyData);
    const path ='https://afd-git-dev.atlassian.net/rest/api/2/issue/'+issueId;
    
    
    fetch(path, {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${Buffer.from(
        'amechta@afdtech.com:ATATT3xFfGF0xbq82cDKvG7Qxm2NdCTjcHNxmTUE1cBC3AIWJANq1RbS0gTOALDWczLHNDUDCKTfIWGlbNjFetD_mlyXsDky_ReIjHIWduXyGocEdSAazF9Nv_vqt64AX8BpeyGHQehyfu91BUcGPrEKWTFhxTWyCxJtoKiEuOSojL4aIElCMto=43822627'
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

function arrdiff(arr1,arr2){

  let diff =[]; 
  let trouver ;
  arr1.forEach(function(gherkins) { 
    trouver = false;
    arr2.forEach(function(GD) { 
    

      //console.log(gherkins.trim());
       //console.log(GD.trim());
      if (gherkins.trim() === GD.trim()) {
        //console.log("Matching ");
        trouver = true;
  //diff.push(gherkinname);

    } else{
      //console.log("No Matching ");
    } 

     
    });
    if(!trouver){diff.push(gherkins.trim());} 

   
  });
return diff;
} 

function Getpullrequestslist(){
  const request = require('request');
  // On prend les 30 dernier pull requests
  const apiEndpoint= "https://api.github.com/repos/amechtaO/AFD/pulls?head=dev&state=closed";
  const apiToken="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";
  const today = new Date();
let yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = yyyy + '-' + mm + '-' + dd;

  
  
  const headers = {
     'Authorization': `Bearer ${apiToken}`,
      'Contenet-type': 'application/json',
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'amechta'
  };


  const params = {
    state:'closed'
 };
  

  
  request.get({url:apiEndpoint,headers},(error,response,body)=>{
  
  
  if(error){
      console.log(error);
  }else{
  
      const pulls = JSON.parse(body);
      console.log("pulls = "+pulls.length);
      pulls.forEach(function(pull) { 
        
        let mergefulldate = pull.merged_at ;
        let sourcemerge = pull.head.ref;
        let destinationmerge = pull.base.ref;
        //console.log("pulls = "+mergefulldate);
        

        if (mergefulldate !== null)
       { 
        console.log("merge = "+pull.title);
        
        let mergedate = mergefulldate.split('T'); 
        //console.log("today = "+formattedToday);
        //console.log("merge = "+mergedate[0]);
        let mergedateformated = mergedate[0];
        
        let mergedateformatedsplited =  mergedateformated.split('-');

        let dayofmerge= mergedateformatedsplited[2];
        let monthofmerge= mergedateformatedsplited[1] ;
        let yearofmerge= mergedateformatedsplited[0] ; 
      
        //console.log(dayofmerge+" = "+dd);
        //console.log(monthofmerge+" = "+mm);
        //console.log(yearofmerge+" = "+yyyy);


      if(dayofmerge === dd ){
        //console.log(" days are equal");
            if(monthofmerge === mm ){ 
              //console.log(" months are equal");
              if(yearofmerge  - yyyy == 0){ 
                //console.log(" years are equal");
        //console.log("Merge source = "+sourcemerge);
        //console.log("Merge destination = "+destinationmerge);
        console.log("merged today ");


            if(sourcemerge==='dev'){
              //console.log("the source is dev ");
              //console.log(destinationmerge);
        //CreateAndLinkGherkin("nouvelle description",destinationmerge);





            } 

            if(destinationmerge==='dev'){
              //console.log("the destination is dev ");
            }



              } 
      } 
      } else{
        console.log(" not merged today ");
        console.log(destinationmerge);
        if(destinationmerge.startsWith("MATE")){
          console.log("it's a jira issue");


          let  GherkinDetails= syncReadFile("inter.txt");
          let  JiraDetails= syncReadFile("GherkinJirakeys.txt");

          JiraDetails.forEach(function(JiraIssue) { 
            
            let jiraD = JiraIssue.split(";");

            //console.log("trouver "+jiraD[1]+" fichier "+destinationmerge); 

            if (jiraD[1] === destinationmerge) {

              GherkinDetails.forEach(function(JD) { 
            
            
                let gherkin = JD.split(";");
                let jiraname = gherkin[0];
      
                
                //console.log("trouver "+jiraname); 
      //console.log("trouver "+jiraname+" fichier "+jiraD[0]);
                if (jiraD[0] === jiraname.trim()) {
                  console.log("trouver "+gherkin[1]+"fichier "+gherkin[2]); 

                  let path = gherkin[1];
                  let filename = gherkin[2];

                  getissuedescription(path,destinationmerge,jiraD[0]);
                
              } 
        
                //console.log(dir.path); 
              
      
      
              //console.log(dir.path); 
            });
            
          } 

          });
        
            





        
      }
        
        
      } 
      
      }
        
      
      });

  }
  
  
  });
  
  }

  function GetUpdatedGherkinsInProgress(){
    // This code sample uses the 'node-fetch' library:
    // https://www.npmjs.com/package/node-fetch
    const fetch = require('node-fetch');
    const today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    const formattedToday = yyyy + '-' + mm + '-' + dd;

    const bodyData = `{
      "expand": [
        "names",
        "schema",
        "operations",
        "changelog"
      ],
      "jql": "project = MATE and issuetype = gherkin and status in ('Developpement en cours 2' , 'Developpement à valider 2', 'Développement à valider 2') and updated > endofday(-10)",
      "fields": [
        "summary",
        "description"
      ]
    
    }`;
    
    const response =  fetch('https://afd-git-dev.atlassian.net/rest/api/3/search', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(
        'amechta@afdtech.com:ATATT3xFfGF0xbq82cDKvG7Qxm2NdCTjcHNxmTUE1cBC3AIWJANq1RbS0gTOALDWczLHNDUDCKTfIWGlbNjFetD_mlyXsDky_ReIjHIWduXyGocEdSAazF9Nv_vqt64AX8BpeyGHQehyfu91BUcGPrEKWTFhxTWyCxJtoKiEuOSojL4aIElCMto=43822627'
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
     
        return response.json();
        
        
      })
      .then(data =>{

         const issues = data.issues;
         console.log("total : "+issues.length);
    let lastdecription = true;

         issues.forEach(function(issue) { 
          lastdecription = false;
            let histories = issue.changelog.histories;

          console.log("history : "+histories.length);


          histories.forEach(function(history) { 

            let items = history.items;
            
  
            items.forEach(function(item) { 
              if(item.field === 'description'){

              //console.log("date de changement : "+history.created);

              let historyfulldate = history.created;
              let historydate = historyfulldate.split('T'); 


              let historydateformated = historydate[0];
              
              let historydateformatedsplited =  historydateformated.split('-');
      
              let dayofhistory= historydateformatedsplited[2];
              let monthofhistory= historydateformatedsplited[1] ;
              let yearofhistory= historydateformatedsplited[0] ; 


if(dayofhistory === dd ){ 
        //console.log(" days are equal");
            if(monthofhistory === mm ){ 
              //console.log(" months are equal");
              if(yearofhistory  - yyyy == 0){ 

                //console.log(" description changed today ");

        if(lastdecription === false){
          console.log("last change today ");
          console.log(issue.key);
          //console.log(issue.fields.description.content[0].content[0].text);
          let desc = issue.fields.description.content[0].content[0].text;
          lastdecription = true;

         
          let inters = syncReadFile('inter.txt');
           let filepath="";
          inters.forEach(function(inter) { 

            
            
              let intersplited = inter.split(";");
              let gherkinname = intersplited[0];
    
              
              //console.log("trouver "+jiraname); 

              console.log(issue.fields.summary +"==="+gherkinname); 

              if (gherkinname.trim() === issue.fields.summary) {

              filepath = intersplited[1]; 
              console.log(filepath);
            } 
           
          });
          //CheckBranchandcommitchange(issue.key,desc);
                                    }
                                            } 
                                      }
                        } else{
        //console.log(" description not changed today ");
      }
            } 
              });

            }); 
            //console.log("issue : "+issuekey.updated);

          });
        
        })
      .catch(err => console.error(err));
    } 

function CheckBranchandcommitchange(branch,desc){
      const request = require('request');
      const apiEndpoint= "https://api.github.com/repos/amechtaO/AFD/branches";
      const apiToken="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";
      
      //const file_name="CreateEventTest.feature";
      
      //const file_path = "src/test/resources/features/event/create";
      
      const full_path=apiEndpoint+"/"+branch;
      
      
      
      const headers = {
         'Authorization': `Bearer ${apiToken}`,
          'Contenet-type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'amechta'
      };
      
    
      
      request.get({url:full_path,headers},(error,response,body)=>{
      
      
      if(error){
          console.log(error);
      }else{
      
          const data = JSON.parse(body);
          if(data.message === "Branch not found"){
            
            console.log("branch not found");
          
          }else{
            console.log("branch found");
            
let fs = require('fs');
//let base64 = require('base-64');


//let file = fs.readFileSync("abc.txt").toString();
//console.log("text content = "+file);
let buff = new Buffer(desc);

let base64data = buff.toString('base64');
//var content = base64.encode(file);
//console.log("encode content = "+base64data);
GetSHAFromGitBranch(base64data,branch);


          }  
          
    
      }
      
      
      });
      
      }

async function uploadFileApi(branch,content,sha) {

        let axios = require('request');
        const {Octokit} = require("octokit")
  let token = "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"

        let headers ={
          'Authorization': `Bearer ${token}`,
          'Contenet-type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'amechta'
        }


       const octokit = new Octokit({
        auth: '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'
      })
      
      await octokit.request('PUT /repos/amechtaO/AFD/contents/test_fetch.txt', {
        owner: 'amechtaO',
        repo: 'AFD',
        path: 'PATH',
        sha:sha,
        message: 'commited by the plugin',
        committer: {
          name: 'Achraf mechta',
          email: 'amechta@afdtech.com'
        },
        content: content,
        branch: branch
      })
      

    }

function GetSHAFromGitBranch(base64data,branch){
      const request = require('request');
      const apiEndpoint= "https://api.github.com/repos/amechtaO/AFD/contents/test_fetch.txt";
      const apiToken="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";
      
      //const file_name="CreateEventTest.feature";
      
      //const file_path = "src/test/resources/features/event/create";
      
      const full_path=apiEndpoint+"?ref="+branch;
      
      //console.log(full_path);
      //console.log(apiToken);
      
      
      const headers = {
         'Authorization': `Bearer ${apiToken}`,
          'Contenet-type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'amechta'
      };
      
      
      request.get({url:full_path,headers},(error,response,body)=>{
      
      
      if(error){
          console.log(error);
      }else{
      
          const data = JSON.parse(body);
          //console.log(data);
      
      let sha = data.sha;

      console.log("sha : "+sha);
      uploadFileApi(branch,base64data,sha);
    
      }
      
      
      });
      
      }

function linkissues(source,dest) {
  // This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

const bodyData = '{"inwardIssue": {"key": "'+source+'"},"outwardIssue": {"key": "'+dest+'"},"type": {"id": "10007"}}';
console.log(bodyData);
fetch('https://afd-git-dev.atlassian.net/rest/api/3/issueLink', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
    'amechta@afdtech.com:ATATT3xFfGF0xbq82cDKvG7Qxm2NdCTjcHNxmTUE1cBC3AIWJANq1RbS0gTOALDWczLHNDUDCKTfIWGlbNjFetD_mlyXsDky_ReIjHIWduXyGocEdSAazF9Nv_vqt64AX8BpeyGHQehyfu91BUcGPrEKWTFhxTWyCxJtoKiEuOSojL4aIElCMto=43822627'
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


function CreateAndLinkGherkin(code,dest,summary){

  // This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

//const bodyData = '{ "update": {},"fields": {"summary": "Main order flow broken","issuetype": {"id": "10047"},"project": {"id": "10023"},"customfield_10200": "'+file_name+'","customfield_10201": "'+file_path+'","customfield_10202": "Oui","description":"{code:title=Detailed Results|theme=FadeToGrey|linenumbers=true|language=javascript|firstline=0001|collapse=true} '+code.replace(/\n/g, "\\n")+'{code}"}}';
const bodyData = '{ "update": {},"fields": {"summary": "'+summary+'","issuetype": {"id": "10047"},"project": {"id": "10023"},"customfield_10200": "En attente","customfield_10201": "en attente"}}';



//console.log(bodyData);
//console.log("create gherkin function");

fetch('https://afd-git-dev.atlassian.net/rest/api/3/issue', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from(
    'amechta@afdtech.com:ATATT3xFfGF0xbq82cDKvG7Qxm2NdCTjcHNxmTUE1cBC3AIWJANq1RbS0gTOALDWczLHNDUDCKTfIWGlbNjFetD_mlyXsDky_ReIjHIWduXyGocEdSAazF9Nv_vqt64AX8BpeyGHQehyfu91BUcGPrEKWTFhxTWyCxJtoKiEuOSojL4aIElCMto=43822627'
    ).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Atlassian-Token': 'no-check'
},
  body: bodyData
})
  .then(response => {

    return response.json();
  })
  .then(async data =>{ 
    console.log(data.key);
    await UpdateJiraDescription(code,data.key);
    linkissues(data.key,dest);
  
  })
  .catch(err => console.error(err));
 }


function getissuedescription(file_path,branch,issue){
    const request = require('request');
    const apiEndpoint= "https://api.github.com/repos/amechtaO/AFD/contents";
    const apiToken="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";
    
    //const file_name="CreateEventTest.feature";
    
    //const file_path = "src/test/resources/features/event/create";
    
    //const full_path=apiEndpoint+"/"+file_path+"?ref="+branch;
    const full_path=apiEndpoint+"/test_fetch.txt?ref="+branch;
    
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
    //WriteTextOnFile(text,"Lastmodifiedfile.txt");
    
    console.log(text);
    //UpdateJiraDescription(text,issueId);
    CreateAndLinkGherkin(text,branch,issue);
    }
    
    
    });
    
    
    

}


module.exports ={CheckBranchandcommitchange,GetUpdatedGherkinsInProgress,Getpullrequestslist,GitJiraCompare,GetGherkinsInProgress,GetFileContentFromGitBranch,GetInfoGitFromJira,UpdateJiraDescription,GetDirectorycontent} 
function AddJiraAttachements(){
    // This code sample uses the 'node-fetch' and 'form-data' libraries:
 // https://www.npmjs.com/package/node-fetch
 // https://www.npmjs.com/package/form-data
 const fetch = require('node-fetch');
 const FormData = require('form-data');
 const fs = require('fs');

 const filePath = './Repo/Git.txt';
 const form = new FormData();
 const stats = fs.statSync(filePath);
 const fileSizeInBytes = stats.size;
 const fileStream = fs.createReadStream(filePath);

 form.append('file', fileStream, {knownLength: fileSizeInBytes});

 fetch('https://afd-git-dev.atlassian.net/rest/api/3/issue/DT-65/attachments', {
     method: 'POST',
     body: form,
     headers: {
         'Authorization': `Basic ${Buffer.from(
         'amechta@afdtech.com:4QkgemNJZma5Lo7ClJ3LA7CD'
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

module.exports ={AddJiraAttachements} 
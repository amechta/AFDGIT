import jira from './Functions/Jira/JiraFunctions';
import git from './Functions/Git/GitFunctions';
import sync from './Functions/synchro/sync';

export default  function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/hello-world', addon.authenticate(), async (req, res) => {
      


      const lastcommit =  git.GetLastCommitFromGit();
      //console.log(lastcommit);
      //git.GetFileContentFromGit();
      //jira.AddJiraAttachements();

        // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
        // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
        res.render(
          'hello-world.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Atlassian Connect',
            lastcommit: lastcommit
            //, issueId: req.query['issueId']
            //, browserOnly: true // you can set this to disable server-side rendering for react views
          }
        );
    });

    app.get('/GitInfo', addon.authenticate(), async (req, res) => {
      
      const currentissueType = req.query.issuetype;

    if(currentissueType == 10005){console.log("the issuetype is the we need "+currentissueType);} 
    else console.log("the issuetype is not the one we need"+currentissueType);
      //const lastcommit =  git.GetLastCommitFromGit();
      
        res.render(
          'git.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Atlassian Connect',
          }
        );
    });
    app.get('/GitBranchOld', addon.authenticate(), async (req, res) => {
      
      const currentissueId = req.query.issueid;
      console.log("the issueid is "+currentissueId);

      sync.GetInfoGitFromJira(currentissueId);
      //sync.UpdateJiraDescription(currentissueId);


        res.render(
          'gitBranch.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Atlassian Connect',
            issueId: currentissueId
          }
        );
    });

    
    app.get('/Git-WebItem', addon.authenticate(), async (req, res) => {
      /*
      let currentissueId = req.query.issueid;
      const currentissueType = req.query.issuetype;
      
      console.log("the issueid is "+currentissueId);
      if(currentissueType == 10047){
        sync.GetInfoGitFromJira(currentissueId);} 
      else{ console.log("the issuetype is not the one we need"+currentissueType);
      currentissueId = "Not a gherkin";
    } 
      */ 
    const fs = require('fs')

    const path = './gherkintitle.txt'
    
    try {
      //sync.Getpullrequestslist();
      //sync.GetUpdatedGherkinsInProgress();
      //sync.CheckBranchandcommitchange("dev");
      if (fs.existsSync(path)) {
        //sync.GitJiraCompare();
      }else{
        //sync.GetDirectorycontent("src/test/resources/features");
        //sync.GetGherkinsInProgress();
      } 
    } catch(err) {
      console.error(err)
    }
    
    
    
    
      //sync.UpdateJiraDescription(currentissueId);


        res.render(
          'gitBranch.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Atlassian Connect'
            //issueId: currentissueId
          }
        );
    });
    // Add additional route handlers here...
}

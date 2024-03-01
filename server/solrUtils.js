const solr = require('solr');
const axios = require('axios');

const solrClient = solr.createClient({
  host: 'localhost',
  port: '8983', 
  core: '/SDP', 
});

const indexUser = (user) => {
  const solrDocument = {
    _id: user._id.toString(), 
    username: user.username,
    isStudent: user.isStudent, 
    city: user.city,
    state: user.state,
    gender: user.gender,
    subject: user.subjects
  };

  solrClient.add(solrDocument, (err, obj) => {
    if (err) {
      console.error('Error indexing user:', err);
    } else {
      console.log('User indexed successfully:', obj);
    }

    const coreName = "SDP";
    const solrUrl = `http://localhost:8983/solr/admin/cores?action=RELOAD&core=${coreName}`;

    fetch(solrUrl)
      .then(response => {
        if (response.ok) {
          console.log(`Core ${coreName} reloaded successfully.`);
        } else {
          console.error(`Failed to reload core ${coreName}. Status code: ${response.status}`);
        }
      })
      .catch(error => {
        console.error(`Error reloading core ${coreName}:`, error);
      });
    
  });
};

const searchUser = async (s,l,g,state) => {
  console.log(s,l,g)
  const solrUrl = 'http://localhost:8983/solr/SDP/select';

  const solrResponse = await axios.get(solrUrl, {        
    params: {
      q: `city:"${l}"* AND gender:"${g}"* AND subject:"${s}"* AND state:"${state}"*`,
      rows: 32, 
    },
  });
  return solrResponse.data.response.docs
  ;
}

module.exports = { indexUser, searchUser };

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
    fullName: user.fullName,
    isStudent: user.isStudent, 
    city: user.city,
    state: user.state,
    gender: user.gender,
    subject: user.subjects,
    email: user.email,
    gradeLevels: user.gradeLevels
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
  return solrResponse.data.response.docs;
}

const updateUser = async (user) => {
  const solrDocument = {
    _id: user._id.toString(), 
    fullName: user.fullName,
    isStudent: user.isStudent, 
    city: user.city,
    state: user.state,
    gender: user.gender,
    subject: user.subjects,
    email: user.email,
    gradeLevels: user.gradeLevels
  };

  solrClient.update(solrDocument, (err, obj) => {
    if (err) {
      console.error('Error updating user:', err);
    } else {
      console.log('User updated successfully:', obj);
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

module.exports = { indexUser, searchUser, updateUser };

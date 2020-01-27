console.log('before');
getUser(1, getRepos);
console.log('after');

function getRepos(user){
    getRepos(user.gitHubUserName, getCommits);
}

function getCommits(repos){
    getCommits(repos, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from database");
        callback({ id: id, gitHubUserName: 'Milo' });
    }), 2000;
}

function getRepos(username, callback) {
    setTimeout(() => {
        console.log('Fetching Github API');
        callback({ username: username, repos: ['repo1', 'repo2', 'repo3'] });
    }), 2000;
}

//User overview div
const overview = document.querySelector(".overview");
//Repository list ul
const repoList = document.querySelector(".repo-list");
const username = "AbdullahJ99";


const profile = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profileDetails = await res.json();
    displayUser(profileDetails);
}

profile();

const displayUser = function(profile){
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML =
    `<figure>
        <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${profile.name}</p>
        <p><strong>Bio:</strong> ${profile.bio}</p>
        <p><strong>Location:</strong> ${profile.location}</p>
        <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div>`;
    overview.append(userInfo);
    repos();
}

const repos = async function(){
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repo = await res.json();
    displayRepos(repo);
}

const displayRepos = function(repos){
    for(const repo of repos){
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
}
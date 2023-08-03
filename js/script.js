//User overview div
const overview = document.querySelector(".overview");
//Repository list ul
const repoList = document.querySelector(".repo-list");
//Repo information section
const repos = document.querySelector(".repos");
//Individual repo data section
const repoData = document.querySelector(".repo-data");
//Return to repo list button
const viewRepos = document.querySelector(".view-repos");
//Repos search bar input
const filterInput = document.querySelector(".filter-repos");
const username = "AbdullahJ99";


const fetchProfile = async function(){
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUser(data);
}

fetchProfile();

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
    fetchRepos();
}

const fetchRepos = async function(){
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const data = await res.json();
    displayRepos(data);
}

const displayRepos = function(repos){
    filterInput.classList.remove("hide");
    for(const repo of repos){
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
}

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        individualRepo(repoName);
    }
});

const individualRepo = async function(repoName){
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (const key in languageData){
        languages.push(key);
    }
    displayRepo(repoInfo, languages);
}

const displayRepo = function(repoInfo, languages){
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML =
        `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    viewRepos.classList.remove("hide");
}

viewRepos.addEventListener("click", function(){
    repos.classList.remove("hide");
    repoData.classList.add("hide");
    viewRepos.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
    const textInput = e.target.value;
    const searchText = textInput.toLowerCase();
    const searchRepos = document.querySelectorAll(".repo");
    for (const repo of searchRepos){
        const repoName = repo.innerText.toLowerCase();
        if(repoName.includes(searchText)){
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
const getTeam = () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
    const getTeamName = document.getElementById('UserInput');
    const teamName = getTeamName.value;
    getTeamName.value = '';
    const throwArrow = document.getElementById('h1')
    if (teamName == '') {
        throwArrow.textContent = 'plase write your favourite team '
        spinner.style.display = 'none';
    }
    // console.log(teamName);
    else {

        fetch(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${teamName}
      `)
            .then(res => res.json())
            .then(data => display(data))
        throwArrow.textContent = '';
    }



}
const display = teams => {
    const container = document.getElementById('div');
    container.textContent = '';

    console.log(teams.teams);
    const t = teams.teams;
    for (const team of t) {
        console.log(team);
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
               <img onclick="getTeamID('${team.idTeam}')" src="${team.strTeamBadge}" class="card-img-top p-2 rounded" alt="...">
                <div class="card-body">
                     <h5 class="card-title">Name : ${team.strTeam} </h5>
                     <p class="card-text"> ${team.strDescriptionEN.slice(0, 200)}.</p>
                     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </di>
        `;
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'none';
        container.appendChild(div)
    }

}
const getTeamID = id => {
    // const teamId = t[0].idTeam;
    // console.log(teamId);
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayDtails(data.teams[0]))
}
const displayDtails = details => {
    const detailsCntainer = document.getElementById('detail');
    detailsCntainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${details.strTeamBadge}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                        <h5 class="card-title"> Title :${details.strTeam}</h5>
                        <p class="card-text"> ${details.strDescriptionEN.slice(0, 200)}.</p>
                        <p> country : ${details.strCountry}</p>
                </div>
            </div>
        </div>
    `;
    detailsCntainer.appendChild(div)
    console.log(details);


}

let Display=document.querySelector('#JSApi')
let NestedDisplay=document.querySelector('#JSnestedApi')
let urlLink=''

let apiFunc= async(urlLinkArg, type)=>{

    urlLink='https://api.github.com/users'
    let Data= await axios(urlLinkArg?urlLinkArg:urlLink).then((res)=>res.data)

    let nestedBack=`
        <i class="fas fa-arrow-left" onclick="clickBackFunc()"></i>
        <h2 style="padding:10px;">Repos</h2>
        `
    NestedDisplay.innerHTML=nestedBack
    let Heading=`<h2 style="padding:10px;">People</h2>`
    Display.innerHTML=Heading

    Data.map((e)=>{
        if(urlLinkArg && type=='repo'){
            Display.innerHTML=''
            window.scrollTo(0, 0)
            return NestedDisplay.innerHTML+=`
            <div class="gitDiv">
                <a href="${e.html_url}" target="_blank">${e.name}</a>
            </div>
            `
        }else{
            NestedDisplay.innerHTML=''
            return Display.innerHTML+=`
            <div class="gitDiv">
                <button value='${JSON.stringify(e)}' onclick="clickRepoFunc(event)" class='imgBtn'>
                    <img src=${e.avatar_url} class="gitImg" alt=${e.login}/>
                </button>
                <p>${e.login}</p>
            </div>
            `
        }
    })
}
apiFunc()

let clickRepoFunc=(e)=>{
    let ele=JSON.parse(e.target.value)
    urlLink=`https://api.github.com/users/${ele.login}/repos`
    apiFunc(urlLink, 'repo')
}
let clickBackFunc=(e)=>{
    urlLink=`https://api.github.com/users`
    apiFunc(urlLink, 'back')
}
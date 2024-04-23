const resultsDiv = document.querySelector("#result");
const refresh = document.querySelector("#refresh");

window.addEventListener("load", () => {
  display(emojiList)
  attachListener();
} );


refresh.addEventListener("click",()=>{
  location.reload();
})

function display(inputList) {
  let count=0;
  inputList.forEach((emoji) => {
    const parent = document.createElement("div");
    parent.classList.add("parent");

    const emo = document.createElement("span");
    emo.classList.add("emoji");
    emo.innerText = emoji.emoji;
    parent.append(emo);

    const alias = document.createElement("span");
    alias.classList.add("alias");
    const newAlias = emoji.aliases.map((alias) => alias.replaceAll("_", " "));
    alias.innerText = newAlias.join();
    parent.append(alias);

    const desc = document.createElement("span");
    desc.classList.add("desc");
    desc.innerText = emoji.description;
    parent.append(desc);

    resultsDiv.append(parent);
    count++;
  });
  if(count==0){
    const para = document.createElement("p");
    para.innerHTML= "NO MATCH FOUND";
    para.classList.add("error");
    resultsDiv.append(para);
  }
}

function attachListener() {
  const input = document.querySelector("input");

  input.addEventListener("keyup", filterEmojis);
}

function filterEmojis(e) {
  const input = e.target.value;
  const keyword = input.toLowerCase();


  const filteredData = emojiList.filter((emoji) => {
    if (emoji.description.includes(keyword)) return emoji;
    else if (emoji.category.includes(keyword)) return emoji;
    else if (emoji.aliases.includes(keyword)) return emoji;
    else if (emoji.tags.includes(keyword)) return emoji;
  });

  resultsDiv.innerText = "";
  display(filteredData)
}
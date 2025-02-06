const repo = "NotMageLock/Wicki";

async function loadSidebar() {
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/`);
    const files = await res.json();
    const sidebar = document.getElementById("sidebar");

    const pageFiles = files.filter(f => f.name.endsWith(".page"))
                           .sort((a, b) => a.name.localeCompare(b.name));

    sidebar.innerHTML = "";
    pageFiles.forEach(file => {
        const btn = document.createElement("button");
        btn.textContent = file.name.replace(".page", "");
        btn.onclick = () => loadPage(file.name);
        sidebar.appendChild(btn);
    });
}

async function loadPage(pageName) {
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/${pageName}`);
    const content = await res.json();

    document.getElementById("content").innerHTML = marked(content.text);
}

document.addEventListener("DOMContentLoaded", loadSidebar);

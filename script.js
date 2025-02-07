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

function createPage() {
    document.getElementById("editor").style.display = "block";
    document.getElementById("markdown-editor").value = "";
}

function exportPage() {
    const pageName = prompt("Enter a name for the new page (without extension):");
    if (pageName) {
        const content = {
            text: document.getElementById("markdown-editor").value
        };
        const jsonStr = JSON.stringify(content, null, 2);

        // Create a downloadable .page file
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${pageName}.page`;
        link.click();
    }
}

document.getElementById("create-page").addEventListener("click", createPage);
document.getElementById("export-page").addEventListener("click", exportPage);

document.addEventListener("DOMContentLoaded", loadSidebar);

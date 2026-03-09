const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const loadIssues = async () => {

    const res = await fetch(API);
    const data = await res.json();

    displayIssues(data.data);

};

loadIssues();

const displayIssues = (issues) => {

    const container = document.getElementById("issuesContainer");

    container.innerHTML = "";

    issues.forEach(issue => {

        const card = document.createElement("div");

        card.className = `
        bg-white rounded-lg shadow p-4
        border-t-4
        ${issue.status === "open" ? "border-green-500" : "border-purple-500"}
        `;

        card.innerHTML = `

        <div class="flex justify-between items-start">

            <img
            src="./assets/${issue.status === "open" ? "open-status.png" : "Closed- Status .png"}"
            class="w-4"
            >

            <span class="text-xs px-2 py-1 rounded-full
            ${issue.priority === "HIGH" ? "bg-red-100 text-red-600" : ""}
            ${issue.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-700" : ""}
            ${issue.priority === "LOW" ? "bg-gray-200 text-gray-600" : ""}
            ">
            ${issue.priority}
            </span>

        </div>

        <h3 class="font-semibold text-sm mt-3">
        ${issue.title}
        </h3>

        <p class="text-gray-500 text-xs mt-2">
        ${issue.description.slice(0,80)}...
        </p>

        <div class="flex gap-2 mt-3">

            ${
                issue.labels.map(label => `
                <span class="text-xs px-2 py-1 rounded-full
                ${label === "bug" ? "bg-red-100 text-red-600" : ""}
                ${label === "help wanted" ? "bg-yellow-100 text-yellow-700" : ""}
                ${label === "enhancement" ? "bg-green-100 text-green-700" : ""}
                ">
                ${label.toUpperCase()}
                </span>
                `).join("")
            }

        </div>

        <hr class="my-3">

        <p class="text-xs text-gray-400">
        #${issue.id} by ${issue.author}
        </p>

        <p class="text-xs text-gray-400">
        ${issue.createdAt}
        </p>

        `;

        container.appendChild(card);

    });

};
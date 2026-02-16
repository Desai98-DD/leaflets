(function () {

    // ===== Dummy data (replace with Firebase later) =====
    const stories = [
      {
        title: "Break Compliance Improved After Reporting",
        description: "Multiple employees reported consistently missing their last 15-minute breaks due to staffing shortages.",
        solution: "Union raised the issue with management using collected data. Store adjusted staffing schedule and break compliance improved significantly."
      },
      {
        title: "Incorrect Pay Rate Corrected",
        description: "An employee noticed their pay rate was lower than agreed after position change.",
        solution: "Union presented payroll records. Employer corrected the pay rate and issued back pay for the missing amount."
      },
      {
        title: "Unsafe Workload Reduced",
        description: "Employees were assigned excessive workload during peak hours, causing safety concerns.",
        solution: "Union negotiated workload limits and employer introduced additional staffing during busy periods."
      },
      {
        title: "Break Policy Clarified",
        description: "Employees were unsure about their eligibility for breaks during shorter shifts.",
        solution: "Union worked with employer to clarify break policies and communicate them clearly to all staff."
      },
      {
        title: "Holiday Pay Issue Resolved",
        description: "Holiday pay was not properly calculated for several employees.",
        solution: "Union reviewed payroll data and ensured all affected employees received correct holiday pay."
      },
      {
        title: "Schedule Changes Without Notice Stopped",
        description: "Management frequently changed schedules without proper notice.",
        solution: "Union enforced agreement terms requiring advance notice for schedule changes."
      },
      {
        title: "Overtime Pay Recovered",
        description: "Employee worked overtime but did not receive overtime pay.",
        solution: "Union provided documentation and employer issued full overtime compensation."
      },
      {
        title: "Break Coverage Improved",
        description: "Employees were unable to take breaks because no replacement staff was available.",
        solution: "Employer implemented new break coverage plan after union presented evidence."
      },
      {
        title: "Equipment Safety Issue Fixed",
        description: "Unsafe equipment was reported by multiple employees.",
        solution: "Union escalated safety concern and employer repaired equipment immediately."
      },
      {
        title: "Staffing Levels Increased",
        description: "Consistent understaffing affected working conditions and break availability.",
        solution: "Union used collected data to demonstrate need for more staff. Employer hired additional employees."
      }
    ];
  
  
    // ===== DOM elements =====
    const searchInput = document.getElementById("storySearch");
    const listEl = document.getElementById("storiesList");
    const noResultsEl = document.getElementById("noResults");
    const countEl = document.getElementById("resultCount");
  
  
    // ===== Escape HTML (security) =====
    function escapeHtml(str) {
      return String(str)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  
  
    // ===== Highlight search matches =====
    function highlightEscapedText(escapedText, q) {
      if (!q) return escapedText;
  
      const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(safeQ, "gi");
  
      return escapedText.replace(re, (match) => {
        return `<mark class="hl">${match}</mark>`;
      });
    }
  
  
    // ===== Check if story matches search =====
    function storyMatches(story, q) {
      if (!q) return true;
  
      const haystack =
        `${story.title} ${story.description} ${story.solution}`.toLowerCase();
  
      return haystack.includes(q);
    }
  
  
    // ===== Render stories =====
    function render(items) {
  
      listEl.innerHTML = "";
  
      if (items.length === 0) {
        noResultsEl.style.display = "block";
        countEl.textContent = "Showing 0 stories";
        return;
      }
  
      noResultsEl.style.display = "none";
      countEl.textContent =
        `Showing ${items.length} stor${items.length === 1 ? "y" : "ies"}`;
  
      const q = searchInput.value.trim();
  
      items.forEach((story) => {
  
        const card = document.createElement("article");
        card.className = "card story-card";
  
        const titleEsc = escapeHtml(story.title);
        const descEsc = escapeHtml(story.description);
        const solEsc  = escapeHtml(story.solution);
  
        card.innerHTML = `
          <h2 class="story-title">
            ${highlightEscapedText(titleEsc, q)}
          </h2>
  
          <div class="story-section">
            <div class="story-label">Description</div>
            <div class="story-text">
              ${highlightEscapedText(descEsc, q)}
            </div>
          </div>
  
          <div class="story-section">
            <div class="story-label">Solution</div>
            <div class="story-text">
              ${highlightEscapedText(solEsc, q)}
            </div>
          </div>
        `;
  
        listEl.appendChild(card);
  
      });
  
    }
  
  
    // ===== Handle search input =====
    function handleSearch() {
  
      const q = searchInput.value.trim().toLowerCase();
  
      const filtered = stories.filter((story) =>
        storyMatches(story, q)
      );
  
      render(filtered);
  
    }
  
  
    // ===== Initial render =====
    render(stories);
  
  
    // ===== Live search listener =====
    searchInput.addEventListener("input", handleSearch);
  
  
  })();
  
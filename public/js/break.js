(function () {
  const form = document.getElementById("breakForm");
  const errorEl = document.getElementById("formError");

  const requiredFields = [
    "firstName",
    "lastName",
    "storeNumber",
    "date"
  ];

  function setError(msg) {
    errorEl.textContent = msg || "";
  }

  function clearHighlights() {
    document.querySelectorAll(".field-error").forEach(el => {
      el.classList.remove("field-error");
    });

    document.querySelectorAll(".check-error").forEach(el => {
      el.classList.remove("check-error");
    });
  }

  function highlightField(id) {
    const field = document.getElementById(id);
    if (field) {
      field.classList.add("field-error");
      field.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function highlightCheckboxGroup() {
    const checks = document.querySelector(".checks");
    if (checks) {
      checks.classList.add("check-error");
      checks.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function getCheckedCount() {
    return document.querySelectorAll('input[name="breaks"]:checked').length;
  }

  function validate() {
    clearHighlights();
    setError("");

    let valid = true;

    requiredFields.forEach(id => {
      const value = document.getElementById(id).value.trim();
      if (!value) {
        highlightField(id);
        valid = false;
      }
    });

    if (getCheckedCount() < 1) {
      highlightCheckboxGroup();
      valid = false;
    }

    if (!valid) {
      setError("Please fill all required fields.");
    }

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validate()) return;

    // redirect
    window.location.href = "./break-thanks.html";
  });

  // Remove highlight when user types
  document.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", () => {
      input.classList.remove("field-error");
    });
  });

  document.querySelectorAll('input[name="breaks"]').forEach(box => {
    box.addEventListener("change", () => {
      document.querySelector(".checks").classList.remove("check-error");
    });
  });

})();

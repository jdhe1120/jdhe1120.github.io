document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- blog tag filter ----
  const filter = document.querySelector(".tag-filter");
  if (filter) {
    const buttons = filter.querySelectorAll(".tag-filter__btn");
    const posts = document.querySelectorAll(".blog-index__list li");
    const none = document.querySelector(".blog-index__none");

    const apply = (tag) => {
      let shown = 0;
      posts.forEach((li) => {
        const tags = (li.dataset.tags || "").split(",");
        const match = tag === "all" || tags.includes(tag);
        li.hidden = !match;
        if (match) shown++;
      });
      if (none) none.hidden = shown > 0;

      buttons.forEach((b) => {
        const active = b.dataset.tag === tag;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
    };

    buttons.forEach((b) => {
      b.addEventListener("click", () => {
        const tag = b.dataset.tag;
        apply(tag);
        // reflect the filter in the URL so it can be linked to and shared
        history.replaceState(null, "", tag === "all" ? location.pathname : "#" + tag);
      });
    });

    // honour a #Tag in the URL on load (post pages link here that way)
    const initial = decodeURIComponent(location.hash.slice(1));
    if (initial && [...buttons].some((b) => b.dataset.tag === initial)) {
      apply(initial);
    }
  }
});

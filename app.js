/* ==========================================================
   ODDISEA — Enhanced Product Interaction Script
   21 products · Filters · Compare · 3D · Cursor · Loader
   ========================================================== */

const products = [
  { name: "Albacore Tuna", category: "tuna", description: "Albacore tuna from the Oddisea SuperFrozen seafood range.", tags: ["Tuna", "SuperFrozen"], mark: "AT", colors: ["#a95546", "#183b3a"] },
  { name: "ASC Hawaiian Kanpachi", category: "specialty", description: "ASC-certified Hawaiian Kanpachi from the Oddisea SuperFrozen range.", tags: ["ASC selection", "SuperFrozen"], mark: "HK", colors: ["#9c8b5b", "#1d4646"] },
  { name: "Bluefin Tuna", category: "tuna", description: "MSC-certified Bluefin tuna, rapidly frozen to preserve its fresh color and quality.", tags: ["MSC selection", "SuperFrozen"], mark: "BF", colors: ["#a5423d", "#182e40"] },
  { name: "Customizable Programs", category: "specialty", description: "Talk to Oddisea about customizable products and solutions for your seafood program.", tags: ["Customizable", "Foodservice & retail"], mark: "CP", colors: ["#84936d", "#193e3a"], frozen: false },
  { name: "Ginger", category: "ingredients", description: "Ginger from Oddisea's sushi ingredients range.", tags: ["Sushi ingredient", "Ask for details"], mark: "GI", colors: ["#a99354", "#304039"], frozen: false },
  { name: "King Salmon", category: "salmon", description: "King Salmon selection from the Oddisea SuperFrozen seafood range.", tags: ["Salmon", "SuperFrozen"], mark: "KS", colors: ["#d57a5e", "#573b39"] },
  { name: "Mangrove Shrimp", category: "specialty", description: "Mangrove Shrimp from the Oddisea SuperFrozen seafood range.", tags: ["Shrimp", "SuperFrozen"], mark: "MS", colors: ["#c27862", "#424245"] },
  { name: "MSC Bigeye Tuna", category: "tuna", description: "MSC-certified Bigeye tuna from Oddisea's SuperFrozen seafood range.", tags: ["MSC selection", "SuperFrozen"], mark: "BT", colors: ["#a84843", "#192f42"] },
  { name: "MSC Skipjack / Albacore Tuna", category: "tuna", description: "MSC-certified Skipjack and Albacore tuna selections for culinary programs.", tags: ["MSC selection", "SuperFrozen"], mark: "SA", colors: ["#b36149", "#263e45"] },
  { name: "MSC Sockeye Salmon", category: "salmon", description: "MSC-certified Sockeye Salmon from the Oddisea SuperFrozen range.", tags: ["MSC selection", "Salmon"], mark: "SS", colors: ["#d06a54", "#654247"] },
  { name: "Nori", category: "ingredients", description: "Nori from Oddisea's sushi ingredients range.", tags: ["Sushi ingredient", "Ask for details"], mark: "NO", colors: ["#5d7860", "#20332c"], frozen: false },
  { name: "Quinoa", category: "ingredients", description: "Quinoa from Oddisea's ingredients range.", tags: ["Ingredient", "Ask for details"], mark: "Q", colors: ["#a79769", "#4a4437"], frozen: false },
  { name: "Rice", category: "ingredients", description: "Rice from Oddisea's sushi ingredients range.", tags: ["Sushi ingredient", "Ask for details"], mark: "RI", colors: ["#a9a37f", "#58584c"], frozen: false },
  { name: "Rice Makers", category: "equipment", description: "Rice makers from Oddisea's foodservice equipment range.", tags: ["Equipment", "Foodservice"], mark: "R", colors: ["#7f918e", "#303c3c"], frozen: false },
  { name: "Rice Paper", category: "ingredients", description: "Rice Paper from Oddisea's sushi ingredients range.", tags: ["Sushi ingredient", "Ask for details"], mark: "RP", colors: ["#c3ac83", "#5b4b3b"], frozen: false },
  { name: "Seaweed Salad", category: "ingredients", description: "Seaweed Salad from Oddisea's sushi ingredients range.", tags: ["Sushi ingredient", "Ask for details"], mark: "SW", colors: ["#688b64", "#263e36"], frozen: false },
  { name: "Superfreezers", category: "equipment", description: "Superfreezers from Oddisea's foodservice equipment range.", tags: ["Equipment", "Foodservice"], mark: "ULT", colors: ["#86aeb2", "#234149"], frozen: false },
  { name: "Sushi Robots", category: "equipment", description: "Sushi robots from Oddisea's foodservice equipment range.", tags: ["Equipment", "Foodservice"], mark: "S", colors: ["#929b90", "#343d39"], frozen: false },
  { name: "Sushizu", category: "ingredients", description: "Sushizu from Oddisea's sushi ingredients range.", tags: ["Sushi ingredient", "Ask for details"], mark: "SZ", colors: ["#af9270", "#554238"], frozen: false },
  { name: "ULT SuperFrozen Tensei Reviver", category: "specialty", description: "ULT SuperFrozen Tensei Reviver from Oddisea's product range.", tags: ["SuperFrozen", "Ask for details"], mark: "ULT", colors: ["#8daeb0", "#263b42"], frozen: false },
  { name: "Wasabi", category: "ingredients", description: "Wasabi from Oddisea's sushi ingredients range.", tags: ["Sushi ingredient", "Ask for details"], mark: "WA", colors: ["#819653", "#38452e"], frozen: false }
];

products.forEach((product, index) => {
  product.image = `assets/products/product-${String(index + 1).padStart(2, "0")}.jpg`;
});

const storageKeys = {
  saved: "oddisea-saved-products",
  compare: "oddisea-compared-products"
};

const categoryLabels = {
  tuna: "Tuna",
  salmon: "Salmon",
  specialty: "Specialty",
  ingredients: "Ingredients",
  equipment: "Equipment"
};

// DOM references
const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#product-search");
const sortSelect = document.querySelector("#product-sort");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const savedCount = document.querySelector("#saved-count");
const compareCount = document.querySelector("#compare-count");
const compareDock = document.querySelector("#compare-dock");
const productDialog = document.querySelector("#product-dialog");
const compareDialog = document.querySelector("#compare-dialog");
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Page interactions
const cursorPreview = document.querySelector("#cursorPreview");
const scrollProgress = document.querySelector("#scrollProgress");
const toast = document.querySelector("#toast");
const toastMsg = document.querySelector("#toast-msg");
const loader = document.querySelector("#loader");
const heroBubbles = document.querySelector("#hero-bubbles");
const businessDialog = document.querySelector("#business-dialog");
const scatterStage = document.querySelector("#scatter-gallery-stage");
const scatterCards = document.querySelector("#scatter-cards");
const scatterHeading = document.querySelector("#scatter-title");
const scatterCaption = document.querySelector(".scatter-caption");
const scatterIndex = document.querySelector("#scatter-index");

// ============================================================
// Storage
// ============================================================
function readStoredSet(key) {
  const value = localStorage.getItem(key);
  if (!value) return new Set();
  const parsed = JSON.parse(value);
  if (!Array.isArray(parsed) || !parsed.every((name) => typeof name === "string")) {
    throw new Error(`Invalid saved product data in ${key}.`);
  }
  return new Set(parsed);
}

const savedProducts = readStoredSet(storageKeys.saved);
const comparedProducts = readStoredSet(storageKeys.compare);
let activeFilter = "all";
let activeView = "grid";

function persistProducts(key, values) {
  localStorage.setItem(key, JSON.stringify([...values]));
}

// ============================================================
// Toast
// ============================================================
let toastTimer;
function showToast(message, icon = "✓") {
  if (!toast) return;
  toastMsg.textContent = message;
  const iconEl = toast.querySelector("i");
  if (iconEl) {
    iconEl.className = "toast-icon";
    iconEl.textContent = icon;
  }
  toast.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("on"), 2400);
}

// ============================================================
// Filter & Sort
// ============================================================
function currentProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  let filtered = products.filter((product) => {
    const matchesFilter = activeFilter === "all"
      || (activeFilter === "saved" ? savedProducts.has(product.name) : product.category === activeFilter);
    const matchesQuery = !query
      || `${product.name} ${product.category} ${product.description} ${product.tags.join(" ")}`.toLocaleLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  filtered = [...filtered].sort((first, second) => first.name.localeCompare(second.name));
  if (sortSelect.value === "za") filtered.reverse();
  return filtered;
}

// ============================================================
// Create Product Card
// ============================================================
function createProductCard(product, index) {
  const card = document.createElement("article");
  card.className = "product-card reveal";
  card.dataset.product = product.name;

  const image = document.createElement("div");
  image.className = "product-image";
  image.style.setProperty("--image",
    `radial-gradient(ellipse at 50% 55%, ${product.colors[0]} 0%, ${product.colors[1]} 74%)`);

  const productPhoto = document.createElement("img");
  productPhoto.className = "product-photo";
  productPhoto.src = product.image;
  productPhoto.alt = `${product.name} — Oddisea ${categoryLabels[product.category]}`;
  productPhoto.loading = "lazy";
  productPhoto.decoding = "async";
  productPhoto.addEventListener("error", () => {
    console.warn(`Product image failed to load for ${product.name}: ${product.image}`);
    productPhoto.remove();
  }, { once: true });

  const indexLabel = String(index + 1).padStart(2, "0");
  image.innerHTML = `
    <span class="product-index">${indexLabel} / 21</span>
    <span class="product-sigil" aria-hidden="true">${product.mark}</span>
  `;
  image.prepend(productPhoto);

  if (product.frozen !== false) {
    image.insertAdjacentHTML("beforeend",
      '<span class="product-cold">✳ &nbsp;−76°F</span>');
  }

  const actions = document.createElement("div");
  actions.className = "product-actions";
  actions.innerHTML = `
    <button class="icon-button save-button${savedProducts.has(product.name) ? " is-active" : ""}"
      type="button"
      aria-label="${savedProducts.has(product.name) ? "Remove saved" : "Save"} ${product.name}"
      aria-pressed="${savedProducts.has(product.name)}">♥</button>
    <button class="icon-button compare-button${comparedProducts.has(product.name) ? " is-active" : ""}"
      type="button"
      aria-label="${comparedProducts.has(product.name) ? "Remove" : "Add"} ${product.name} ${comparedProducts.has(product.name) ? "from" : "to"} comparison"
      aria-pressed="${comparedProducts.has(product.name)}">⇄</button>
  `;
  image.append(actions);

  const info = document.createElement("div");
  info.className = "product-info";
  const tags = product.tags.map((tag) => `<span>${tag}</span>`).join("");
  info.innerHTML = `
    <div class="product-kicker">
      <span>${categoryLabels[product.category]}</span>
      <span>ODDISEA / ${indexLabel}</span>
    </div>
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <div class="product-tags">${tags}</div>
    <div class="product-bottom">
      <button class="details-button" type="button">Product details ↗</button>
      <span aria-hidden="true">↗</span>
    </div>
  `;

  card.append(image, info);

  card.querySelector(".save-button").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleSaved(product.name);
  });
  card.querySelector(".compare-button").addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCompared(product.name);
  });
  card.querySelector(".details-button").addEventListener("click", () => {
    openProductDetails(product);
  });

  return card;
}

// ============================================================
// Render
// ============================================================
function updateCounts() {
  document.querySelector("#countAll").textContent = String(products.length);
  Object.keys(categoryLabels).forEach((category) => {
    const count = products.filter((product) => product.category === category).length;
    document.querySelector(`[data-filter="${category}"] span`).textContent = String(count);
  });
  savedCount.textContent = String(savedProducts.size);
  compareCount.textContent = String(comparedProducts.size);
  document.querySelector("#dock-count").textContent = String(comparedProducts.size);
  compareDock.hidden = comparedProducts.size === 0;
  compareDock.classList.toggle("on", comparedProducts.size > 0);
}

function renderProducts() {
  const visibleProducts = currentProducts();
  const fragment = document.createDocumentFragment();
  visibleProducts.forEach((product, index) => fragment.append(createProductCard(product, index)));
  grid.replaceChildren(fragment);
  grid.classList.toggle("view-list", activeView === "list");
  grid.classList.toggle("view-depth", activeView === "depth");
  const noun = visibleProducts.length === 1 ? "product" : "products";
  resultCount.textContent = `${visibleProducts.length} ${noun}`;
  emptyState.hidden = visibleProducts.length !== 0;
  updateCounts();
  grid.querySelectorAll(".product-card").forEach(observeReveal);
}

// ============================================================
// Toggle Saved / Compare
// ============================================================
function toggleSaved(name) {
  const wasSaved = savedProducts.has(name);
  if (wasSaved) savedProducts.delete(name);
  else savedProducts.add(name);
  persistProducts(storageKeys.saved, savedProducts);
  showToast(wasSaved ? `${name} removed` : `${name} saved`);
  renderProducts();
}

function toggleCompared(name) {
  const wasCompared = comparedProducts.has(name);
  if (wasCompared) {
    comparedProducts.delete(name);
    showToast(`${name} removed from compare`);
  } else if (comparedProducts.size < 3) {
    comparedProducts.add(name);
    showToast(`${name} added to compare`);
  } else {
    showToast("Maximum 3 products to compare");
    return;
  }
  persistProducts(storageKeys.compare, comparedProducts);
  renderProducts();
  if (compareDialog.open) renderComparison();
}

// ============================================================
// Product Details Dialog
// ============================================================
function openProductDetails(product) {
  document.querySelector("#dialog-category").textContent =
    `${categoryLabels[product.category]} · ${product.frozen === false ? "Oddisea selection" : "SuperFrozen at −76°F"}`;
  document.querySelector("#dialog-title").textContent = product.name;
  document.querySelector("#dialog-description").textContent = product.description;
  document.querySelector("#dialog-tags").innerHTML =
    product.tags.map((tag) => `<span>${tag}</span>`).join("");
  const art = document.querySelector("#dialog-art");
  art.style.background =
    `linear-gradient(140deg, rgba(4, 18, 20, .16), rgba(4, 18, 20, .78)), url("${product.image}") center / cover, linear-gradient(140deg, ${product.colors[1]}, #081619 85%)`;
  productDialog.showModal();
  document.body.classList.add("dialog-open");
}

// ============================================================
// Compare Dialog
// ============================================================
function renderComparison() {
  const list = document.querySelector("#compare-list");
  list.replaceChildren();
  comparedProducts.forEach((name) => {
    const product = products.find((entry) => entry.name === name);
    if (!product) return;
    const row = document.createElement("div");
    row.className = "compare-row";
    const title = document.createElement("strong");
    title.textContent = product.name;
    const category = document.createElement("span");
    category.textContent =
      `${categoryLabels[product.category]} · ${product.frozen === false ? "Product range" : "−76°F SuperFrozen"}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${product.name} from comparison`);
    remove.textContent = "×";
    remove.addEventListener("click", () => toggleCompared(product.name));
    row.append(title, category, remove);
    list.append(row);
  });
  const hint = document.querySelector(".compare-hint");
  hint.hidden = comparedProducts.size > 0;
}

// ============================================================
// Reveal on Scroll
// ============================================================
function observeReveal(element) {
  if (reducedMotion || !("IntersectionObserver" in window)) {
    element.classList.add("is-visible");
    return;
  }
  revealObserver.observe(element);
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(observeReveal);

// ============================================================
// Filters, Search, Sort, Views
// ============================================================
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      filterButton.classList.toggle("is-active", filterButton === button);
      filterButton.setAttribute("aria-pressed", String(filterButton === button));
    });
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

document.querySelectorAll(".view-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeView = button.dataset.view;
    document.querySelectorAll(".view-button").forEach((viewButton) => {
      viewButton.classList.toggle("is-active", viewButton === button);
      viewButton.setAttribute("aria-pressed", String(viewButton === button));
    });
    renderProducts();
  });
});

// Keyboard shortcut for search
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey
    && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
    && !productDialog.open && !compareDialog.open) {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    if (productDialog.open) productDialog.close();
    if (compareDialog.open) compareDialog.close();
    if (businessDialog.open) businessDialog.close();
  }
});

// ============================================================
// Dialogs
// ============================================================
document.querySelector("#compare-toggle").addEventListener("click", () => {
  renderComparison();
  compareDialog.showModal();
  document.body.classList.add("dialog-open");
});
document.querySelector("#dock-open").addEventListener("click", () => {
  renderComparison();
  compareDialog.showModal();
  document.body.classList.add("dialog-open");
});
document.querySelector(".dialog-close").addEventListener("click", () => productDialog.close());
document.querySelector(".compare-close").addEventListener("click", () => compareDialog.close());
document.querySelector(".business-dialog-close").addEventListener("click", () => businessDialog.close());
for (const dialog of [productDialog, compareDialog, businessDialog]) {
  dialog.addEventListener("close", () => {
    if (!productDialog.open && !compareDialog.open && !businessDialog.open) {
      document.body.classList.remove("dialog-open");
    }
  });
}

document.querySelector("#business-grid").addEventListener("click", (event) => {
  const card = event.target.closest(".business-card");
  if (!card) return;
  document.querySelector("#business-dialog-title").textContent = card.dataset.businessTitle;
  document.querySelector("#business-dialog-subtitle").textContent = card.dataset.businessSubtitle;
  document.querySelector("#business-dialog-description").textContent = card.dataset.businessDescription;
  businessDialog.showModal();
  document.body.classList.add("dialog-open");
});
businessDialog.addEventListener("click", (event) => {
  if (event.target === businessDialog) businessDialog.close();
});
document.querySelector(".business-dialog-content .text-link").addEventListener("click", () => {
  businessDialog.close();
});

// ============================================================
// Mobile Nav
// ============================================================
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label",
    isExpanded ? "Open navigation menu" : "Close navigation menu");
  mobileNav.classList.toggle("is-open", !isExpanded);
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mobileNav.classList.remove("is-open");
  });
});

// ============================================================
// Year
// ============================================================
document.querySelector("#current-year").textContent =
  String(new Date().getFullYear());

// ============================================================
// 3D Tilt on Cards
// ============================================================
if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  grid.addEventListener("pointermove", (event) => {
    const card = event.target.closest(".product-card");
    if (!card || activeView === "list") return;
    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - .5) * -5;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - .5) * 5;
    card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  });
  grid.addEventListener("pointerleave", () => {
    grid.querySelectorAll(".product-card").forEach((card) => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });
}

// Image preview follows only image-preview links; the native cursor stays intact elsewhere.
if (cursorPreview && !reducedMotion
  && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const previewImage = cursorPreview.querySelector("img");
  const previewDescription = cursorPreview.querySelector("p");
  let activePreviewLink = null;

  document.documentElement.classList.add("cursor-preview-enabled");
  document.addEventListener("pointerover", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest(".cursor-preview-link");
    if (!link) return;
    activePreviewLink = link;
    previewImage.src = link.dataset.previewImage;
    previewDescription.textContent = link.dataset.previewDescription;
    cursorPreview.classList.add("is-visible");
  });
  document.addEventListener("pointerout", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest(".cursor-preview-link");
    if (!link || link.contains(event.relatedTarget)) return;
    activePreviewLink = null;
    cursorPreview.classList.remove("is-visible");
  });
  window.addEventListener("pointermove", (event) => {
    if (!activePreviewLink) return;
    cursorPreview.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursorPreview.style.setProperty("--cursor-y", `${event.clientY}px`);
  }, { passive: true });
}

// ============================================================
// Native image-scatter gallery
// ============================================================
const scatterSets = [
  {
    heading: "Respect for<br><span>the source.</span>",
    caption: "A closer look at what guides every catch.",
    images: [
      ["assets/oddisea-fish.jpg", "A school of fish in clear blue water", "Life below the surface"],
      ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80", "Rolling ocean waves", "The ocean, respected"],
      ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80", "Open sea beneath a clear sky", "Care starts at the source"],
      ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80", "A diver exploring clear ocean water", "A world worth protecting"]
    ]
  },
  {
    heading: "Fresh-caught.<br><span>Held in time.</span>",
    caption: "SuperFrozen seafood, maintained at −76°F.",
    images: [
      ["assets/oddisea-fish.jpg", "Fish swimming in a clear blue sea", "Quality begins in the water"],
      ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80", "Ocean swell in deep blue water", "−76°F / SuperFrozen"],
      ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80", "A wide view across the open ocean", "Fresh-caught goodness"],
      ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80", "Underwater ocean scene", "Texture, color, flavor"]
    ]
  },
  {
    heading: "Clean.<br><span>Traceable.</span>",
    caption: "Clear sourcing, from vessel to vendor.",
    images: [
      ["assets/oddisea-fish.jpg", "Fish moving together in blue water", "Know where it comes from"],
      ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80", "Blue water reaching the horizon", "A transparent supply chain"],
      ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80", "Open ocean in daylight", "From vessel to vendor"],
      ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80", "A diver in the ocean", "Details matter"]
    ]
  },
  {
    heading: "Better seafood.<br><span>Better together.</span>",
    caption: "Thoughtful partnerships for culinary teams.",
    images: [
      ["assets/oddisea-fish.jpg", "A school of fish swimming", "Made for the plate"],
      ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80", "Ocean waves in blue light", "For sushi and foodservice"],
      ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=900&q=80", "Sunlight on open water", "A partner in quality"],
      ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80", "Underwater view of the sea", "Explore the Oddisea approach"]
    ]
  }
];

if (scatterStage && scatterCards && scatterHeading && scatterCaption && scatterIndex) {
  let currentScatter = 0;
  let scatterTimer = null;
  let scatterVisible = false;
  let scatterAnimating = false;

  function showScatterSet(index) {
    const set = scatterSets[index];
    scatterHeading.innerHTML = set.heading;
    scatterCaption.textContent = set.caption;
    scatterIndex.textContent = `${String(index + 1).padStart(2, "0")} / ${String(scatterSets.length).padStart(2, "0")}`;
    scatterCards.replaceChildren(...set.images.map(([src, alt, description]) => {
      const card = document.createElement("a");
      card.className = "scatter-card cursor-preview-link is-entering";
      card.href = "#story";
      card.dataset.previewImage = src;
      card.dataset.previewDescription = description;
      card.setAttribute("aria-label", `${description}. Learn about Oddisea's approach.`);

      const image = document.createElement("img");
      image.src = src;
      image.alt = alt;
      image.loading = "lazy";
      image.decoding = "async";
      const label = document.createElement("span");
      label.textContent = description;
      card.append(image, label);
      return card;
    }));
    requestAnimationFrame(() => {
      scatterCards.querySelectorAll(".scatter-card").forEach((card) => {
        card.classList.remove("is-entering");
      });
    });
  }

  function advanceScatter() {
    if (!scatterVisible || document.hidden || scatterAnimating) return;
    scatterAnimating = true;
    scatterCards.querySelectorAll(".scatter-card").forEach((card) => {
      card.classList.add("is-leaving");
    });
    window.setTimeout(() => {
      currentScatter = (currentScatter + 1) % scatterSets.length;
      showScatterSet(currentScatter);
      scatterAnimating = false;
    }, reducedMotion ? 0 : 420);
  }

  showScatterSet(currentScatter);
  if (!reducedMotion && "IntersectionObserver" in window) {
    const scatterObserver = new IntersectionObserver(([entry]) => {
      scatterVisible = entry.isIntersecting;
      if (scatterVisible && !scatterTimer) {
        scatterTimer = window.setInterval(advanceScatter, 4800);
      } else if (!scatterVisible && scatterTimer) {
        window.clearInterval(scatterTimer);
        scatterTimer = null;
      }
    }, { threshold: 0.18 });
    scatterObserver.observe(scatterStage);
  } else if (!reducedMotion) {
    scatterVisible = true;
    scatterTimer = window.setInterval(advanceScatter, 4800);
  }
}

// Start the story video only when its section is close to view.
const storyVideo = document.querySelector(".story-video");
if (storyVideo && !reducedMotion) {
  const storySource = storyVideo.querySelector("source[data-src]");
  const startStoryVideo = () => {
    if (storySource && !storySource.src) {
      storySource.src = storySource.dataset.src;
      storyVideo.load();
    }
    storyVideo.play().catch((error) => {
      if (error.name !== "AbortError") {
        console.warn("The story video could not start.", error);
      }
    });
  };

  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        startStoryVideo();
      } else {
        storyVideo.pause();
      }
    }, { rootMargin: "200px 0px", threshold: 0.01 });
    videoObserver.observe(storyVideo);
  } else {
    startStoryVideo();
  }
}

// ============================================================
// Scroll progress
// ============================================================
if (scrollProgress) {
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    scrollProgress.style.width = p + "%";
  }, { passive: true });
}

// ============================================================
// Hide the loader without waiting for background videos or other page media.
// ============================================================
if (loader) {
  const hideLoader = () => window.setTimeout(
    () => loader.classList.add("done"),
    reducedMotion ? 120 : 850
  );
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hideLoader, { once: true });
  } else {
    hideLoader();
  }
}

// ============================================================
// NEW: HERO BUBBLES
// ============================================================
if (heroBubbles && !reducedMotion) {
  for (let i = 0; i < 20; i++) {
    const b = document.createElement("div");
    b.className = "bubble";
    const size = 8 + Math.random() * 30;
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = Math.random() * 100 + "%";
    b.style.animationDelay = Math.random() * 15 + "s";
    b.style.animationDuration = (10 + Math.random() * 10) + "s";
    heroBubbles.appendChild(b);
  }
}

// ============================================================
// NEW: HERO TITLE 3D LETTER SPLIT
// ============================================================
const heroTitle = document.querySelector("[data-split]");
if (heroTitle && !reducedMotion) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        [...child.textContent].forEach((ch) => {
          if (ch === " ") {
            frag.appendChild(document.createTextNode(" "));
          } else {
            const s = document.createElement("span");
            s.className = "char";
            s.textContent = ch;
            frag.appendChild(s);
          }
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        walk(child);
      }
    });
  };
  walk(heroTitle);

  const chars = heroTitle.querySelectorAll(".char");
  chars.forEach((c, i) => {
    c.style.transition = "transform 1.3s cubic-bezier(0.16,1,0.3,1)";
    c.style.transitionDelay = (0.3 + i * 0.02) + "s";
    requestAnimationFrame(() => {
      c.style.transform = "translateY(0) rotateX(0)";
    });
  });
}

// ============================================================
// NEW: NAV ACTIVE STATE ON SCROLL
// ============================================================
const navLinks = document.querySelectorAll(".desktop-nav a");
const sections = document.querySelectorAll("section[id]");

if (navLinks.length && sections.length) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }, { passive: true });
}

// ============================================================
// NEW: MAGNETIC BUTTONS
// ============================================================
if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(
    ".header-contact, .round-link, .contact-button, .text-link"
  ).forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

// ============================================================
// NEW: SCROLL-TO-TOP SMOOTH
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============================================================
// INIT
// ============================================================
renderProducts();

console.log(
  "%cOddisea — Enhanced",
  "color:#d8f36a;font-family:Manrope,sans-serif;font-size:22px;font-weight:800"
);
console.log(
  "%c21 products · Filters · Compare · 3D tilt · Custom cursor",
  "color:#829492;font-size:12px"
);
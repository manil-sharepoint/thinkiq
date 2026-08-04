const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const tabs = document.querySelectorAll(".tab");
const solutionCards = document.querySelectorAll("[data-solution]");
const peopleInput = document.querySelector("#peopleInput");
const hoursInput = document.querySelector("#hoursInput");
const hoursSaved = document.querySelector("#hoursSaved");
const annualHours = document.querySelector("#annualHours");
const daysSaved = document.querySelector("#daysSaved");
const contactForm = document.querySelector(".contact-form");
const heroVisual = document.querySelector(".hero-visual");

const solutionDetails = {
  agents: {
    kicker: "Copilot Studio + Azure AI Foundry",
    title: "Deploy governed AI agents where work already happens.",
    body:
      "We ground agents in SharePoint, Dataverse, Graph, and approved business systems, then surface them in Teams, Microsoft 365, or internal portals with human review paths.",
    metricOne: "2-6 wks",
    metricOneLabel: "first working agent",
    metricTwo: "100%",
    metricTwoLabel: "tenant-native delivery",
  },
  platform: {
    kicker: "Power Apps + Power Automate + Dataverse",
    title: "Replace spreadsheet-and-email workflows with apps your teams can trust.",
    body:
      "We design canvas apps, model-driven apps, Power Pages, and automated approvals that keep business rules visible, governed, and easy to evolve.",
    metricOne: "40-70%",
    metricOneLabel: "less manual routing",
    metricTwo: "1",
    metricTwoLabel: "source of operational truth",
  },
  cloud: {
    kicker: "Azure architecture + integration",
    title: "Modernize systems without forcing a separate AI platform into the stack.",
    body:
      "We use Azure services, Graph API, and secure connectors to join line-of-business systems to the Microsoft cloud foundation your IT team already governs.",
    metricOne: "24/7",
    metricOneLabel: "scalable cloud foundation",
    metricTwo: "0",
    metricTwoLabel: "extra shadow platforms",
  },
  analytics: {
    kicker: "Microsoft Fabric + Power BI",
    title: "Turn disconnected data into measurable outcomes and trusted dashboards.",
    body:
      "We build lakehouse patterns, semantic models, and Power BI reporting that connect operational work to executive visibility with row-level security.",
    metricOne: "Real-time",
    metricOneLabel: "decision visibility",
    metricTwo: "Audit",
    metricTwoLabel: "ready governance patterns",
  },
  security: {
    kicker: "Purview + Entra + DLP",
    title: "Build controls before the first agent reaches production.",
    body:
      "We define environment strategy, access patterns, DLP policies, and compliance review paths so automation can scale without becoming a security exception.",
    metricOne: "Policy",
    metricOneLabel: "first rollout",
    metricTwo: "Least",
    metricTwoLabel: "privilege access design",
  },
};

function setActiveTab(key) {
  const detail = solutionDetails[key] || solutionDetails.agents;
  document.querySelector("#detailKicker").textContent = detail.kicker;
  document.querySelector("#detailTitle").textContent = detail.title;
  document.querySelector("#detailBody").textContent = detail.body;
  document.querySelector("#detailMetricOne").textContent = detail.metricOne;
  document.querySelector("#detailMetricOne").parentElement.lastChild.textContent = ` ${detail.metricOneLabel}`;
  document.querySelector("#detailMetricTwo").textContent = detail.metricTwo;
  document.querySelector("#detailMetricTwo").parentElement.lastChild.textContent = ` ${detail.metricTwoLabel}`;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === key;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function updateCalculator() {
  const people = Number(peopleInput.value);
  const weeklyHours = Number(hoursInput.value);
  const monthly = people * weeklyHours * 4;
  const annual = monthly * 12;
  const days = Math.round(annual / 8);

  hoursSaved.textContent = monthly.toLocaleString();
  annualHours.textContent = annual.toLocaleString();
  daysSaved.textContent = days.toLocaleString();
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll(".site-header a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

solutionCards.forEach((card) => {
  card.addEventListener("click", () => setActiveTab(card.dataset.solution));
});

[peopleInput, hoursInput].forEach((input) => {
  if (input) {
    input.addEventListener("input", updateCalculator);
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = contactForm.querySelector(".form-status");
    if (status) {
      status.textContent = "Thanks. Your strategy call request is ready to route.";
    }
  });
}

if (heroVisual) {
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    heroVisual.style.setProperty("--tilt-x", x.toFixed(2));
    heroVisual.style.setProperty("--tilt-y", y.toFixed(2));
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--tilt-x", "0");
    heroVisual.style.setProperty("--tilt-y", "0");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
updateCalculator();

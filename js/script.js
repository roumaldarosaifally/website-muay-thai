const GEAR = [
  ["Gloves","10–16oz leather boxing gloves. Heavier for sparring, lighter for competition — protect the hand you punch with."],
  ["Hand Wraps","4–5m of cotton wrap that stabilises the wrist and knuckles under the glove. Non-negotiable before any bag work."],
  ["Shin Guards","Foam-and-leather sleeves for sparring. Save your partner and save the shin you spent years conditioning."],
  ["Mouthguard","Boil-and-bite or custom fit. Elbows land. Teeth do not grow back."],
  ["Groin Cup","Steel or hard plastic — mandatory for men in every gym and every fight. Kicks stray."],
  ["Muay Thai Shorts","Wide-cut satin shorts allow full hip rotation for kicks and knees. The colour and script often mark the gym."],
  ["Mongkol & Prajioud","Sacred headband and armband blessed by a monk or trainer. Worn during the Wai Kru; considered spiritually protective."],
  ["Heavy Bag","The 40–70kg banana bag is the daily grindstone — kicks, knees, and teeps by the hundred."],
  ["Focus Pads & Thai Pads","The trainer's tools. Thai pads absorb kicks and knees; focus mitts sharpen hand speed and reactions."],
];

const ROUNDS = [
  ["R0","Wai Kru Ram Muay","Before the first bell the fighter dances the Wai Kru — a slow ritual honouring teachers, family, and the ring itself. Sarama music plays throughout the entire fight."],
  ["R1","Feeling Round","Three minutes of range-finding. Fighters study each other's rhythm and defence. Judges rarely decide rounds here — points come later."],
  ["R2","Testing Round","Combinations open up. Low kicks and teeps establish the lead. The pace lifts but neither fighter has fully committed."],
  ["R3–4","Championship Rounds","The scoring rounds. This is where damage is done: heavy kicks, dominant clinch work, sweeps and dumps. Whoever leads here usually wins."],
  ["R5","Closing Round","If a fighter is clearly ahead, both may coast — a Thai tradition of respect. If it is close, expect all-out war until the final bell."],
];

const IDEAS = [
  ["Fighter Profiles","Cards for legends — Buakaw, Saenchai, Rodtang, Stamp Fairtex — with records, style, and signature techniques."],
  ["Technique Library","Short looping video clips of the teep, roundhouse, elbow, clinch dump, with slow-motion breakdowns."],
  ["Gym Finder","Interactive map of Muay Thai gyms in Thailand and abroad. Filter by price, level, camps that accept beginners."],
  ["Beginner Roadmap","A 12-week plan: conditioning, footwork, six core techniques, first sparring session, first amateur bout."],
  ["Rules & Weight Classes","Detailed WMC / ONE Championship / Rajadamnern rulesets with weight divisions and legal techniques."],
  ["Glossary of Thai Terms","Kick names, commands you'll hear from the corner, ritual vocabulary — with pronunciation audio."],
  ["History Timeline","Scrollable timeline from Ayutthaya-era Muay Boran to Lumpinee to global stages like ONE and Glory."],
  ["Fight Calendar","Upcoming events at Rajadamnern, Lumpinee, ONE Friday Fights — with tickets and streaming links."],
  ["Nutrition & Weight Cut","How fighters make weight safely, walk-around vs fight weight, hydration protocols."],
  ["Blog / News","Fight recaps, interviews, gear reviews. Keeps the site fresh and helps SEO."],
  ["Store","Sell shorts, gloves, wraps, or affiliate links to trusted brands."],
  ["Newsletter","Weekly digest — one fight breakdown, one technique clip, one story from Thailand."],
];

const pad = n => String(n).padStart(2,"0");

const gearGrid = document.getElementById("gear-grid");
if (gearGrid) {
  gearGrid.innerHTML = GEAR.map(([n,d],i)=>`
    <div class="gear-card">
      <div class="num">${pad(i+1)}</div>
      <h3>${n}</h3>
      <p>${d}</p>
    </div>`).join("");
}

const roundsEl = document.getElementById("rounds");
if (roundsEl) {
  roundsEl.innerHTML = ROUNDS.map(([t,n,d])=>`
    <div class="round">
      <div class="tag">${t}</div>
      <div><h3>${n}</h3><p>${d}</p></div>
    </div>`).join("");
}

const ideasGrid = document.getElementById("ideas-grid");
if (ideasGrid) {
  ideasGrid.innerHTML = IDEAS.map(([n,d],i)=>`
    <div class="idea">
      <div class="num">${pad(i+1)}</div>
      <h3>${n}</h3>
      <p>${d}</p>
    </div>`).join("");
}


const SEARCH_INDEX = [
  { title:"Home",       desc:"Homepage / hero introduction",        keywords:"home landing hero eight limbs", url:"index.html" },
  { title:"Origin",     desc:"History of Muay Thai",                keywords:"origin history muay boran battlefield siamese", url:"pages/about.html" },
  { title:"Style",      desc:"The eight limbs fighting style",      keywords:"style fists elbows knees shins weapons", url:"pages/style.html" },
  { title:"Gear",       desc:"Equipment guide",                     keywords:"gear gloves wraps shin guards mouthguard cup shorts mongkol prajioud heavy bag pads", url:"pages/gear.html" },
  { title:"Tournament", desc:"How a fight works, rounds & scoring", keywords:"tournament rounds scoring wai kru sarama judges", url:"pages/tournament.html" },
  { title:"Techniques", desc:"The arsenal of strikes",              keywords:"technique teep roundhouse tae clinch plum flying knee kao loy spinning elbow sok glab", url:"pages/technique.html" },
  { title:"Nak Muay",   desc:"Legendary fighters",                  keywords:"fighter buakaw saenchai samart nak muay legends", url:"pages/fighter.html" },
  { title:"Schedule",   desc:"Class times in Rose Hill",            keywords:"schedule classes beginners fighters open mat rose hill plaines wilhems", url:"pages/schedule.html" },
  { title:"Contact",    desc:"Reach the club, map & form",          keywords:"contact email phone instagram facebook map join camp", url:"pages/contact.html" },
  { title:"FAQ",        desc:"Frequently asked questions",          keywords:"faq questions gear beginners safe sparring", url:"pages/faq.html" },
];

function resolveSearchUrl(url, inPages) {
  if (!inPages) return url;
  if (url === "index.html") return "../index.html";
  if (url.startsWith("pages/")) return url.replace("pages/", "");
  return url;
}

function initSiteSearch() {
  const input = document.getElementById("site-search");
  const results = document.getElementById("site-search-results");
  if (!input || !results) return;

  const inPages = location.pathname.includes("/pages/");

  const render = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) { results.style.display = "none"; results.innerHTML = ""; return; }

    const matches = SEARCH_INDEX.filter(p =>
      (p.title + " " + p.desc + " " + p.keywords).toLowerCase().includes(q)
    );

    results.innerHTML = matches.length
      ? matches.map(p => `<a class="search-result" href="${resolveSearchUrl(p.url, inPages)}" role="option"><strong>${p.title}</strong><span>${p.desc}</span></a>`).join("")
      : `<div class="search-empty">No pages found for "${query}"</div>`;
    results.style.display = "block";
  };

  input.addEventListener("input", (e) => render(e.target.value));
  input.addEventListener("focus", (e) => { if (e.target.value) render(e.target.value); });

  document.addEventListener("click", (e) => {
    if (!results.contains(e.target) && e.target !== input) {
      results.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", initSiteSearch);


function validateForm(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    alert("Please fill in your name, email, and message before sending.");
    return false;
  }
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  alert("Thanks, " + name + " — your message has been noted. (This form is a demo and isn't wired up to send email yet.)");
  form.reset();
  return false;
}


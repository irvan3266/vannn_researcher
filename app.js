const papers = [
  {title:"AI-Powered Adaptive Learning Systems in Higher Education",authors:["N. Patel","R. Suryanto"],year:2024,journal:"Journal of Educational AI",citationCount:132,doi:"10.1000/jeai.2024.001",pdfUrl:"https://example.org/paper1.pdf",apaCitation:"Patel, N., & Suryanto, R. (2024). AI-powered adaptive learning systems in higher education. Journal of Educational AI, 12(1), 1-20. https://doi.org/10.1000/jeai.2024.001",abstract:"This study evaluates adaptive AI tutoring systems...",tldr:"Adaptive AI significantly improves retention and engagement.",conclusions:"AI personalization boosts outcomes but requires ethical safeguards.",summarizedAbstract:"Adaptive tools tailored to student pace improve outcomes.",results:"+18% average exam score and +25% engagement.",summarizedIntroduction:"Higher education needs scalable personalization.",methodsUsed:"Quasi-experimental design, 8 universities.",literatureSurvey:"Builds on intelligent tutoring and LMS analytics research.",limitations:"Limited to STEM courses.",contributions:"Practical framework for adaptive AI deployment.",practicalImplications:"Can reduce dropout and improve personalization.",objectives:"Assess effectiveness of AI adaptive platforms.",findings:"Strong performance gains and positive student feedback.",type:"Journal Article",field:"Education",openAccess:true,relevance:94},
  {title:"Machine Learning for Early Disease Detection in Rural Healthcare",authors:["A. Gomez","L. Chen"],year:2023,journal:"Open Healthcare Informatics",citationCount:210,doi:"10.1000/ohi.2023.145",pdfUrl:"https://example.org/paper2.pdf",apaCitation:"Gomez, A., & Chen, L. (2023). Machine learning for early disease detection in rural healthcare. Open Healthcare Informatics, 9(2), 44-67. https://doi.org/10.1000/ohi.2023.145",abstract:"We present classification pipelines...",tldr:"ML models improve early diagnosis in low-resource settings.",conclusions:"Hybrid models balanced accuracy and interpretability.",summarizedAbstract:"A rural dataset showed ML can flag risk cases early.",results:"AUC 0.89 with explainable boosting model.",summarizedIntroduction:"Rural clinics need low-cost triage tools.",methodsUsed:"Gradient boosting + SHAP interpretability.",literatureSurvey:"Reviews digital health and predictive diagnostics.",limitations:"Regional dataset only.",contributions:"Deployable diagnostic workflow with transparency.",practicalImplications:"Supports clinicians in triage and referral decisions.",objectives:"Develop robust early-detection ML for rural clinics.",findings:"Accuracy gains with clinician trust signals.",type:"Conference Paper",field:"Healthcare",openAccess:true,relevance:96},
  {title:"Climate Change Policy Mixes and Emission Outcomes: A Meta-Review",authors:["D. Liu","M. Rahman"],year:2022,journal:"Policy & Environment Review",citationCount:178,doi:"10.1000/per.2022.455",pdfUrl:"https://example.org/paper3.pdf",apaCitation:"Liu, D., & Rahman, M. (2022). Climate change policy mixes and emission outcomes: A meta-review. Policy & Environment Review, 14(4), 201-239. https://doi.org/10.1000/per.2022.455",abstract:"Meta-review across 120 studies...",tldr:"Combined carbon pricing + innovation subsidies work best.",conclusions:"Policy mix design matters more than single instruments.",summarizedAbstract:"This meta-review compares outcomes from policy combinations.",results:"Median emission reduction 11-17% in mixed-policy designs.",summarizedIntroduction:"Single-policy interventions often underperform.",methodsUsed:"Systematic review + meta-synthesis.",literatureSurvey:"Synthesizes economics and governance studies.",limitations:"Publication bias risk.",contributions:"Comparative matrix for policy instruments.",practicalImplications:"Governments should combine pricing with transition support.",objectives:"Identify highest-impact policy combinations.",findings:"Balanced policy portfolios outperform isolated mandates.",type:"Review Paper",field:"Environmental Science",openAccess:true,relevance:91},
  {title:"Open Access Monograph: Foundations of Reproducible Data Science",authors:["J. Meyer"],year:2021,journal:"Open Science Books",citationCount:89,doi:"10.1000/osb.2021.088",pdfUrl:"https://example.org/book1.pdf",apaCitation:"Meyer, J. (2021). Foundations of reproducible data science. Open Science Books. https://doi.org/10.1000/osb.2021.088",abstract:"A practical open-access book...",tldr:"Reproducibility workflows increase research reliability.",conclusions:"Versioning and transparent pipelines are essential.",summarizedAbstract:"Book explains tools for robust reproducible science.",results:"Case studies reduce reproducibility errors by 30%.",summarizedIntroduction:"Reproducibility crisis motivates better methods.",methodsUsed:"Tutorial-based method chapters.",literatureSurvey:"Summarizes open-science standards.",limitations:"Focuses mainly on Python ecosystem.",contributions:"Comprehensive OA reference for reproducible workflows.",practicalImplications:"Useful for labs and graduate training.",objectives:"Teach practical reproducibility.",findings:"Standardized workflows improve trustworthiness.",type:"Book",field:"Computer Science",openAccess:true,relevance:85},
  {title:"Explainable AI in Clinical Decision Support: A Comparative Study",authors:["S. Khan","P. Irawan","B. Silva"],year:2025,journal:"Journal of Clinical AI",citationCount:67,doi:"10.1000/jcai.2025.501",pdfUrl:"https://example.org/paper5.pdf",apaCitation:"Khan, S., Irawan, P., & Silva, B. (2025). Explainable AI in clinical decision support: A comparative study. Journal of Clinical AI, 3(1), 10-34. https://doi.org/10.1000/jcai.2025.501",abstract:"Comparison of explainability methods in clinical workflows...",tldr:"Counterfactual explanations improved clinician acceptance.",conclusions:"Explainability is critical for safe adoption.",summarizedAbstract:"Study evaluates XAI methods for clinical support systems.",results:"Trust score +31% with counterfactual interface.",summarizedIntroduction:"Clinical AI needs transparency and accountability.",methodsUsed:"User study with 94 clinicians.",literatureSurvey:"Covers XAI and health informatics research.",limitations:"Short trial period.",contributions:"Benchmark for XAI usability in hospitals.",practicalImplications:"Can accelerate safe AI integration.",objectives:"Compare explainability techniques in clinical settings.",findings:"Counterfactual + feature attribution performed best.",type:"Journal Article",field:"Healthcare",openAccess:true,relevance:93}
];

const el = id => document.getElementById(id);
let searched = false, results = [], analysis = [];

const setState = (kind, msg) => el('state').innerHTML = `<div class="state ${kind||''}">${msg}</div>`;
const loading = () => el('state').innerHTML = `<div class="state">Searching papers...</div><div class='loader'><div class='sk'></div><div class='sk'></div><div class='sk'></div></div>`;

function searchAndFilter() {
  const q = el('searchInput').value.toLowerCase().trim();
  const yearMin = Number(el('yearMin').value || 0);
  const citationMin = Number(el('citationMin').value || 0);
  const docType = el('docType').value;
  const field = el('field').value;
  const openOnly = el('openAccessOnly').checked;
  const pdfOnly = el('pdfOnly').checked;
  const sort = el('sort').value;

  let list = papers.filter(p =>
    (!q || `${p.title} ${p.authors.join(' ')} ${p.journal}`.toLowerCase().includes(q)) &&
    p.year >= yearMin && p.citationCount >= citationMin &&
    (!docType || p.type === docType) && (!field || p.field === field) &&
    (!openOnly || p.openAccess) && (!pdfOnly || !!p.pdfUrl)
  );

  const sortFn = {
    'Most Cited': (a,b)=>b.citationCount-a.citationCount,
    'Newest': (a,b)=>b.year-a.year,
    'Oldest': (a,b)=>a.year-b.year,
    'Most Relevant': (a,b)=>b.relevance-a.relevance
  }[sort];
  list.sort(sortFn);
  return list;
}

function renderResults() {
  const t = el('resultTable');
  if (!searched) return setState('', 'Search open-access papers, articles, and books with PDF availability.');
  if (!results.length) { t.innerHTML=''; return setState('error','No open-access PDF papers found. Try another keyword.'); }
  el('state').innerHTML = '';
  t.innerHTML = `<thead><tr><th>No</th><th>Judul Paper</th><th>Penulis</th><th>Tahun</th><th>Sumber / Jurnal</th><th>Jumlah Sitasi</th><th>Link PDF</th><th>Format Sitasi APA</th><th>Add to Analysis</th></tr></thead><tbody>${results.map((p,i)=>
    `<tr><td>${i+1}</td><td><button class='btn ghost' data-detail='${i}'>${p.title}</button></td><td>${p.authors.join(', ')}</td><td>${p.year}</td><td>${p.journal}</td><td><span class='badge'>${p.citationCount}</span></td><td><a target='_blank' href='${p.pdfUrl}'>PDF</a></td><td>${p.apaCitation}</td><td><button class='btn' data-add='${p.doi}'>Add to Analysis</button></td></tr>`).join('')}</tbody>`;
}

function renderTopCards() {
  el('topCards').innerHTML = results.slice(0,3).map(p => `<article class='card'><h3>${p.title}</h3><p>${p.authors.join(', ')} • ${p.year} • Citations: ${p.citationCount}</p><p><b>Ringkasan:</b> ${p.tldr}</p><p><b>Alasan relevan:</b> Tingkat relevansi tinggi, jumlah sitasi kuat, dan PDF tersedia.</p><a target='_blank' href='${p.pdfUrl}'>Open PDF</a></article>`).join('');
}

function renderAnalysis() {
  el('analysisTable').innerHTML = `<thead><tr><th>Title</th><th>APA Citation</th><th>TL;DR</th><th>Conclusions</th><th>Summarized Abstract</th><th>Results</th><th>Summarized Introduction</th><th>Methods Used</th><th>Literature Survey</th><th>Limitations</th><th>Contributions</th><th>Practical Implications</th><th>Objectives</th><th>Findings</th></tr></thead><tbody>${analysis.map(p=>`<tr><td>${p.title}</td><td>${p.apaCitation}</td><td>${p.tldr}</td><td>${p.conclusions}</td><td>${p.summarizedAbstract}</td><td>${p.results}</td><td>${p.summarizedIntroduction}</td><td>${p.methodsUsed}</td><td>${p.literatureSurvey}</td><td>${p.limitations}</td><td>${p.contributions}</td><td>${p.practicalImplications}</td><td>${p.objectives}</td><td>${p.findings}</td></tr>`).join('')}</tbody>`;
}

function showDetail(p){
  el('paperDetail').innerHTML = `<h2>${p.title}</h2><p><b>Author:</b> ${p.authors.join(', ')} | <b>Tahun:</b> ${p.year}</p><p><b>DOI:</b> ${p.doi} | <b>Journal / Publisher:</b> ${p.journal}</p><p><b>Citation count:</b> ${p.citationCount}</p><p><b>Abstract asli:</b> ${p.abstract}</p><p><b>Summarized Abstract:</b> ${p.summarizedAbstract}</p><p><b>Introduction Summary:</b> ${p.summarizedIntroduction}</p><p><b>Methodology:</b> ${p.methodsUsed}</p><p><b>Results:</b> ${p.results}</p><p><b>Conclusion:</b> ${p.conclusions}</p><p><b>Limitations:</b> ${p.limitations}</p><p><b>Contributions:</b> ${p.contributions}</p><p><b>Practical Implications:</b> ${p.practicalImplications}</p><p><b>APA Citation:</b> ${p.apaCitation}</p><p><a href='${p.pdfUrl}' target='_blank'>Link PDF</a></p><button class='btn' onclick='document.getElementById("paperDialog").close()'>Close</button>`;
  el('paperDialog').showModal();
}

function runSearch(){ searched = true; loading(); setTimeout(()=>{ results = searchAndFilter(); renderResults(); renderTopCards(); }, 650); }

el('searchBtn').onclick = runSearch;
['yearMin','docType','field','citationMin','sort','openAccessOnly','pdfOnly'].forEach(id => el(id).addEventListener('change', () => searched && runSearch()));
el('resultTable').addEventListener('click', (e)=>{
  const detailI = e.target.dataset.detail;
  const add = e.target.dataset.add;
  if (detailI !== undefined) showDetail(results[Number(detailI)]);
  if (add) {
    const p = papers.find(x=>x.doi===add);
    if (analysis.some(x=>x.doi===add)) return;
    if (analysis.length >= 5) return alert('Maksimal 5 paper pada analysis table.');
    analysis.push(p); renderAnalysis();
  }
});

el('exportCsv').onclick = ()=>{
  if (!results.length) return;
  const head = ['title','authors','year','journal','citationCount','pdfUrl','apaCitation'];
  const rows = [head, ...results.map(p=>[p.title,p.authors.join('; '),p.year,p.journal,p.citationCount,p.pdfUrl,p.apaCitation])];
  const csv = rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='vannn-results.csv'; a.click();
};
el('exportApa').onclick = ()=>{
  if (!results.length) return;
  const txt = results.map(p=>p.apaCitation).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt],{type:'text/plain'})); a.download='vannn-apa-citations.txt'; a.click();
};
el('copySummary').onclick = async ()=>{
  if (!results.length) return;
  const top = results.slice(0,3).map((p,i)=>`${i+1}. ${p.title}\n${p.tldr}`).join('\n\n');
  await navigator.clipboard.writeText(top); alert('Top 3 summary copied.');
};

renderResults();
renderAnalysis();
